import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import io from 'socket.io-client';

import SearchBar from '../layout/SearchBar';

const theme = createTheme();

const socket = io('http://localhost:3000',{ timeout : 10000  })
const Message = () => { 
    const user = localStorage.getItem('token')
    const navigate = useNavigate();
    React.useEffect(()=>{
        if( user === null ){ navigate('/signin')}
    },[user,navigate])

    React.useEffect(()=>{
        socket.emit('connection','hello')//sử dụng socket.emit để gọi đến các event được tạo trong backend
    },[])
    const [ form, setForm ] = React.useState()

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={6}>
                    <SearchBar />
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ flexGrow: 1 }}>
                        <input onChange={(e)=>{setForm((e.target.value))}} placeholder='type something here ' />
                        {console.log(form)}
                        <button>send message</button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Message