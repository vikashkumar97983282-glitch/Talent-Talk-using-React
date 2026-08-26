import React from "react";
import { NavLink } from "react-router-dom";

function AdminElement({ name, img, path }){
    return (
        <div className="flex shrink-0 flex-col items-center md:px-3">
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `flex h-10 w-full items-center justify-start gap-3 rounded-xl px-3 text-sm transition-all duration-200 whitespace-nowrap md:h-11 md:gap-4 ${
                        isActive
                            ? "bg-gradient-to-r from-violet-500 to-indigo-500 font-semibold text-white shadow-lg shadow-indigo-950/30"
                            : "text-indigo-100/75 hover:bg-white/10 hover:text-white"
                    }`
                }
            >
                <img src={img} alt="" className="h-5 w-5 brightness-0 invert" />
                <span>{name}</span>
            </NavLink>
        </div>
    )
}

export default AdminElement;
