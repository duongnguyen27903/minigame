import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./Chat";
import { useChatScroll } from "../../hooks/useChatScroll";

export const BoxChat = () => {
  const { groupname } = useParams();
  console.log(groupname);
  const [content, setContent] = useState([]);
  const [sendMes, setSendMes] = useState("");

  useEffect(() => {
    socket.emit("getMessage", groupname);
  }, [groupname]);

  useEffect(() => {
    socket.on("content", (...data) => {
      // console.log(groupname);
      setContent(data[0]);
    });
  }, []);
  useEffect(() => {
    socket.on("onchat", (groupname, mes) => {
      console.log(groupname, mes);
      setContent([...content, mes]);
    });
  }, [content]);
  const ref = useChatScroll(content);

  const Message = ({ mes }) => {
    return (
      <p className="p-2 m-2 rounded-md bg-blue-400 w-fit min-w-[50%]">{mes}</p>
    );
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="m-2 font-bold text-xl">{groupname}</div>
      <hr />
      {console.log(groupname)}
      <div ref={ref} className="grow overflow-y-scroll scroll-smooth">
        {content &&
          content.map((mes, index) => {
            return (
              <div key={index}>
                <Message mes={mes} />
              </div>
            );
          })}
      </div>

      <div className="flex flex-row p-2">
        <input
          placeholder="type something here... "
          className="grow outline-none p-2"
          value={sendMes}
          onChange={(e) => {
            setSendMes(e.target.value);
          }}
        />
        <button
          className="w-32 rounded-full bg-blue-400 p-4"
          onClick={() => {
            sendMes !== "" &&
              socket.emit("create", { groupname: groupname, sendMes: sendMes });
            setSendMes("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
