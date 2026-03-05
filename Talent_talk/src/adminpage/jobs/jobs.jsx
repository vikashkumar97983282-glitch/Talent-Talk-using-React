import React from "react";
import Navbar from "../users/navbar";
import JobBody from "./jobsBody";


function Job(){

    return (
        <div className="h-screen w-full">
            <Navbar/>
            <JobBody/>
        </div>
    )
}

export default Job;