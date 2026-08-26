import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAdminTheme } from "../adminThemeHook";

function AdminElement({ name, img, path, onNavigate }){
    const { theme } = useAdminTheme();
    return (
        <div className="flex shrink-0 flex-col items-center md:px-3">
            <NavLink
                to={path}
                onClick={onNavigate}
                className={({ isActive }) =>
                    `flex h-10 w-full items-center justify-start gap-3 rounded-xl px-3 text-sm transition-all duration-200 whitespace-nowrap md:gap-4 ${
                        isActive
                            ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 font-semibold text-white shadow-lg shadow-indigo-950/20"
                            : theme === "dark"
                              ? "text-slate-300 hover:bg-white/8 hover:text-white"
                              : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-950"
                    }`
                }
            >
                <img src={img} alt="" className={`h-5 w-5 object-contain ${theme === "dark" && !location.pathname.endsWith(path) ? "brightness-0 invert" : ""}`} />
                <span>{name}</span>
                <ArrowRight size={14} className={`ml-auto ${theme === "dark" ? "text-slate-500" : "text-indigo-300"}`} />
            </NavLink>
        </div>
    )
}

export default AdminElement;
