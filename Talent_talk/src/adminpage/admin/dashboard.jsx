import React from "react";
import  AdminPanel from "./adminPanel/adminPanel";
import DashboardPage from "./dashboard/dashboardpage";


function Dashboard(){
    return (
        <div className='m-0 flex h-screen w-screen justify-start overflow-hidden bg-slate-100'>
            {/* <h1>Admin Panel</h1> */}
            <AdminPanel/>
            <DashboardPage/>
        </div>
    )
}

export default Dashboard;
