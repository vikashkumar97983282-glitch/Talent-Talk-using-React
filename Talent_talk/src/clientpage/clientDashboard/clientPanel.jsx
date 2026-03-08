import React from "react";
import { FaHome, FaProjectDiagram, FaSearch, FaEnvelope, FaDollarSign, FaCog } from "react-icons/fa";

function AdminPanel() {
  return (
    <div className="w-64 h-screen bg-teal-700 text-white p-6">

      {/* Profile */}
      <div className="flex items-center gap-3 mb-10">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-lg font-semibold">Sophi Carter</h2>
      </div>

      {/* Menu */}
      <ul className="space-y-6">

        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
          <FaHome />
          Dashboard
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
          <FaProjectDiagram />
          Projects
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
          <FaSearch />
          Find Jobs
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
          <FaEnvelope />
          Message
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
          <FaDollarSign />
          Payments
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
          <FaCog />
          Settings
        </li>

      </ul>

    </div>
  );
}

export default AdminPanel;