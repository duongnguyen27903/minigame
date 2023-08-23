import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "./Chat";
import { useChatScroll } from "../../hooks/useChatScroll";
import { Avatar, Button, TextField } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useMutation } from "react-query";
import { update_group } from "../../api/api";
import SettingsIcon from "@mui/icons-material/Settings";

export const BoxChat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const [group, setGroup] = useState();
  const [update, setUpdate] = useState();
  const [send_message, setSend_message] = useState("");
  const ref = useChatScroll(content);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: update_group_name } = useMutation((update) =>
    update_group(update)
  );

  const handle_update_group_name = () => {
    if (group.name !== update.name) {
      update_group_name(update, {
        onSuccess: (data) => {
          window.location.reload();
        },
      });
    }
  };
  useEffect(() => {
    if (id) {
      socket.emit("load_messages", { id: id });
      socket.on("messages", (data) => {
        setGroup({
          id: data.id,
          name: data.name,
          createAt: data.createAt,
        });
        setUpdate({
          id: data.id,
          name: data.name,
        });
        setContent(data.messages);
      });
    }
  }, [id]);

  useEffect(() => {
    socket.on("new_message", (data) => {
      setContent([...content, data]);
    });
  }, [content]);

  const Message = ({ message }) => {
    return (
      <div
        className={`${
          message.sender === user.id ? "flex justify-end" : "justify-start"
        } place-items-center w-full`}
      >
        {message.sender === user.id ? (
          <div className="flex flex-row place-items-center">
            <p className="p-2 m-2 rounded-md bg-blue-400 w-fit min-w-[50%]">
              {message.content}
            </p>
            <Avatar sx={{ backgroundColor: "blueviolet" }}>
              {message.name[0].toUpperCase()}
            </Avatar>
          </div>
        ) : (
          <div className="flex flex-row place-items-center">
            <Avatar sx={{ backgroundColor: "blueviolet" }}>
              {message.name[0].toUpperCase()}
            </Avatar>
            <p className="p-2 m-2 rounded-md bg-blue-400 w-fit min-w-[50%]">
              {message.content}
            </p>
          </div>
        )}
      </div>
    );
  };

  const handle_send_message = () => {
    if (send_message !== "" && group) {
      socket.emit("send_message", {
        id: group.id,
        sender: user.id,
        content: send_message,
        send_at: Date(),
        tags: [""],
      });
      setSend_message("");
    }
  };

  const onChangeUpdate = (e) => {
    setUpdate({
      ...update,
      name: e.target.value,
    });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-row place-items-center m-2">
        {group && <div className="m-2 font-semibold text-xl">{group.name}</div>}
        <div className="relative cursor-pointer w-full">
          <InfoIcon
            onClick={() => {
              setOpen(!open);
            }}
          />
          {group && (
            <div
              className={`absolute bg-white w-auto ${
                open === false ? "hidden" : "block"
              } `}
            >
              <div className="flex flex-col p-2">
                <div className="m-2 flex place-items-center">
                  <TextField
                    margin="normal"
                    required
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    value={update.name}
                    onChange={onChangeUpdate}
                  />
                  <Button
                    variant="contained"
                    onClick={handle_update_group_name}
                  >
                    Change
                  </Button>
                </div>
                <div>
                  <TextField
                    margin="normal"
                    required
                    id="createdAt"
                    label="Date created"
                    name="createdAt"
                    disabled
                    autoFocus
                    defaultValue={group.createAt.split("T")[0]}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            navigate("info");
          }}
          className="p-2 m-2 cursor-pointer"
        >
          <SettingsIcon sx={{ width: 32, height: 32 }} />
        </div>
      </div>
      <hr />
      <div ref={ref} className="grow scroll-smooth m-2">
        {content &&
          content.map((message, index) => {
            return (
              <div key={index}>
                <Message message={message} />
              </div>
            );
          })}
      </div>

      <div className="flex flex-row p-2">
        <input
          placeholder="type something here... "
          className="grow outline-none p-2"
          value={send_message}
          onChange={(e) => {
            setSend_message(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handle_send_message();
            }
          }}
        />
        <button
          className="w-32 rounded-full bg-blue-400 p-4"
          onClick={handle_send_message}
        >
          Send
        </button>
      </div>
    </div>
  );
};
