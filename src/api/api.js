import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export const signin = async ({ email, password }) => {
  if (email !== "" && password !== "")
    return api
      .post("auth/login", { email: email, password: password })
      .then((res) => res.data)
      .catch((error) => console.log(error));
};

export const signup = async ({ email, password, name, phone_number, role }) => {
  if (email !== "" && password !== "" && name !== "" && role !== "")
    return api
      .post(`auth/signup?role=${role}`, {
        email: email,
        password: password,
        name: name,
        phone_number: phone_number,
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
};

export const update_user = async ({ id, password, name, phone_number }) => {
  if (id !== "" && password !== "" && name !== "" && phone_number !== "") {
    return api
      .patch(`users-profile/${id}`, {
        password: password,
        name: name,
        phone_number: phone_number,
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};

export const find_user_name = async function (name) {
  if (name !== "") {
    return api
      .get(`/groups/find_user?name=${name}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};

export const create_2_member_group = async function ({
  creator,
  member,
  name,
}) {
  if (creator !== "" && member !== "" && name !== "") {
    return api
      .post(
        `/groups/create_2_member_group?creator=${creator}&member=${member}&name=${name}`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};

export const delete_group = async function (id) {
  if (id !== "") {
    return api
      .delete(`/groups/delete_group?group=${id}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};

export const update_group = async function ({ id, name }) {
  if (id !== "" && name !== "") {
    return api
      .patch(`/groups/update_group?id=${id}&name=${name}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};

export const users_in_group = async function (id) {
  if (id !== "") {
    return api
      .get(`groups/users_in_group/${id}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};

export const set_nickname = async function ({ user, group, nickname }) {
  if (user !== "" && group !== "" && nickname !== "") {
    return api
      .patch(
        `/groups/set_nickname?user=${user}&group=${group}&nickname=${nickname}`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};

export const remove_user = async function ({ host, user, group }) {
  if (host !== "" && user !== "" && group !== "") {
    return api
      .delete(`/groups/remove_user?host=${host}&user=${user}&group=${group}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};

export const add_user = async function ({ user, group }) {
  if (user !== "" && group !== "") {
    return api
      .post(`groups/add_user?user=${user}&group=${group}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
};
