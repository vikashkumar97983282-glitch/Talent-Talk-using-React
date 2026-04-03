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
  { name: "Settings", icon: FaCog ,path:"/company/settings"},
];

const CompanyAdminPanel = () => {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#0f2d24] via-[#18493a] to-[#276254] text-[#eef7f1] p-6 shadow-2xl">

      <NavLink to="/company/profile" className="mb-10 flex items-center gap-3 rounded-2xl border border-[#dcebdd]/20 bg-white/10 px-3 py-3 backdrop-blur-sm transition-colors hover:bg-white/15">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Company profile"
          className="w-10 h-10 rounded-full ring-2 ring-[#dcebdd]/50"
        />
        <span className="font-semibold">Sophi carter</span>
      </NavLink>

      <ul className="space-y-4 text-sm">

        {panel.map((elem,idx)=>{
          const Icon = elem.icon
          return (
            <li key={idx}>
              <NavLink
                to={elem.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-200 ${
                    isActive
                      ? "border-[#e6f1e8] bg-[#f3efe3] text-[#16362b] font-semibold shadow-lg shadow-slate-950/20"
                      : "border-transparent text-[#eef7f1] hover:border-[#dcebdd]/20 hover:bg-white/10"
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
