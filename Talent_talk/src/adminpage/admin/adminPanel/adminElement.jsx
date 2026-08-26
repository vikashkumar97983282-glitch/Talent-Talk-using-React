import React from "react";
import { NavLink } from "react-router-dom";

function AdminElement({ name, img, path }){
    return (
        <div className="flex flex-col items-center">
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `h-10 w-[83%] m-px flex justify-start gap-5 items-center rounded-md px-2 transition-colors whitespace-nowrap ${
                        isActive
                            ? "bg-indigo-200 text-slate-900 font-semibold shadow-sm"
                            : "bg-white/80 text-slate-700 hover:bg-indigo-100"
                    }`
                }
            >
                <img src={img} alt="" className="h-5 w-5" />
                <span>{name}</span>
            </NavLink>
        </div>
    )
}

export default AdminElement;
