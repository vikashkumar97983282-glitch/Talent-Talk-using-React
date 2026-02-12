import React from 'react'
import Home from './home/home'
import Login from './login/login'
import Dashboard from './admin/dashboard'
import { Route, Routes } from 'react-router-dom'
import Users from './users/users'
import DashCont from './admin/dashboard/dashCont'
import DashboardPage from './admin/dashboard/dashboardpage'


function App() {
  

  return (
    <>
      <div className=''>
        {/* <Home/> */}
        {/* <Login/> */}
        {/* <Dashboard/> */}
        {/* <User/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/users' element={<Users/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
