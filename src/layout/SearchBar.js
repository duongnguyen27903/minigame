import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleClick = function () {
    navigate("/account");
  };

  return (
    <div>
      {user && (
        <div className="flex flex-row justify-between place-items-center m-2 ">
          <Tooltip title="Account" onDoubleClick={handleClick}>
            <Avatar sx={{ cursor: "crosshair", backgroundColor: "purple" }}>
              {user.name[0].toUpperCase()}
            </Avatar>
          </Tooltip>
          <div className="bg-gray-100 rounded-full">
            <SearchIcon className="m-2" />
            <input
              className="w-1/2 p-2 text-md text-gray-900 bg-gray-100 rounded-lg outline-none "
              placeholder="Find people..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
