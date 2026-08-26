import React from "react";
import CompanySettingsContent from "./companySettingContent";
import CompanyAdminPanel from "../companyadmin/companyadminpanel";


function CompanySetting(){
    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row">
            <CompanyAdminPanel/>
            <div className="min-w-0 flex-1 md:overflow-y-auto"><CompanySettingsContent/></div>
        </div>
    );
}

export default CompanySetting;
