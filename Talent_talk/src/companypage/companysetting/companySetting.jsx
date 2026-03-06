import React from "react";
import CompanySettingsContent from "./companySettingContent";
import CompanyAdminPanel from "../companyadmin/companyadminpanel";


function CompanySetting(){
    return (
        <div className="flex">
            <CompanyAdminPanel/>
            <CompanySettingsContent/>
        </div>
    );
}

export default CompanySetting;