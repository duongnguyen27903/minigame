import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./Chat";
import { useChatScroll } from "../../hooks/useChatScroll";
import { Avatar } from "@mui/material";

export const BoxChat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  const [content, setContent] = useState([]);
  const [group, setGroup] = useState();
  const [send_message, setSend_message] = useState("");

  useEffect(() => {
    if (id) {
      socket.emit("load_messages", { id: id });
      socket.on("messages", (data) => {
        setGroup({
          id: data.id,
          name: data.name,
          createAt: data.createAt,
        });
        setContent(data.messages);
      });
    }
  }, [id]);

  // useEffect(() => {
  //   socket.on("content", (...data) => {
  //     // console.log(groupname);
  //     setContent(data[0]);
  //   });
  // }, []);
  // useEffect(() => {
  //   socket.on("onchat", (groupname, mes) => {
  //     console.log(groupname, mes);
  //     setContent([...content, mes]);
  //   });
  // }, [content]);

  useEffect(() => {
    socket.on("new_message", (data) => {
      setContent([...content, data]);
    });
  }, [content]);
  const ref = useChatScroll(content);

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

  return (
    <div className="h-full flex flex-col justify-between">
      {group && <div className="m-2 font-bold text-xl">{group.name}</div>}
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
