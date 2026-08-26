import React from "react";
import { NavLink } from "react-router-dom";

function NavButton({ elem, path }){
    return (
        <div className="ml-1 cursor-pointer">
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `m-1 inline-block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-violet-300 ${
                        isActive
                            ? "bg-white/15 text-white shadow-sm"
                            : "text-indigo-100/75 hover:bg-white/10 hover:text-white"
                    }`
                }
            >
                {elem}
            </NavLink>
        </div>
    )
}

export default NavButton;
