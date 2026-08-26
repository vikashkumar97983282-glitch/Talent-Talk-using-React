import React from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import PersonalInfo from "./personalInfo";


function Settings(){

    return (
        <div className='admin-page-theme m-0 flex min-h-screen w-full flex-col justify-start bg-slate-50 md:h-screen md:flex-row md:overflow-hidden'>
            <AdminPanel/>
            <PersonalInfo/>
            
        </div>
    )
}

export default Settings;
