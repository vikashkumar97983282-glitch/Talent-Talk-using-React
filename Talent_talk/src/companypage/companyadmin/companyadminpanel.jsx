import React, { useEffect, useState } from "react";
import { FaHome, FaUser, FaBriefcase, FaBell, FaEnvelope, FaDollarSign, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  getCompanyAvatarUrl,
  getCompanyProfileCache,
  setCompanyProfileCache,
} from "../companyUtils/companyProfile";

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
  const [company, setCompany] = useState(() => getCompanyProfileCache());

  useEffect(() => {
    const loadCompanyProfile = async () => {
      try {
        const res = await axios.get("/company/profile", { withCredentials: true });
        const data = res.data?.company || null;
        setCompany(data);
        setCompanyProfileCache(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadCompanyProfile();
  }, []);

  return (
    <aside className="w-full shrink-0 bg-gradient-to-b from-[#0f2d24] via-[#18493a] to-[#276254] p-3 text-[#eef7f1] shadow-2xl md:h-screen md:w-64 md:p-6">

      <NavLink to="/company/profile" className="mb-3 flex items-center gap-3 rounded-2xl border border-[#dcebdd]/20 bg-white/10 px-3 py-2 backdrop-blur-sm transition-colors hover:bg-white/15 md:mb-10 md:py-3">
        <img
          src={getCompanyAvatarUrl(company?.avatar)}
          alt="Company profile"
          className="w-10 h-10 rounded-full ring-2 ring-[#dcebdd]/50 object-cover"
        />
        <span className="font-semibold">{company?.name || "Company Profile"}</span>
      </NavLink>

      <ul className="flex gap-2 overflow-x-auto pb-1 text-sm md:block md:space-y-4 md:overflow-visible">

        {panel.map((elem,idx)=>{
          const Icon = elem.icon
          return (
            <li key={idx} className="shrink-0">
              <NavLink
                to={elem.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 whitespace-nowrap rounded-xl border px-3 py-2.5 transition-all duration-200 ${
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

    </aside>
  );
};

export default CompanyAdminPanel;
