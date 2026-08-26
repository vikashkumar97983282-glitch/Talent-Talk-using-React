import React from "react";
import ClientProfileContent from "./clientProfileContent";
import ClientAdminPanel from "../clientDashboard/clientPanel";


function ClientProfile(){

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row">
            <ClientAdminPanel/>
            <div className="min-w-0 flex-1 md:overflow-y-auto"><ClientProfileContent/></div>
        </div>
    );
}

export default ClientProfile;
