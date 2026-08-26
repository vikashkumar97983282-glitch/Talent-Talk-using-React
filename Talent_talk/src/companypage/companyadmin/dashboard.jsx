import React from "react";
import CompanyDashboardContent from "./dashboardContent";
import CompanyAdminPanel from "./companyadminpanel";

function CompanyDashboard() {
  return (
    <div className="flex min-h-screen flex-col md:h-screen md:flex-row">
      <CompanyAdminPanel />
      <div className="min-w-0 flex-1 md:overflow-y-auto">
        <CompanyDashboardContent />
      </div>

    </div>
  );
}

export default CompanyDashboard;
