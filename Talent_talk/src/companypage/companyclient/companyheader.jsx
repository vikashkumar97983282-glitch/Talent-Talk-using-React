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
  { name: "Settings",  path:"/company/settings"},
];

function CompanyHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-[#0f2d24] via-[#18493a] to-[#276254] text-[#eef7f1] flex items-center justify-between px-8 py-3 border-b border-[#dcebdd]/20 shadow-lg">

      {/* Profile */}
      <NavLink to="/company/profile" className="flex items-center gap-3 rounded-full border border-[#dcebdd]/20 bg-white/10 p-1.5 transition-colors hover:bg-white/15 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full ring-2 ring-[#dcebdd]/40"
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
                `rounded-full border px-4 py-2 transition-all duration-200 ${
                  isActive
                    ? "border-[#f0e8d6] bg-[#f3efe3] text-[#16362b] shadow-md"
                    : "border-transparent text-[#eef7f1] hover:border-[#dcebdd]/20 hover:bg-white/10"
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
