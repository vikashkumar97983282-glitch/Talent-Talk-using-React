import React from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import PersonalInfo from "./personalInfo";


function Settings(){

    return (
        <div className='admin-page-theme m-0 flex h-screen w-screen justify-start overflow-hidden bg-[radial-gradient(circle_at_top_right,_#dff7ff_0%,_transparent_32%),linear-gradient(135deg,_#f8fcff_0%,_#eef8ff_52%,_#f3fbfa_100%)]'>
            <AdminPanel/>
            <PersonalInfo/>
            
        </div>
    )
}

export default Settings;
