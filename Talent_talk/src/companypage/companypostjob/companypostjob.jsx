import React from "react";
import CompanyPostJobContent from "./companypostjobContent";
import CompanyHeader from "../companyclient/companyheader";


function CompanyPostJob({setPostjob}){
    return (
        <div>
           <CompanyHeader/>
            <CompanyPostJobContent setPostjob={setPostjob}/>
        </div>
    );
}

export default CompanyPostJob;