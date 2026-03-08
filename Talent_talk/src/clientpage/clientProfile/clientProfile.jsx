import React from "react";
import ClientProfileContent from "./clientProfileContent";
import ClientAdminPanel from "../clientDashboard/clientPanel";


function ClientProfile(){

    return (
        <div className="flex">
            <ClientAdminPanel/>
            <ClientProfileContent/>
        </div>
    );
}

export default ClientProfile;