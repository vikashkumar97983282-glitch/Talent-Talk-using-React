import React from "react";

function CompanyHeader() {
  return (
    <div className="w-full bg-teal-700 text-white flex items-center justify-between px-8 py-3 border-black border-b-1">

      {/* Profile */}
      <div className="flex items-center gap-3">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-8 text-sm font-medium">
        <span className="cursor-pointer hover:text-gray-200">Dashboard</span>
        <span className="cursor-pointer hover:text-gray-200">Clients</span>
        <span className="cursor-pointer hover:text-gray-200">Post Jobs</span>
        <span className="cursor-pointer hover:text-gray-200">Manage Jobs</span>
        <span className="cursor-pointer hover:text-gray-200">Application</span>
        <span className="cursor-pointer hover:text-gray-200">Messages</span>
        <span className="cursor-pointer hover:text-gray-200">Payments</span>
        <span className="cursor-pointer hover:text-gray-200">Settings</span>
      </div>

    </div>
  );
}

export default CompanyHeader;