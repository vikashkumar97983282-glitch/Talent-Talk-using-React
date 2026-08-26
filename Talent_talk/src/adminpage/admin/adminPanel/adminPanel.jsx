import React, { useEffect, useState } from "react";
import AdminElement from "./adminElement";
import { Link } from "react-router-dom";
import axios from "axios";

const menu = [
  {
    name: "Dashboard",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828673.png",
    path:"/admin/dashboard"
  },
  {
    name: "Users",
    img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    path:"/admin/users"
  },
  {
    name: "Jobs",
    img: "https://cdn-icons-png.flaticon.com/512/942/942799.png",
    path:"/admin/jobs"
  },
  {
    name: "Company Verification",
    img: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
    path:"/admin/company"
  },
  {
    name: "Invoices",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135673.png",
    path:"/admin/invoice"
  },
  {
    name: "Insights",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    path:"/admin/insights"
  },
  {
    name: "Payments",
    img: "https://cdn-icons-png.flaticon.com/512/179/179457.png",
    path:"/admin/payments"
  },
  {
    name: "Settings",
    img: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png",
    path:"/admin/settings"
  }
];

function AdminPanel(){
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
      const loadAdminProfile = async () => {
        try {
          const res = await axios.get("/admin/profile", { withCredentials: true });
          setAdmin(res.data || null);
        } catch (err) {
          console.log(err);
        }
      };

      loadAdminProfile();
    }, []);

    const getAvatarUrl = (avatarName) => {
      if (!avatarName) {
        return "https://t3.ftcdn.net/jpg/01/00/57/26/360_F_100572672_6eerkmT3J2ekUtGCFP54FiGRAT9VhYsd.jpg";
      }
      const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
      return `${base}/uploads/${avatarName}`;
    };

    const adminName =
      [admin?.firstname, admin?.lastname].filter(Boolean).join(" ").trim() ||
      admin?.name ||
      "Admin Panel";

    return (
        <aside className="w-full shrink-0 border-b border-white/10 bg-gradient-to-b from-slate-950 via-indigo-950 to-violet-950 shadow-2xl shadow-indigo-950/20 md:h-screen md:w-72 md:border-b-0 md:border-r">
          <div className="flex gap-3 px-3 py-3 md:h-full md:flex-col md:gap-7 md:px-0 md:py-6">
            <Link to="/admin/settings" className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2 transition hover:bg-white/[0.12] md:mx-3 md:py-3">
                <img
                  src={getAvatarUrl(admin?.avatar)}
                  alt="Admin profile"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-violet-300/70 ring-offset-2 ring-offset-indigo-950"
                />
                <h1 className="truncate text-lg font-semibold tracking-tight text-white">{adminName}</h1>
            </Link>
            <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto md:flex-col md:overflow-visible">
                {menu.map((elem,idx)=>{
                    return <AdminElement key={idx} name={elem.name} img={elem.img} path={elem.path}/>
                })}
            </div>
            <div className="hidden md:mt-auto md:flex md:justify-center md:px-3">
              <button type="button" className="h-11 w-full cursor-pointer rounded-xl border border-white/10 bg-white/[0.08] px-3 text-left text-indigo-100 transition hover:bg-white/[0.15] hover:text-white">
                <span className="flex items-center gap-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/471/471664.png" alt="" className="h-5 w-5 brightness-0 invert"/>
                  <span className="text-sm font-medium">Help and Docs</span>
                </span>
              </button>
            </div>
          </div>
            
        </aside>
    )
}

export default AdminPanel;
