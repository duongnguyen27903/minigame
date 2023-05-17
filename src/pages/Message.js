import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import io from 'socket.io-client';

import SearchBar from '../layout/SearchBar';
import { Avatar } from '@mui/material';

import { useChatScroll } from '../hooks/useChatScroll';

const theme = createTheme();

const socket = io('http://localhost:3000',{ timeout : 10000  })

const fakeGroup = [
    {
        avatar : 'a',
        name : 'group1',
        message : 'chao ba con co bac'
    },
    {
        avatar : 'a',
        name : 'group1',
        message : 'chao ba con co bac'
    },
    {
        avatar : 'a',
        name : 'group1',
        message : 'chao ba con co bac'
    },
    {
        avatar : 'a',
        name : 'group1',
        message : 'chao ba con co bac'
    },
    {
        avatar : 'a',
        name : 'group1',
        message : 'chao ba con co bac'
    },
]

const Groups = ( {group} ) =>{
    
    return (
        <div className='flex flex-row place-items-center grow hover:border hover:bg-black/25 hover:shadow-lg hover:shadow-blue-500/50'
        >
            <div className='m-4'>
                <Avatar sx={{height : 54, width : 54, backgroundColor : 'purple'}}>{group.avatar.toUpperCase()}</Avatar>
            </div>
            <div className='grow'>
                <p className='font-semibold'>{group.name}</p>
                <p>{group.message}</p>
            </div>
        </div>
    );
}

const Message = () => { 
    const user = localStorage.getItem('accessToken')
    const navigate = useNavigate();

    React.useEffect(()=>{
        if( user === null ){ navigate('/signin')}
    },[user,navigate])

    // React.useEffect(()=>{
    //     socket.emit('connection','hello');//sử dụng socket.emit để gọi đến các event được tạo trong backend
    //     socket.emit('getMessage','getdata')
    // },[])
    const [text,setText] = React.useState([])
    React.useEffect(()=>{
        socket.emit('getMessage')
        socket.on('user-chat',(data)=>{
            console.log(data);
            setText(data);
        })
        
    },[])

    React.useEffect(()=>{
        socket.on('onchat',(data)=>{
            setText([...text,data])
        })
    },[text])

    const ref = useChatScroll(text)

    const [content,setContent] = React.useState('')
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={4}>
                    <SearchBar />
                    <Box component={'div'} >
                        {fakeGroup.map((group,index)=>{
                            return (
                                <Groups group={group} key={index} />
                            );
                        })}
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <div className='' >

                    </div>
                    <div className='h-96 overflow-y-scroll scroll-smooth'ref={ref} >
                    {text && 
                        <ul >
                            {text.map((data,index)=>{
                                return (
                                    <li key={index}>{data}</li>
                                );
                            })}
                        </ul>
                    }
                    </div>
                    <div className='flex flex-row '>
                        <input onChange={(e)=>{setContent(e.target.value)}} value={content} placeholder='type something ...' />
                        <button onClick={(e)=>{
                            e.preventDefault();
                            socket.emit('create',content);
                            setContent('');
                        }}>send</button>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Message