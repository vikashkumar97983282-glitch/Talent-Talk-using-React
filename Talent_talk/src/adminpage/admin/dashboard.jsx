import React from "react";
import  AdminPanel from "./adminPanel/adminPanel";
import DashboardPage from "./dashboard/dashboardpage";


function Dashboard(){
    return (
        <div className='m-0 flex min-h-screen w-full flex-col bg-slate-100 md:h-screen md:flex-row md:overflow-hidden'>
            {/* <h1>Admin Panel</h1> */}
            <AdminPanel/>
            <DashboardPage/>
        </div>
    )
}

export default Dashboard;
