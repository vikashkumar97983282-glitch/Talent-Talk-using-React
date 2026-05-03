import React from "react";
import { NavLink } from "react-router-dom";

function AdminElement({ name, img, path }){
    return (
        <div className="flex flex-col">
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `h-11 w-full m-px flex justify-start gap-4 items-center rounded-lg px-3 transition-all whitespace-nowrap ${
                        isActive
                            ? "bg-slate-900 text-white font-medium shadow-sm"
                            : "text-slate-700 hover:bg-slate-100"
                    }`
                }
            >
                <img src={img} alt="" className="h-5 w-5" />
                <span className="text-sm">{name}</span>
            </NavLink>
        </div>
    )
}

export default AdminElement;
