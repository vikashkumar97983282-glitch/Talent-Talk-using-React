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
        <div className="h-screen w-[24vw] min-w-72 shrink-0 border-r border-slate-200 bg-white">
          <div className="flex h-full flex-col gap-6 px-4 py-5">
            <Link to="/admin/settings" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <img
                  src={getAvatarUrl(admin?.avatar)}
                  alt="Admin profile"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-200"
                />
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">{adminName}</h1>
                  <p className="text-xs text-slate-500">Control center</p>
                </div>
            </Link>
            <div className="flex flex-col gap-1.5">
                {menu.map((elem,idx)=>{
                    return <AdminElement key={idx} name={elem.name} img={elem.img} path={elem.path}/>
                })}
            </div>
            <div className="mt-auto">
              <button type="button" className="h-11 w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 text-left text-slate-700 transition-colors hover:bg-slate-100">
                <span className="flex items-center gap-5">
                  <img src="https://cdn-icons-png.flaticon.com/512/471/471664.png" alt="" className="h-6 w-6"/>
                  <span>Help and Docs</span>
                </span>
              </button>
            </div>
          </div>
            
        </div>
    )
}

export default AdminPanel;
