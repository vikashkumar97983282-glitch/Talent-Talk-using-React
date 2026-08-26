import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function AdminElement({ name, icon: Icon, path, isCollapsed, onNavigate, theme = "light" }){
    return (
        <div className="flex flex-col items-center">
            <NavLink
                to={path}
                onClick={onNavigate}
                title={isCollapsed ? name : undefined}
                className={({ isActive }) =>
                    `m-px flex h-10 w-full items-center rounded-lg px-3 text-sm transition-all duration-200 whitespace-nowrap ${isCollapsed ? "justify-center" : "justify-start gap-3"} ${
                        isActive
                            ? theme === "dark" ? "bg-cyan-400/15 text-cyan-300 font-semibold" : "bg-sky-100 text-sky-700 font-semibold shadow-sm shadow-sky-100"
                            : theme === "dark" ? "text-slate-300 hover:bg-slate-800 hover:text-cyan-300" : "text-slate-700 hover:bg-sky-50 hover:text-sky-950"
                    }`
                }
            >
                {React.createElement(Icon, { size: 19, strokeWidth: 2 })}
                {!isCollapsed && <span>{name}</span>}
                {!isCollapsed && <ArrowRight size={14} className={theme === "dark" ? "ml-auto text-slate-600" : "ml-auto text-sky-200"} />}
            </NavLink>
        </div>
    )
}

export default AdminElement;
