import React from "react";
import  AdminPanel from "./adminPanel/adminPanel";
import Dashboard from "./dashboard/dashboard";


function Admin(){
    return (
        <div className='flex h-screen w-screen m-0 justify-start'>
            {/* <h1>Admin Panel</h1> */}
            <AdminPanel/>
            <Dashboard/>
        </div>
    )
}

export default Admin;