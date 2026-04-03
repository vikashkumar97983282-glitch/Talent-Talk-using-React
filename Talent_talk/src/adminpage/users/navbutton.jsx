import React from "react";
import { NavLink } from "react-router-dom";

function NavButton({ elem, path }){
    return (
        <div className="ml-5 cursor-pointer">
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `m-5 inline-block rounded-md px-3 py-2 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                        isActive
                            ? "bg-blue-600 text-white"
                            : "text-black hover:bg-blue-100 hover:text-blue-700"
                    }`
                }
            >
                {elem}
            </NavLink>
        </div>
    )
}

export default NavButton;
