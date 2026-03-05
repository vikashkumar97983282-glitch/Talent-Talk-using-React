import React from "react";
import { FaHome, FaUser, FaBriefcase, FaBell, FaEnvelope, FaDollarSign, FaCog } from "react-icons/fa";

const AdminPanel = () => {
  return (
    <div className="w-64 h-screen bg-teal-700 text-white p-6">

      <div className="flex items-center gap-3 mb-10">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">Sophi carter</span>
      </div>

      <ul className="space-y-6 text-sm">

        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
          <FaHome /> Dashboard
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <FaUser /> Client
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <FaBriefcase /> Post Jobs
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <FaBriefcase /> Manage Jobs
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <FaBell /> Application
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <FaEnvelope /> Message
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <FaDollarSign /> Payments
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <FaCog /> Settings
        </li>

      </ul>

    </div>
  );
};

export default AdminPanel;