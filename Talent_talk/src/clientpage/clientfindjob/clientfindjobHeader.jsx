import React from "react";

function ClientFindJobHeader() {
  return (
    <div className="bg-teal-700 text-white px-8 py-4 flex justify-between items-center border-b-2">

      {/* Left Profile */}
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>

      {/* Right Menu */}
      <ul className="flex gap-8 text-sm">
        <li className="cursor-pointer hover:text-gray-200">Dashboard</li>
        <li className="cursor-pointer hover:text-gray-200">Projects</li>
        <li className="cursor-pointer hover:text-gray-200">Find Jobs</li>
        <li className="cursor-pointer hover:text-gray-200">Messages</li>
        <li className="cursor-pointer hover:text-gray-200">Payment</li>
        <li className="cursor-pointer hover:text-gray-200">Settings</li>
      </ul>

    </div>
  );
}

export default ClientFindJobHeader;