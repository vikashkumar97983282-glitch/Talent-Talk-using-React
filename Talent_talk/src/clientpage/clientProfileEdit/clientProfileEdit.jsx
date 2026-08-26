import React from "react";
import ClientProfilEditContent from "./clientProfileEditContent";
import ClientAdminPanel from "../clientDashboard/clientPanel";

function ClientProfileEdit(){
    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row">
            <ClientAdminPanel/>
            <div className="min-w-0 flex-1 md:h-full md:overflow-y-auto">
                <ClientProfilEditContent/>
            </div>
        </div>
    );
}

export default ClientProfileEdit;
