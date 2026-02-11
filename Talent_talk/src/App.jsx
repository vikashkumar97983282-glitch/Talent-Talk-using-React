import React from 'react'
import Home from './home/home'
import Login from './login/login'
import Admin from './admin/admin'
import { Route, Routes } from 'react-router-dom'
import User from './user/user'


function App() {
  

  return (
    <>
      <div className=''>
        {/* <Home/> */}
        {/* <Login/> */}
        {/* <Admin/> */}
        <User/>
        {/* <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes> */}
      </div>
    </>
  )
}

export default App
