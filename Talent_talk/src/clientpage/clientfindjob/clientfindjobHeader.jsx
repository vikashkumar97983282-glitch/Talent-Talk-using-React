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
    <div className="bg-teal-700 text-white px-8 py-4 flex justify-between items-center border-b-2">

      {/* Left Profile */}

      <NavLink to="/client/profile" className="cursor-pointer">
        <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full"
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
                `rounded-md px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-white text-teal-700"
                    : "text-white hover:bg-teal-600"
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
