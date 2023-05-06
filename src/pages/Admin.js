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
