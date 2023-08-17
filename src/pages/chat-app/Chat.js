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

const theme = createTheme();

export const socket = io("http://localhost:3000", { timeout: 10000 });

// const fakeGroup = [
//   {
//     avatar: "a",
//     name: "group1",
//     message: "chao ba con co bac",
//   },
//   {
//     avatar: "a",
//     name: "group1",
//     message: "chao ba con co bac",
//   },
//   {
//     avatar: "a",
//     name: "group1",
//     message: "chao ba con co bac",
//   },
//   {
//     avatar: "a",
//     name: "group1",
//     message: "chao ba con co bac",
//   },
//   {
//     avatar: "a",
//     name: "group1",
//     message: "chao ba con co bac",
//   },
// ];

const Groups = ({ group }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row place-items-center grow hover:border hover:bg-black/25 hover:shadow-lg hover:shadow-blue-500/50"
      onClick={() => {
        navigate(`/message/${group.name}`);
      }}
    >
      <div className="m-4">
        <Avatar sx={{ height: 54, width: 54, backgroundColor: "purple" }}>
          {group.name[0].toUpperCase()}
        </Avatar>
      </div>
      <div className="grow">
        <p className="font-semibold">{group.name}</p>
      </div>
    </div>
  );
};

const Chat = () => {
  const user = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [user, navigate]);

  // React.useEffect(()=>{
  //     socket.emit('connection','hello');//sử dụng socket.emit để gọi đến các event được tạo trong backend
  //     socket.emit('getMessage','getdata')
  // },[])
  const [group, setGroup] = React.useState([]);

  React.useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    socket.emit("loadGroup", account.userId);
    socket.on("groups", (data) => {
      setGroup(data);
    });
  }, []);

  // React.useEffect(()=>{
  //     socket.emit('getMessage')
  //     socket.on('user-chat',(data)=>{
  //         console.log(data);
  //         setText(data);
  //     })

  // },[])

  // React.useEffect(()=>{
  //     socket.on('onchat',(data)=>{
  //         setText([...text,data])
  //     })
  // },[text])

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={4}>
          <SearchBar />
          <Box component={"div"}>
            {group &&
              group.map((groups) => {
                return <Groups key={groups.id} group={groups} />;
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
