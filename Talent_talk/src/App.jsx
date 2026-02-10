import React from 'react'
import Home from './home/home'
import Login from './login/login'
import Admin from './admin/admin'
import { Route, Routes } from 'react-router-dom'


function App() {
  

  return (
    <>
      <div className=''>
        {/* <Home/> */}
        {/* <Login/> */}
        {/* <Admin/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
