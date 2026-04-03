import React from "react";
import { FaHome, FaUser, FaBriefcase, FaBell, FaEnvelope, FaDollarSign, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const panel = [
  { name: "Dashboard", icon: FaHome, path:"/company/dashboard"},
  { name: "Client", icon: FaUser ,path:"/company/client"},
  { name: "Post Jobs", icon: FaBriefcase ,path:"/company/postjob"},
  { name: "Manage Jobs", icon: FaBriefcase, path:"/company/managejob" },
  { name: "Application", icon: FaBell ,path:"/company/job-application"},
  { name: "Message", icon: FaEnvelope ,path:"/company/message"},
  { name: "Payments", icon: FaDollarSign ,path:"/company/payments"},
  { name: "Settings", icon: FaCog ,path:"/company/setting"},
];

const CompanyAdminPanel = () => {
  return (
    <div className="w-64 h-screen bg-teal-700 text-white p-6">

      <NavLink to="/company/profile" className="mb-10 flex items-center gap-3">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Company profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">Sophi carter</span>
      </NavLink>

      <ul className="space-y-6 text-sm">

        {panel.map((elem,idx)=>{
          const Icon = elem.icon
          return (
            <li key={idx}>
              <NavLink
                to={elem.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-white text-teal-700 font-semibold"
                      : "text-white hover:bg-teal-600"
                  }`
                }
              >
                <Icon /> {elem.name}
              </NavLink>
            </li>
          )
        })}

      </ul>

    </div>
  );
};

export default CompanyAdminPanel;
