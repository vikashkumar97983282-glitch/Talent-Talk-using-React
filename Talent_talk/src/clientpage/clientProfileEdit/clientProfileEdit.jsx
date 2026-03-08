import React from "react";
import ClientProfilEditContent from "./clientProfileEditContent";
import ClientAdminPanel from "../clientDashboard/clientPanel";

function ClientProfileEdit(){
    return (
        <div className="flex h-screen">
            <div className="h-full">
                <ClientAdminPanel/>
            </div>

            <div className="flex-1 h-full overflow-y-auto">
                <ClientProfilEditContent/>
            </div>
        </div>
    );
}

export default ClientProfileEdit;