import React from "react";
import { NavLink } from "react-router-dom";

const panel = [
  { name: "Dashboard",  path: "/client/dashboard" },
  { name: "Projects",  path: "/client/projects" },
  { name: "Find Jobs",  path: "/client/find-jobs" },
  { name: "Message",  path: "/client/message" },
  { name: "Payments",  path: "/client/payments" },
  { name: "Settings",  path: "/client/settings" },
];

function ClientFindJobHeader() {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-sky-800 text-sky-50 px-8 py-4 flex justify-between items-center border-b border-sky-200/20 shadow-lg">

      {/* Left Profile */}

      <NavLink to="/client/profile" className="cursor-pointer">
        <div className="flex items-center gap-3 rounded-full border border-sky-200/20 bg-white/10 p-1.5 transition-colors hover:bg-white/15">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full ring-2 ring-sky-200/40"
        />
      </div>
      </NavLink>
      

      {/* Right Menu */}
      <ul className="flex gap-8 text-sm">
        {panel.map((elem,idx)=>{
          return (
            <NavLink
              key={idx}
              to={elem.path}
              className={({ isActive }) =>
                `rounded-full border px-4 py-2 transition-all duration-200 ${
                  isActive
                    ? "border-sky-100 bg-sky-100 text-sky-950 shadow-md"
                    : "border-transparent text-sky-50 hover:border-sky-200/20 hover:bg-white/10"
                }`
              }
            >
              {elem.name}
            </NavLink>
          )
        })}
      </ul>

    </div>
  );
}

export default ClientFindJobHeader;
