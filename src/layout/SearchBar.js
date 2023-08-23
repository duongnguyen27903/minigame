import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { create_2_member_group, find_user_name } from "../api/api";
const SearchBar = () => {
  const user_json = localStorage.getItem("user");
  const user = user_json && JSON.parse(user_json);
  const navigate = useNavigate();

  const handleClick = function () {
    navigate("/account");
  };

  const [find, setFind] = useState("");
  const [names, setNames] = useState([]);
  const [create_2_form, setCreate_2_form] = useState(() => {
    if (user) {
      return {
        creator: user.id,
        member: "",
        name: "",
      };
    }
    return {
      creator: "",
      member: "",
      name: "",
    };
  });

  const { mutate } = useMutation((name) => find_user_name(name));
  const { mutate: create_2member_group } = useMutation((create_2_form) =>
    create_2_member_group(create_2_form)
  );

  useEffect(() => {
    if (find !== "") {
      mutate(find, {
        onSuccess: (data) => {
          setNames([...data]);
        },
      });
    } else setNames([]);
  }, [find, mutate]);

  const handleChange = (e) => {
    setFind(e.target.value);
  };

  useEffect(() => {
    create_2member_group(create_2_form, {
      onSuccess: (data) => {
        if (data) {
          navigate(data.id);
        }
      },
      onSettled: (data) => {
        if (data) {
          window.location.reload();
        }
      },
    });
  }, [create_2_form]);

  const handle_create = (id, name) => {
    setCreate_2_form({
      ...create_2_form,
      member: id,
      name: name,
    });
    setFind("");
  };

  return (
    <div>
      {user && (
        <div className="flex flex-row justify-between place-items-center m-2 ">
          <Tooltip title="Account" onDoubleClick={handleClick}>
            <Avatar sx={{ cursor: "pointer", backgroundColor: "purple" }}>
              {user.name[0].toUpperCase()}
            </Avatar>
          </Tooltip>
          <div
            className={`bg-gray-300  relative ${
              find === "" ? "rounded-full" : "rounded-t-xl"
            }`}
          >
            <SearchIcon className="m-2" />
            <input
              className={`w-auto py-2 pr-4 m-1 text-md text-gray-900 bg-gray-300 rounded-lg outline-none`}
              placeholder="Find people..."
              onChange={handleChange}
              value={find}
            />
            <ul className="absolute w-full ">
              {names.map((name) => {
                return (
                  <li
                    key={name.id}
                    className="p-3 w-full bg-gray-300 last:rounded-b-xl cursor-pointer"
                    onClick={() => {
                      handle_create(name.id, name.name);
                    }}
                  >
                    {name.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
