import { useNavigate } from "react-router-dom";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import SearchBar from "../../layout/SearchBar";
import { Avatar } from "@mui/material";
import { ChatPath } from "./ChatPath";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMutation } from "react-query";
import { delete_group } from "../../api/api";

const theme = createTheme();
export const socket = io("http://localhost:3000", { timeout: 10000 });

const Groups = ({ group, onClick }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-row place-items-center grow hover:border hover:bg-black/25 hover:shadow-lg hover:shadow-blue-500/50">
      <div className="m-4">
        <Avatar sx={{ height: 54, width: 54, backgroundColor: "purple" }}>
          {group && group.group_name[0].toUpperCase()}
        </Avatar>
      </div>
      <div
        className="grow cursor-pointer"
        onClick={() => {
          navigate(`/chat/${group.group_id}`);
        }}
      >
        <p className="font-semibold">{group.group_name}</p>
      </div>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MoreHorizIcon sx={{ mx: 2 }} />
        <div
          className={`absolute ${
            open ? "block" : "hidden"
          } bg-red-200 p-2 rounded-lg`}
          onClick={onClick}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [navigate, user]);

  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    if (user) {
      socket.emit("load_groups", { id: user.id });
      socket.on("groups", (data) => {
        setGroups(data);
      });
    }
  }, []);

  const { mutate: delete_group_spec } = useMutation((id) => delete_group(id));

  const handleClick = (id) => {
    delete_group_spec(id, {
      onSuccess: (data) => {
        window.location.reload();
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={4}>
          <SearchBar />
          <Box component={"div"}>
            {groups &&
              groups.map((groups) => {
                return (
                  <Groups
                    key={groups.id}
                    group={groups}
                    onClick={() => handleClick(groups.group_id)}
                  />
                );
              })}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <ChatPath />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Chat;
