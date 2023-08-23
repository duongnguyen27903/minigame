import React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import anh from "F:/minigame/src/assets/Eula3.jpg";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { update_user } from "../../api/api";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme();

const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [navigate, user]);

  const [open, setOpen] = React.useState(false);

  const [update, setUpdate] = React.useState(() => {
    if (user) {
      return {
        id: user.id,
        password: user.password,
        name: user.name,
        phone_number: user.phone_number,
      };
    }
    return {
      id: "",
      password: "",
      name: "",
      phone_number: "",
    };
  });

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const { mutate } = useMutation((update) => update_user(update));

  const handleClick = (event) => {
    event.preventDefault();
    mutate(update, {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setOpen(true);
      },
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {user && (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={24}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  {user.name[0].toUpperCase()}
                </Avatar>
                <Typography component="h1" variant="h5">
                  {user.name[0].toUpperCase()}
                </Typography>
                <Grid
                  container
                  justifyContent={"center"}
                  // onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <Grid
                    container
                    direction={"column"}
                    justifyContent={"center"}
                    spacing={2}
                  >
                    <Grid item sx={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        disabled
                        autoFocus
                        defaultValue={user.email}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={update.password}
                        onChange={handleChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        value={update.name}
                        onChange={handleChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone_number"
                        label="Phone number"
                        name="phone_number"
                        autoFocus
                        value={update.phone_number}
                        onChange={handleChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="createdAt"
                        label="Date created"
                        name="createdAt"
                        disabled
                        autoFocus
                        defaultValue={user.createdAt.split("T")[0]}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ m: 2, width: "50%", alignSelf: "center" }}
                    onClick={handleClick}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ m: 2, width: "50%", alignSelf: "center" }}
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    Sign out
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Update your account successfully"
                    action={action}
                  />
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                  >
                    <Grid item>
                      <Link href="/" variant="body2">
                        Go back Home !!!
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${anh})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
        </ThemeProvider>
      )}
    </div>
  );
};

export default Account;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Account = () => {
//   const navigate = useNavigate();
//   const user = localStorage.getItem("user");
//   useEffect(() => {
//     if (user === null) {
//       navigate("/");
//     }
//   }, [navigate, user]);

//   return <div>{user}</div>;
// };

// export default Account;
