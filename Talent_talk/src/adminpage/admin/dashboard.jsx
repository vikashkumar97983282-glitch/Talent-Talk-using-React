import React from "react";
import  AdminPanel from "./adminPanel/adminPanel";
import DashboardPage from "./dashboard/dashboardpage";


function Dashboard(){
    return (
        <div className='admin-page-theme m-0 flex h-screen w-screen justify-start overflow-hidden bg-slate-100'>
            <AdminPanel/>
            <DashboardPage/>
        </div>
    )
}

export default Dashboard;
