import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAdminTheme } from "../adminThemeHook";

function AdminElement({ name, img, path, onNavigate }){
    const { theme } = useAdminTheme();
    return (
        <div className="flex min-w-0 flex-col items-center md:px-3">
            <NavLink
                to={path}
                onClick={onNavigate}
                className={({ isActive }) =>
                    `flex h-10 w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl px-3 text-sm transition-all duration-200 md:gap-4 ${
                        isActive
                            ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 font-semibold text-white shadow-lg shadow-indigo-950/20"
                            : theme === "dark"
                              ? "text-slate-300 hover:bg-white/8 hover:text-white"
                              : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-950"
                    }`
                }
            >
                <img src={img} alt="" className={`h-5 w-5 shrink-0 object-contain ${theme === "dark" && !location.pathname.endsWith(path) ? "brightness-0 invert" : ""}`} />
                <span className="min-w-0 flex-1 truncate">{name}</span>
                <ArrowRight size={14} className={`ml-auto hidden shrink-0 sm:block ${theme === "dark" ? "text-slate-500" : "text-indigo-300"}`} />
            </NavLink>
        </div>
    )
}

export default AdminElement;
