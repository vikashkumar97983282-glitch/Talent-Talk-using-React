import React from "react";
import ClientSettingsContent from "./clientSettingContent";
import ClientAdminPanel from "../clientDashboard/clientPanel";


function ClientSetting(){

    return (
        <div className="flex">
            <ClientAdminPanel/>
            <ClientSettingsContent/>
        </div>
    );
}

export default ClientSetting;