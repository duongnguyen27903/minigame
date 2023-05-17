import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useMutation } from 'react-query';
import { signup } from '../api/api';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();

  const [signupForm,setSignupForm] = React.useState({
    username : '',
    password : '',
    name : '',
    avatar : '',
    role : '',
  })

  const handleChange = (e) => {
    setSignupForm({...signupForm, [e.target.name] : e.target.value })
  }

  const { mutate } = useMutation(
    (signupForm) => signup(signupForm),
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(signupForm,
      {
        onSuccess : () =>{
          navigate('/signin')
        }
      }
    )
  };


  // const previewAvatar = (e) =>{
  //   const file = e.target.files;
  //   console.log(URL.createObjectURL(file[0]));
  // }

  return (
    <ThemeProvider theme={theme}>
      {console.log(signupForm)}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              hidden={true}
              accept="image/*"
              onChange={previewAvatar}
            />
          </Button> */}
          {/* <input type='file' multiple onChange={previewAvatar} /> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={signupForm.username}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={signupForm.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={signupForm.name}
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='role'
                    value={signupForm.role}
                    label="Role"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                    <MenuItem value={'User'}>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}