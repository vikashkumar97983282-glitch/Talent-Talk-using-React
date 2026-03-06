import React from "react";
import CompanyManageJobsContent from "./companymanagejobContent";
import CompanyHeader from "../companyclient/companyheader";


function CompanyManageJob(){
    return (
        <div>
            <CompanyHeader/>
            <CompanyManageJobsContent/>
        </div>
    );
}

export default CompanyManageJob;