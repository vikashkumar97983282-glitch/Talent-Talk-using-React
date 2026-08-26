import React from "react";
import ClientSettingsContent from "./clientSettingContent";
import ClientAdminPanel from "../clientDashboard/clientPanel";


function ClientSetting(){

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row">
            <ClientAdminPanel/>
            <div className="min-w-0 flex-1 md:overflow-y-auto"><ClientSettingsContent/></div>
        </div>
    );
}

export default ClientSetting;
