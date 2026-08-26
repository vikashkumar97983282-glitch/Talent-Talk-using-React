import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  getCompanyAvatarUrl,
  getCompanyProfileCache,
  setCompanyProfileCache,
} from "../companyUtils/companyProfile";

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
    <div className="flex w-full flex-col gap-3 border-b border-[#dcebdd]/20 bg-gradient-to-r from-[#0f2d24] via-[#18493a] to-[#276254] px-4 py-3 text-[#eef7f1] shadow-lg sm:flex-row sm:items-center sm:justify-between sm:px-8">

      {/* Profile */}
      <NavLink to="/company/profile" className="flex items-center gap-3 rounded-full border border-[#dcebdd]/20 bg-white/10 p-1.5 transition-colors hover:bg-white/15 cursor-pointer">
        <img
          src={getCompanyAvatarUrl(company?.avatar)}
          alt="profile"
          className="w-10 h-10 rounded-full ring-2 ring-[#dcebdd]/40 object-cover"
        />
      </NavLink>

      {/* Navigation */}
      <div className="flex w-full gap-2 overflow-x-auto text-sm font-medium sm:w-auto sm:gap-8">
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
