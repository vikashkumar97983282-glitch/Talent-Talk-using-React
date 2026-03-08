import React from "react";
import CompanyEditProfile from "./companyEditContent";
import CompanyAdminPanel from "../companyadmin/companyadminpanel";

function CompanyEdit() {
  return (
    <div className="flex h-screen">

      
      <div className="h-screen overflow-hidden">
        <CompanyAdminPanel />
      </div>

      
      <div className="flex-1 overflow-y-auto">
        <CompanyEditProfile />
      </div>

    </div>
  );
}

export default CompanyEdit;