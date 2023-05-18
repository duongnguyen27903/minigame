import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'Content-Type' : 'application/json' }
  });

export const signin = async ({username,password}) =>{
    if( username !== '' && password !== '' )
    return api.post('login/signin',{username : username, password : password}).then(res=>res.data)
}

export const signup = async ({username,password,name,avatar,role}) =>{
    if( username !== '' && password !== '' && name !=='' && role !== '')
	return api.post(`login/signup?role=${role}`,{username : username, password : password, name: name, avatar: avatar}).then(res=>res.data)
}