import React, { useEffect, useState } from "react";
import AdminElement from "./adminElement";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { CircleHelp, Menu, Settings } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        <>
          <button type="button" aria-label="Open admin menu" title="Open admin menu" onClick={() => { setIsCollapsed(false); setIsMenuOpen(true); }} className="fixed right-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-md md:hidden"><Menu size={20} /></button>
          {isMenuOpen && <button type="button" aria-label="Close admin menu" onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-30 bg-slate-900/25 md:hidden" />}
          <div className={`fixed inset-y-0 left-0 z-40 flex h-screen shrink-0 transition-transform duration-200 md:relative md:z-auto md:translate-x-0 ${isMenuOpen || isCollapsed ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            {isCollapsed && <aside className="flex h-full w-16 shrink-0 flex-col items-center border-r border-slate-200 bg-slate-50 py-5">
              <button type="button" aria-label="Expand admin panel" title="Expand panel" onClick={() => { setIsCollapsed(false); setIsMenuOpen(true); }} className="mb-7 flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-700"><Menu size={20} /></button>
              <div className="flex flex-col items-center gap-3">
                {menu.map((elem) => <NavLink key={elem.path} to={elem.path} title={elem.name} className={({ isActive }) => `flex h-10 w-10 items-center justify-center rounded-lg transition ${isActive ? "bg-indigo-100 text-indigo-700" : "text-slate-400 hover:bg-white hover:text-indigo-700"}`}><img src={elem.img} alt="" className="h-5 w-5 object-contain" /></NavLink>)}
              </div>
              <div className="mt-auto flex flex-col gap-3 text-slate-400"><CircleHelp size={18} /><Settings size={18} /></div>
            </aside>}
            {!isCollapsed && <aside className="h-full w-[min(18rem,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] shrink-0 border-r border-slate-200 bg-white shadow-xl shadow-slate-300/25">
              <div className="flex h-full min-w-0 flex-col gap-5 overflow-y-auto overflow-x-hidden px-3 py-5">
                <div className="flex items-center justify-between px-3">
                  <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-xl font-extrabold uppercase tracking-[0.1em] text-transparent">Talent Talk</div>
                  <button type="button" aria-label="Collapse admin panel" title="Collapse panel" onClick={() => { setIsCollapsed(true); setIsMenuOpen(false); }} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-700"><Menu size={18} /></button>
                </div>
                <Link to="/admin/settings" onClick={() => setIsMenuOpen(false)} className="flex min-w-0 items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-3 transition hover:bg-indigo-100/70">
                  <img src={getAvatarUrl(admin?.avatar)} alt="Admin profile" className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200" />
                  <div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-900">{adminName}</p><p className="truncate text-[10px] text-slate-500">{admin?.email || "Admin Panel"}</p></div>
                </Link>
                <div className="border-t border-slate-200" />
                <div className="flex flex-col gap-1">
                  {menu.map((elem) => <AdminElement key={elem.path} name={elem.name} img={elem.img} path={elem.path} onNavigate={() => setIsMenuOpen(false)} />)}
                </div>
                <div className="mt-auto flex flex-col gap-4"><div className="border-t border-slate-200" /><p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p><button type="button" aria-label="Help and Docs" title="Help and Docs" className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"><CircleHelp size={18} /><span className="text-xs font-medium">Help &amp; Docs</span></button></div>
              </div>
            </aside>}
          </div>
        </>
    )
}

export default AdminPanel;
