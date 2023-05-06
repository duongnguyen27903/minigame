import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'Content-Type' : 'application/json' }
  });

export const signup=({username, password, avatar, role})=>{
    api.post('/login/signin',{}).then((res) => res.data).finally();
}

export const signin = async ({username,password}) =>{
    if( username !== '' && password !== '' )
    return api.post('login/signin',{username : username, password : password}).then(res=>res.data)
}



















// export const getdata = async () => {
//     return axios.get('https://64537d50e9ac46cedf26a94a.mockapi.io/employee')
//     .then((res) => res.data)
// }

// export const add = async ({name,city}) => {
//     if( name !== '' && city !== '')
//     return axios.post('https://64537d50e9ac46cedf26a94a.mockapi.io/employee',{name : name, city : city})
//     .then((res) => res.data)
// }

// export const deleteaAccount = async (id) => {
    
//     return axios.delete(`https://64537d50e9ac46cedf26a94a.mockapi.io/employee/${id}`)
//     .then((res) => res.data)
// }

// export const edit = async ({id}) => {
//     return axios.delete(`https://64537d50e9ac46cedf26a94a.mockapi.io/employee/${id}`)
//     .then((res) => res.data)
// }
