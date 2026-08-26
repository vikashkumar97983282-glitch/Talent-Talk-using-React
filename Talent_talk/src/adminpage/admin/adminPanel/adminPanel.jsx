import React, { useEffect, useState } from "react";
import AdminElement from "./adminElement";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { CircleHelp, Menu, Moon, Settings, Sun } from "lucide-react";
import { useAdminTheme } from "../adminThemeHook";

const menu = [
  { name: "Dashboard", img: "https://cdn-icons-png.flaticon.com/512/1828/1828673.png", path: "/admin/dashboard" },
  { name: "Users", img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", path: "/admin/users" },
  { name: "Jobs", img: "https://cdn-icons-png.flaticon.com/512/942/942799.png", path: "/admin/jobs" },
  { name: "Company Verification", img: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png", path: "/admin/company" },
  { name: "Invoices", img: "https://cdn-icons-png.flaticon.com/512/3135/3135673.png", path: "/admin/invoice" },
  { name: "Insights", img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", path: "/admin/insights" },
  { name: "Payments", img: "https://cdn-icons-png.flaticon.com/512/179/179457.png", path: "/admin/payments" },
  { name: "Settings", img: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png", path: "/admin/settings" },
];

function AdminPanel() {
  const [admin, setAdmin] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
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
    if (!avatarName) return "https://t3.ftcdn.net/jpg/01/00/57/26/360_F_100572672_6eerkmT3J2ekUtGCFP54FiGRAT9VhYsd.jpg";
    const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
    return `${base}/uploads/${avatarName}`;
  };

  const adminName = [admin?.firstname, admin?.lastname].filter(Boolean).join(" ").trim() || admin?.name || "Admin Panel";

  const helpCards = [
    {
      title: "Dashboard",
      text: "Check user growth, revenue, and recent activity from the main overview.",
    },
    {
      title: "Users",
      text: "Search, filter, and inspect user profiles from the users page.",
    },
    {
      title: "Jobs",
      text: "Review job posts, open details, and keep the marketplace clean.",
    },
    {
      title: "Company verification",
      text: "Scan company submissions and review their profile cards quickly.",
    },
  ];

  return (
    <>
      <button type="button" aria-label="Open admin menu" title="Open admin menu" onClick={() => { setIsCollapsed(false); setIsMenuOpen(true); }} className="fixed right-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-md md:hidden"><Menu size={20} /></button>
      {isMenuOpen && <button type="button" aria-label="Close admin menu" onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-30 bg-slate-900/25 md:hidden" />}
      <div className={`fixed inset-y-0 left-0 z-40 flex h-dvh max-w-full shrink-0 overflow-x-hidden transition-transform duration-200 md:relative md:z-auto md:translate-x-0 ${isMenuOpen || isCollapsed ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            {isCollapsed && <aside className={`flex h-full w-16 shrink-0 flex-col items-center border-r py-4 ${theme === "dark" ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-white"}`}>
          <button type="button" aria-label="Expand admin panel" title="Expand panel" onClick={() => { setIsCollapsed(false); setIsMenuOpen(true); }} className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-cyan-50 hover:text-indigo-700"><Menu size={20} /></button>
          <div className="flex flex-col items-center gap-2">
            {menu.map((elem) => <NavLink key={elem.path} to={elem.path} title={elem.name} className={({ isActive }) => `flex h-10 w-10 items-center justify-center rounded-lg transition ${isActive ? "bg-cyan-100 text-indigo-700" : "text-slate-400 hover:bg-cyan-50 hover:text-indigo-700"}`}><img src={elem.img} alt="" className="h-5 w-5 object-contain" /></NavLink>)}
          </div>
          <div className="mt-auto flex flex-col gap-2 pb-1 text-slate-400"><CircleHelp size={18} /><Settings size={18} /></div>
        </aside>}
            {!isCollapsed && <aside className={`h-full w-[min(16rem,calc(100vw-0.75rem))] max-w-[calc(100vw-0.75rem)] shrink-0 overflow-hidden border-r shadow-xl ${theme === "dark" ? "border-slate-700 bg-slate-950 shadow-black/30" : "border-slate-200 bg-white shadow-slate-200/60"}`}>
          <div className="flex h-full min-w-0 flex-col gap-3 overflow-y-auto overflow-x-hidden px-2 py-3 pb-4">
            <div className="flex items-center justify-between px-2">
              <div className="text-lg font-extrabold uppercase tracking-[0.1em] text-indigo-600">Talent Talk</div>
              <button type="button" aria-label="Collapse admin panel" title="Collapse panel" onClick={() => { setIsCollapsed(true); setIsMenuOpen(false); }} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-indigo-700"><Menu size={18} /></button>
            </div>
            <Link to="/admin/settings" onClick={() => setIsMenuOpen(false)} className={`flex min-w-0 items-center gap-3 rounded-xl border px-2.5 py-2.5 transition ${theme === "dark" ? "border-white/10 bg-white/[0.06] hover:bg-white/10" : "border-cyan-100 bg-indigo-50/60 hover:bg-cyan-50"}`}>
              <img src={getAvatarUrl(admin?.avatar)} alt="Admin profile" className={`h-10 w-10 rounded-full object-cover ring-2 ${theme === "dark" ? "ring-violet-400/60" : "ring-indigo-200"}`} />
              <div className="min-w-0"><p className={`truncate text-xs font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{adminName}</p><p className={`truncate text-[10px] ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{admin?.email || "Admin Panel"}</p></div>
            </Link>
            <div className={theme === "dark" ? "border-t border-white/10" : "border-t border-slate-200"} />
            <div className="flex min-w-0 flex-col gap-0.5">
              {menu.map((elem) => <AdminElement key={elem.path} name={elem.name} img={elem.img} path={elem.path} onNavigate={() => setIsMenuOpen(false)} />)}
            </div>
                <div className="mt-auto flex flex-col gap-2 pb-1"><div className={theme === "dark" ? "border-t border-slate-700" : "border-t border-slate-200"} /><p className={`px-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Workspace</p><button type="button" aria-label="Toggle theme" title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme} className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left transition ${theme === "dark" ? "text-slate-300 hover:bg-slate-800 hover:text-cyan-300" : "text-slate-600 hover:bg-cyan-50 hover:text-indigo-700"}`}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}<span className="text-xs font-medium">{theme === "dark" ? "Light mode" : "Dark mode"}</span></button><button type="button" aria-label="Help and Docs" title="Help and Docs" onClick={() => setIsHelpOpen(true)} className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left transition ${theme === "dark" ? "text-slate-300 hover:bg-slate-800 hover:text-cyan-300" : "text-slate-600 hover:bg-slate-100 hover:text-indigo-700"}`}><CircleHelp size={18} /><span className="text-xs font-medium">Help &amp; Docs</span></button></div>
          </div>
        </aside>}
      </div>
      {isHelpOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
          <div
            className={`relative w-full max-w-2xl overflow-hidden rounded-[2rem] border shadow-[0_24px_60px_rgba(15,23,42,0.35)] ${
              theme === "dark"
                ? "border-white/10 bg-slate-950 text-slate-100"
                : "border-white/80 bg-white text-slate-700"
            }`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Help &amp; Docs</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Admin help center</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Quick guidance for the most common admin tasks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                aria-label="Close help modal"
              >
                <CircleHelp size={18} />
              </button>
            </div>

            <div className="grid gap-4 px-6 py-6 md:grid-cols-2">
              {helpCards.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border p-4 ${
                    theme === "dark" ? "border-white/10 bg-white/[0.04]" : "border-slate-100 bg-slate-50/80"
                  }`}
                >
                  <h3 className="text-sm font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 border-t border-slate-100 px-6 py-5 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Support</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">support@talenttalk.com</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Best for</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Admins and moderators</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Tip</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Use search before opening lists</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPanel;
