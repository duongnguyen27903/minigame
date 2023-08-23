import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./Chat";
import { useMutation, useQuery } from "react-query";
import {
  add_user,
  find_user_name,
  remove_user,
  set_nickname,
  users_in_group,
} from "../../api/api";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const GroupInfo = () => {
  const { id } = useParams();
  const { data: users_list, refetch } = useQuery({
    queryKey: "get_users_in_group",
    queryFn: () => users_in_group(id),
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    staleTime: 5,
  });

  const [group, setGroup] = useState();

  useEffect(() => {
    if (id) {
      socket.emit("load_messages", { id: id });
      socket.on("messages", (data) => {
        setGroup({
          id: data.id,
          name: data.name,
          createAt: data.createAt,
        });
      });
    }
  }, [id]);

  const NickName = (user) => {
    const [nickname, setNickname] = useState({
      user: user.user.userId,
      group: user.user.groupId,
      nickname: user.user.nickname || "",
    });
    const { mutate: set_user_nickname } = useMutation((nickname) =>
      set_nickname(nickname)
    );

    return (
      <div className="flex place-items-center">
        <TextField
          margin="normal"
          id="nickname"
          label="Nickname"
          name="nickname"
          value={nickname.nickname}
          onChange={(e) => {
            setNickname({
              ...nickname,
              [e.target.name]: e.target.value,
            });
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            set_user_nickname(nickname, {
              onSuccess: (data) => {
                refetch();
              },
            });
          }}
        >
          Change
        </Button>
      </div>
    );
  };

  const RemoveUser = ({ info }) => {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);

    const [remove, setRemove] = useState(() => {
      if (user) {
        return {
          host: user.id,
          user: info.userId,
          group: info.groupId,
        };
      }
    });

    const { mutate: remove_user_from_group } = useMutation((remove) =>
      remove_user(remove)
    );

    return (
      <DeleteIcon
        sx={{
          width: 32,
          height: 32,
          m: 4,
          color: "red",
          animation: "infinite",
          cursor: "pointer",
        }}
        onClick={() => {
          remove_user_from_group(remove, {
            onSuccess: (data) => {
              refetch();
            },
          });
        }}
      />
    );
  };

  const AddUser = ({ info }) => {
    console.log(info.id);
    const { mutate: find } = useMutation((name) => find_user_name(name));
    const { mutate: add_user_to_group } = useMutation(({ user, group }) =>
      add_user({ user, group })
    );
    const [addUser, setAddUser] = useState({
      user: "",
      group: info.id,
    });
    const [names, setNames] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
      if (name !== "") {
        find(name, {
          onSuccess: (data) => {
            setNames([...data]);
          },
        });
      } else setNames([]);
    }, [name, find]);

    useEffect(() => {
      add_user_to_group(addUser, {
        onSuccess: (data) => {
          if (data) {
            refetch();
          }
        },
      });
    }, [addUser]);

    return (
      <div className=" justify-start place-items-center relative w-full">
        <div className="flex flex-row m-2">
          <div className="p-2">
            <PersonAddIcon sx={{ width: 32, height: 32, color: "blue" }} />
          </div>
          <div>
            <TextField
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <ul
              className={`absolute w-full bg-white ${
                names ? "block" : "hidden"
              }`}
            >
              {names &&
                names.map((user) => {
                  return (
                    <li
                      className="w-full bg-blue-500 p-3 cursor-pointer"
                      onClick={() => {
                        setAddUser({
                          ...addUser,
                          user: user.id,
                        });
                        add_user_to_group(addUser, {
                          onSuccess: (data) => {
                            refetch();
                          },
                        });
                      }}
                    >
                      {user.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {group && (
        <div className="w-full flex justify-center font-bold p-2 text-2xl">
          <div>{group.name}</div>
        </div>
      )}
      <hr />
      <AddUser info={group} />
      <div>
        {users_list &&
          users_list.map((user) => {
            return (
              <div key={user.id} className="flex flex-row place-items-center">
                <div className="basis-1/4 p-2">{user.user_name}</div>
                <NickName user={user} />
                <RemoveUser info={user} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GroupInfo;
