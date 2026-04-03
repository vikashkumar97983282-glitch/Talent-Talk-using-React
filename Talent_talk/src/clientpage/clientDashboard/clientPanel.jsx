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
    <div className="w-64 h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-sky-800 p-6 text-sky-50 shadow-2xl">

      {/* Profile */}

      <NavLink to="/client/profile" className="cursor-pointer">
        <div className="mb-10 flex items-center gap-3 rounded-2xl border border-sky-200/20 bg-white/10 px-3 py-3 backdrop-blur-sm transition-colors hover:bg-white/15">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full ring-2 ring-sky-200/40"
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
                  `flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-200 ${
                    isActive
                      ? "border-sky-100/80 bg-sky-100 text-sky-950 font-semibold shadow-lg shadow-slate-950/25"
                      : "border-transparent text-sky-50 hover:border-sky-200/20 hover:bg-white/10"
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
