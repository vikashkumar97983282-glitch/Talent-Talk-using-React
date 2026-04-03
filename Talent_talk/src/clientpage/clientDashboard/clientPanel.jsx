import React from "react";
import { FaHome, FaProjectDiagram, FaSearch, FaEnvelope, FaDollarSign, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const panel = [
  { name: "Dashboard", icon: FaHome, path: "/client/dashboard" },
  { name: "Projects", icon: FaProjectDiagram, path: "/client/projects" },
  { name: "Find Jobs", icon: FaSearch, path: "/client/find-jobs" },
  { name: "Message", icon: FaEnvelope, path: "/client/message" },
  { name: "Payments", icon: FaDollarSign, path: "/client/payments" },
  { name: "Settings", icon: FaCog, path: "/client/settings" },
];

function ClientAdminPanel() {
  return (
    <div className="w-64 h-screen bg-teal-700 text-white p-6">

      {/* Profile */}

      <NavLink to="/client/profile" className="cursor-pointer">
        <div className="flex items-center gap-3 mb-10">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-lg font-semibold">Sophi Carter</h2>
      </div>
      </NavLink>
      

      {/* Menu */}
      <ul className="space-y-6">

        {panel.map((elem,idx)=>{
          const Icon = elem.icon;
          return(
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
                <Icon />
                {elem.name}
              </NavLink>
            </li>
          )
        })}


      </ul>

    </div>
  );
}

export default ClientAdminPanel;
