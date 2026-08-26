import React, { useEffect, useState } from "react";
import AdminElement from "./adminElement";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  CircleHelp,
  LayoutDashboard,
  Menu,
  Moon,
  Settings,
  Sun,
  UsersRound,
} from "lucide-react";
import { useAdminTheme } from "../adminThemeHook";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path:"/admin/dashboard"
  },
  {
    name: "Users",
    icon: UsersRound,
    path:"/admin/users"
  },
  {
    name: "Jobs",
    icon: BriefcaseBusiness,
    path:"/admin/jobs"
  },
  {
    name: "Company Verification",
    icon: Building2,
    path:"/admin/company"
  },
  {
    name: "Insights",
    icon: BarChart3,
    path:"/admin/insights"
  },
  {
    name: "Payments",
    icon: CreditCard,
    path:"/admin/payments"
  },
  {
    name: "Settings",
    icon: Settings,
    path:"/admin/settings"
  }
];

function AdminPanel(){
    const [admin, setAdmin] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useAdminTheme();

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
          <button type="button" aria-label="Open admin menu" title="Open admin menu" onClick={() => { setIsCollapsed(false); setIsMenuOpen(true); }} className="fixed right-3 top-3 z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50 md:hidden">
            <Menu size={22} strokeWidth={2.5} />
          </button>
          {isMenuOpen && <button type="button" aria-label="Close admin menu" onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-30 bg-slate-950/45 md:hidden" />}
          <div className={`fixed inset-y-0 left-0 z-40 flex h-screen shrink-0 transition-transform duration-200 md:relative md:inset-auto md:z-auto md:translate-x-0 ${isMenuOpen || isCollapsed ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            {isCollapsed && <aside className={`flex h-full w-16 shrink-0 flex-col items-center border-r py-5 ${theme === "dark" ? "border-slate-700 bg-slate-950" : "border-sky-100 bg-[#f4f8fc]"}`}>
              <button type="button" aria-label="Open admin panel" title="Open panel" onClick={() => { setIsCollapsed(false); setIsMenuOpen(true); }} className={`mb-7 flex h-10 w-10 items-center justify-center rounded-xl transition ${theme === "dark" ? "text-slate-300 hover:bg-slate-800 hover:text-cyan-300" : "text-slate-500 hover:bg-sky-100 hover:text-sky-700"}`}>
                <Menu size={21} />
              </button>
              <div className="flex flex-col items-center gap-3">
                {menu.map(({ icon, name, path }) => <NavLink key={path} to={path} title={name} className={({ isActive }) => `flex h-10 w-10 items-center justify-center rounded-lg transition ${isActive ? (theme === "dark" ? "bg-cyan-400/15 text-cyan-300" : "bg-sky-100 text-sky-700") : (theme === "dark" ? "text-slate-500 hover:bg-slate-800 hover:text-cyan-300" : "text-slate-400 hover:bg-white hover:text-sky-700")}`}>{React.createElement(icon, { size: 18 })}</NavLink>)}
              </div>
              <div className={`mt-auto flex flex-col gap-3 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                <CircleHelp size={18} />
                <Settings size={18} />
              </div>
            </aside>}
            {!isCollapsed && <aside className={`h-full w-[min(18rem,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] shrink-0 border-r shadow-xl transition-colors ${theme === "dark" ? "border-slate-700 bg-slate-950 shadow-black/30" : "border-sky-100 bg-[#fbfdff] shadow-sky-200/30"}`}>
              <div className="flex h-full min-w-0 flex-col gap-5 overflow-y-auto overflow-x-hidden px-3 py-5">
                <div className="flex items-center justify-between px-3">
                  <p className="bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 bg-clip-text text-2xl font-extrabold uppercase tracking-[0.1em] text-transparent">
                    TALENT TALK
                  </p>
                  <button type="button" aria-label="Collapse admin panel" title="Collapse panel" onClick={() => { setIsCollapsed(true); setIsMenuOpen(false); }} className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${theme === "dark" ? "text-slate-400 hover:bg-slate-800 hover:text-cyan-300" : "text-slate-400 hover:bg-slate-100 hover:text-slate-900"}`}>
                    <Menu size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2 px-3">
                  <Link to="/admin/settings" onClick={() => setIsMenuOpen(false)} className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl border px-3 py-3 transition ${theme === "dark" ? "border-slate-700 bg-slate-900 hover:bg-slate-800" : "border-sky-100 bg-sky-50/60 hover:bg-sky-100/70"}`}>
                    <img src={getAvatarUrl(admin?.avatar)} alt="Admin profile" className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200" />
                    <div className="min-w-0"><p className={`truncate text-xs font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{adminName}</p><p className={`truncate text-[10px] ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{admin?.email || "Admin Panel"}</p></div>
                  </Link>
                </div>
                <div className={theme === "dark" ? "border-t border-slate-700" : "border-t border-slate-200"} />
                <div className="flex flex-col gap-2">
                  {menu.map((elem, idx) => <AdminElement key={idx} name={elem.name} icon={elem.icon} path={elem.path} isCollapsed={false} onNavigate={() => setIsMenuOpen(false)} theme={theme} />)}
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className={theme === "dark" ? "border-t border-slate-700" : "border-t border-slate-200"} />
                  <p className={`px-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Workspace</p>
                  <button type="button" aria-label="Toggle theme" title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme} className={`flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left transition ${theme === "dark" ? "text-slate-300 hover:bg-slate-800 hover:text-cyan-300" : "text-slate-600 hover:bg-sky-50 hover:text-sky-700"}`}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}<span className="text-xs font-medium">{theme === "dark" ? "Light mode" : "Dark mode"}</span></button>
                  <button type="button" aria-label="Help and Docs" title="Help and Docs" className={`flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left transition ${theme === "dark" ? "text-slate-300 hover:bg-slate-800 hover:text-cyan-300" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}><CircleHelp size={18} /><span className="text-xs font-medium">Help &amp; Docs</span></button>
                </div>
              </div>
            </aside>}
          </div>
        </>
    )
}

export default AdminPanel;
