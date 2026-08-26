import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  getClientAvatarUrl,
  getClientProfileCache,
  setClientProfileCache,
} from "../clientUtils/clientProfile";

const panel = [
  { name: "Dashboard",  path: "/client/dashboard" },
  { name: "Projects",  path: "/client/projects" },
  { name: "Find Jobs",  path: "/client/find-jobs" },
  { name: "Message",  path: "/client/message" },
  { name: "Payments",  path: "/client/payments" },
  { name: "Settings",  path: "/client/settings" },
];

function ClientFindJobHeader() {
  const [client, setClient] = useState(() => getClientProfileCache());

  useEffect(() => {
    const loadClientProfile = async () => {
      try {
        const res = await axios.get("/client/profile", { withCredentials: true });
        const data = res.data || null;
        setClient(data);
        setClientProfileCache(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadClientProfile();
  }, []);

  return (
    <div className="flex flex-col gap-3 border-b border-sky-200/20 bg-gradient-to-r from-slate-950 via-indigo-950 to-sky-800 px-4 py-4 text-sky-50 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:px-8">

      {/* Left Profile */}

      <NavLink to="/client/profile" className="cursor-pointer">
        <div className="flex items-center gap-3 rounded-full border border-sky-200/20 bg-white/10 p-1.5 transition-colors hover:bg-white/15">
        <img
          src={getClientAvatarUrl(client?.avatar)}
          alt="profile"
          className="w-8 h-8 rounded-full ring-2 ring-sky-200/40 object-cover"
        />
      </div>
      </NavLink>
      

      {/* Right Menu */}
      <ul className="flex w-full gap-2 overflow-x-auto text-sm sm:w-auto sm:gap-8">
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
