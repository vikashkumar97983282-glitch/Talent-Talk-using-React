import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function AdminElement({ name, img, path, onNavigate }){
    return (
        <div className="flex shrink-0 flex-col items-center md:px-3">
            <NavLink
                to={path}
                onClick={onNavigate}
                className={({ isActive }) =>
                    `flex h-10 w-full items-center justify-start gap-3 rounded-lg px-3 text-sm transition-all duration-200 whitespace-nowrap md:gap-4 ${
                        isActive
                            ? "bg-indigo-100 font-semibold text-indigo-700 shadow-sm"
                            : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-950"
                    }`
                }
            >
                <img src={img} alt="" className="h-5 w-5 object-contain" />
                <span>{name}</span>
                <ArrowRight size={14} className="ml-auto text-indigo-200" />
            </NavLink>
        </div>
    )
}

export default AdminElement;
