import React from 'react'
import { Route, Routes } from 'react-router-dom'
import  Start  from './pages/Introduction'
import Account from './pages/Account'
import SignInSide from './pages/SignIn'
import SignUp from './pages/SignUp'
import Message from './pages/Message'

const Path = () => {
  return (
    <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/account' element={<Account/>} />
        <Route path='/signin' element={<SignInSide />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/message/*' element={<Message />} />
    </Routes>
  )
}
export default Path