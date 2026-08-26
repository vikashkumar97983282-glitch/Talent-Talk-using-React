import React from "react";
import ClientHeader from "./clientPanel";
import ClientDashboardContent from "./clientDashboardContent";

function ClientDashboard(){
    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row">
            <ClientHeader/>
            <div className="min-w-0 flex-1 md:h-full md:overflow-y-auto">
                <ClientDashboardContent/>
            </div>
        </div>
    );
}

export default ClientDashboard;
