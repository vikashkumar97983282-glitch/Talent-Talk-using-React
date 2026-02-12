import React from "react";
import  AdminPanel from "./adminPanel/adminPanel";
import DashboardPage from "./dashboard/dashboardpage";


function Dashboard(){
    return (
        <div className='flex h-screen w-screen m-0 justify-start'>
            {/* <h1>Admin Panel</h1> */}
            <AdminPanel/>
            <DashboardPage/>
        </div>
    )
}

export default Dashboard;