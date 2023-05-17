// import React, { useState } from 'react'
// import { useMutation, useQuery, useQueryClient } from 'react-query'
// import { add, deleteaAccount, getdata } from '../api/api'
// import { TextField, Button, Box } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'name', headerName: 'name', width: 130 },
//   { field: 'city', headerName: 'city', width: 130 },
//   { headerName: 'Edit' , }
// ];

// export const Admin = () => {

//     const [form,setForm] = useState({
//         name : '',
//         city : ''
//     })
    
//     const { data } = useQuery('getdata',getdata)

//     const queryClient = useQueryClient()

//     const { mutate : addaccount } = useMutation(
//         ( form )=>add(form),
//         {
//         onSuccess : ()=>{
//             queryClient.invalidateQueries('getdata');
//         }
//     })

//     const { mutate : deleteUser } = useMutation(
//         ( id )=>deleteaAccount(id),
//         {
//         onSuccess : ()=>{
//             queryClient.invalidateQueries('getdata');
//         }
//     })

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         setForm({
//           name: data.get('name'),
//           city: data.get('city'),
//         })
//         addaccount(form);
//     };

//     return (
//         <div>
//             {
//                 data && <div style={{ height: 400, width: '100%' }}>
//                 <DataGrid
//                     rows={data}
//                     columns={columns}
//                     initialState={{
//                     pagination: {
//                         paginationModel: { page: 0, pageSize: 5 },
//                     },
//                     }}
//                     pageSizeOptions={[5, 10]}
//                     checkboxSelection
//                 />
//             </div>
//             }
//             <Button>ADD</Button>
//             <div className='grid grid-cols-6 justify-between w-auto place-items-start gap-2 m-2 text-xl'>
//                 <input type='checkbox' />
//                 <p>id</p>
//                 <p>name</p>
//                 <p>city</p>
//             </div>
//             <div className='h-96 overflow-scroll'>
//             {data && data.map((prop,index)=>{
//                 return (
//                     <div key={index} className='grid grid-cols-6 justify-between w-auto place-items-start gap-2 m-2 border-y-2'>
//                         <input type='checkbox' />
//                         <p>{prop.id}</p>
//                         <p>{prop.name}</p>
//                         <p>{prop.city}</p>
//                         <Button >EDIT</Button>
//                         <Button onClick={()=>{deleteUser(prop.id)}}>DELETE</Button>
//                     </div>
//                 );
//             })}
//             </div>
//             {console.log(form)}
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//             <div className='fixed bottom-2'>
//                 <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="name"
//                     label="Name"
//                     name="name"
//                     autoComplete="name"
//                     autoFocus
//                 />
//                 <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="city"
//                     label="City"
//                     name="city"
//                     autoComplete="city"
//                     autoFocus
//                 />
//                 <Button
//                 type='submit'
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//             </div>
//             </Box>
              
//         </div>
//     )
// }

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export const Admin = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const [form,setForm] = React.useState({
    name : '',
    pass : ''
  })

  const handleChange = (e) =>{
    setForm({...form,[e.target.name] : e.target.value})
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={form.name}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}