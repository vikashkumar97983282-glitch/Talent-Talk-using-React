import React from "react";
import CompanyEditProfile from "./companyEditContent";
import CompanyAdminPanel from "../companyadmin/companyadminpanel";

function CompanyEdit() {
  return (
    <div className="flex min-h-screen flex-col md:h-screen md:flex-row">
      <CompanyAdminPanel />
      <div className="min-w-0 flex-1 md:overflow-y-auto">
        <CompanyEditProfile />
      </div>

    </div>
  );
}

export default CompanyEdit;
