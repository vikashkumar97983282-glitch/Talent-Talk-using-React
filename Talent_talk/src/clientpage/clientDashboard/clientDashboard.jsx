import React from "react";
import ClientHeader from "./clientPanel";
import ClientDashboardContent from "./clientDashboardContent";

function ClientDashboard(){
    return (
        <div className="flex h-screen">
            <div className="h-full">
                <ClientHeader/>
            </div>

            <div className="flex-1 h-full overflow-y-auto">
                <ClientDashboardContent/>
            </div>
        </div>
    );
}

export default ClientDashboard;