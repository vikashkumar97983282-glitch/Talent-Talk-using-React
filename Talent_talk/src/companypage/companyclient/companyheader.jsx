import React from "react";
import { useNavigate } from "react-router-dom";

function CompanyHeader() {

   const panel = [
    { name: "Dashboard", path:"/company/dashboard"},
    { name: "Client", path:"/company/client"},
    { name: "Post Jobs" ,path:"/company/postjob"},
    { name: "Manage Jobs",  path:"/company/managejob" },
    { name: "Application",  path:"/company/job-application"},
    { name: "Message", path:"/company/message"},
    { name: "Payments",  path:"/company/payments"},
    { name: "Settings",  path:"/company/setting"},
  ];

  const navigate = useNavigate()

  const handlebtn = (path)=>{
    navigate(path)
  }


  return (
    <div className="w-full bg-teal-700 text-white flex items-center justify-between px-8 py-3 border-black border-b-1">

      {/* Profile */}
      <button onClick={()=>{navigate("/company/profile")}} className="flex items-center gap-3 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </button>

      {/* Navigation */}
      <div className="flex gap-8 text-sm font-medium">
        {panel.map((elem,idx)=>{
          return (
            <button key={idx} onClick={()=>handlebtn(elem.path)} className="cursor-pointer hover:text-gray-200">{elem.name}</button>
          )
        })}
        
      </div>

    </div>
  );
}

export default CompanyHeader;