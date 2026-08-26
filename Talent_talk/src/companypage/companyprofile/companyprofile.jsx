import React from "react";
import CompanyProfileContent from "./companyprofileContent";
import CompanyAdminPanel from "../companyadmin/companyadminpanel";


function CompanyProfile(){

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row">
            <CompanyAdminPanel />
            <div className="min-w-0 flex-1 md:overflow-y-auto"><CompanyProfileContent /></div>
        </div>
    );
}


export default CompanyProfile;
