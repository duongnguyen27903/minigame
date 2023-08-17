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
