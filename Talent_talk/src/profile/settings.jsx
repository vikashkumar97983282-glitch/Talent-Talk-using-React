import React from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import PersonalInfo from "./personalInfo";


function Settings(){

    return (
        <div className='flex h-screen w-screen m-0 justify-start overflow-hidden'>
            <AdminPanel/>
            <PersonalInfo/>
            
        </div>
    )
}

export default Settings;