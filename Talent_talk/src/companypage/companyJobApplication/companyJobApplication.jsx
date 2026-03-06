import React from "react";
import CompanyJobApplicationsContent from "./companyJobApplicationContent";
import CompanyHeader from "../companyclient/companyheader";

function CompanyJobApplication(){
    return (
        <div>
            <CompanyHeader/>
            <CompanyJobApplicationsContent/>
        </div>
    );
}

export default CompanyJobApplication;