import React from "react";
import CompanyProfileContent from "./companyprofileContent";
import CompanyAdminPanel from "../companyadmin/companyadminpanel";


function CompanyProfile(){

    return (
        <div className="flex">
            <CompanyAdminPanel />
            <CompanyProfileContent />
        </div>
    );
}


export default CompanyProfile;
