import React from "react";
import { FaHome, FaUser, FaBriefcase, FaBell, FaEnvelope, FaDollarSign, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CompanyAdminPanel = () => {

  const panel = [
  { name: "Dashboard", icon: FaHome, path:"/dashboard"},
  { name: "Client", icon: FaUser ,path:"/client"},
  { name: "Post Jobs", icon: FaBriefcase ,path:"/postjob"},
  { name: "Manage Jobs", icon: FaBriefcase, path:"/managejob" },
  { name: "Application", icon: FaBell ,path:"/job-application"},
  { name: "Message", icon: FaEnvelope ,path:"/message"},
  { name: "Payments", icon: FaDollarSign ,path:"/payments"},
  { name: "Settings", icon: FaCog ,path:"/setting"},
];

const navigate = useNavigate("");

const handle = (path)=>{
  navigate(path)
}


  return (
    <div className="w-64 h-screen bg-teal-700 text-white p-6">

      <button onClick={()=>navigate("/profile")} className="flex items-center gap-3 mb-10 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">Sophi carter</span>
      </button>

      <ul className="space-y-6 text-sm">

        {panel.map((elem,idx)=>{
          const Icon = elem.icon
          return (
            <button onClick={()=>handle(elem.path)} key={idx} className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
            <Icon /> {elem.name}
        </button>
          )
        })}

      </ul>

    </div>
  );
};

export default CompanyAdminPanel;