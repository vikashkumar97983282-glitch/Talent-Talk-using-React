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
        <div className=" flex flex-wrap justify-between items-center border-b gray-50">
            <div className="flex flex-wrap justify-between items-center">
                {buttons.map((button,idx)=>{
                return <NavButton key={idx} elem={button.name} path={button.path}/>
            })}
            </div>
            <Link to="/admin/settings">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiil4tddZ1owesQPlnPuSmHhkwB2dPJ2ksDw&s" className="h-10.5 w-10.5 rounded-4xl mr-10"></img>
            </Link>
        </div>
    )
}

export default Navbar; 
