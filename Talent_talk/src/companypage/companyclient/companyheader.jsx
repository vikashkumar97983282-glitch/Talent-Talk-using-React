import React from "react";
import { NavLink } from "react-router-dom";

const panel = [
  { name: "Dashboard", path:"/company/dashboard"},
  { name: "Client", path:"/company/client"},
  { name: "Post Jobs" ,path:"/company/postjob"},
  { name: "Manage Jobs",  path:"/company/managejob" },
  { name: "Application",  path:"/company/job-application"},
  { name: "Message", path:"/company/message"},
  { name: "Payments",  path:"/company/payments"},
  { name: "Settings",  path:"/company/setting"},
];

function CompanyHeader() {
  return (
    <div className="w-full bg-teal-700 text-white flex items-center justify-between px-8 py-3 border-black border-b-1">

      {/* Profile */}
      <NavLink to="/company/profile" className="flex items-center gap-3 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </NavLink>

      {/* Navigation */}
      <div className="flex gap-8 text-sm font-medium">
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
        
      </div>

    </div>
  );
}

export default CompanyHeader;
