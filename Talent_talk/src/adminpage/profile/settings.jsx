import React from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import PersonalInfo from "./personalInfo";


function Settings(){

    return (
        <div className='m-0 flex min-h-screen w-full flex-col justify-start bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_48%,_#f5f3ff_100%)] md:h-screen md:flex-row md:overflow-hidden'>
            <AdminPanel/>
            <PersonalInfo/>
            
        </div>
    )
}

export default Settings;
