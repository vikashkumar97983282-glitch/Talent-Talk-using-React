import React from 'react'
import Home from './home/home'
import Login from './login/login'
import Dashboard from './admin/dashboard'
import { Route, Routes } from 'react-router-dom'
import Users from './users/users'
import DashCont from './admin/dashboard/dashCont'
import DashboardPage from './admin/dashboard/dashboardpage'
import Job from './jobs/jobs'
import Payments from './payments/payments'
import Invoice from './invoice/invoice'


function App() {
  

  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/jobs' element={<Job/>}/>
          <Route path='/payments' element={<Payments/>}/>
          <Route path='/invoice' element={<Invoice/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
