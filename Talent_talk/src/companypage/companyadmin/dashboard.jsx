import React from "react";
import CompanyDashboardContent from "./dashboardContent";
import CompanyAdminPanel from "./companyadminpanel";

function CompanyDashboard() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 h-screen fixed">
        <CompanyAdminPanel />
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <CompanyDashboardContent />
      </div>

    </div>
  );
}

export default CompanyDashboard;