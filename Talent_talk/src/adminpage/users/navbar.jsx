import React from "react";
import NavButton from "./navbutton";
import { Link } from "react-router-dom";

const buttons = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Jobs", path: "/admin/jobs" },
    { name: "Company", path: "/admin/company" },
    { name: "Invoice", path: "/admin/invoice" },
    { name: "Insights", path: "/admin/insights" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Settings", path: "/admin/settings" },
];

function Navbar(){
    return (
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-gradient-to-r from-slate-950 via-indigo-950 to-violet-950 px-3 shadow-lg shadow-indigo-950/20">
            <div className="flex flex-wrap justify-between items-center">
                {buttons.map((button,idx)=>{
                return <NavButton key={idx} elem={button.name} path={button.path}/>
            })}
            </div>
            <Link to="/admin/settings">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiil4tddZ1owesQPlnPuSmHhkwB2dPJ2ksDw&s" className="mr-4 h-10.5 w-10.5 rounded-4xl ring-2 ring-violet-300/70 ring-offset-2 ring-offset-indigo-950"></img>
            </Link>
        </div>
    )
}

export default Navbar; 
