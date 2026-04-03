import React from "react";
import { NavLink } from "react-router-dom";

function AdminElement({ name, img, path }){

    return (
        <div className="flex flex-col items-center">
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `h-10 w-[83%] m-px flex justify-start gap-5 items-center rounded-md px-2 text-black transition-colors ${
                        isActive ? "bg-blue-200 font-semibold" : "bg-slate-100 hover:bg-gray-200"
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
