import React from "react";
import { useNavigate } from "react-router-dom";

function ClientFindJobHeader() {

  const panel = [
    { name: "Dashboard",  path: "/client/dashboard" },
    { name: "Projects",  path: "/client/projects" },
    { name: "Find Jobs",  path: "/client/find-jobs" },
    { name: "Message",  path: "/client/message" },
    { name: "Payments",  path: "/client/payments" },
    { name: "Settings",  path: "/client/settings" },
  ];

  const navigate = useNavigate();


  const handle = (path)=>{
    navigate(path)
  };

  const handleProfile = ()=>{
    navigate("/client/profile")
  }


  return (
    <div className="bg-teal-700 text-white px-8 py-4 flex justify-between items-center border-b-2">

      {/* Left Profile */}

      <button onClick={handleProfile} className="cursor-pointer">
        <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
      </button>
      

      {/* Right Menu */}
      <ul className="flex gap-8 text-sm">
        {panel.map((elem,idx)=>{
          return (
            <button key={idx} onClick={()=>handle(elem.path)} className="cursor-pointer hover:text-gray-200">{elem.name}</button>
          )
        })}
      </ul>

    </div>
  );
}

export default ClientFindJobHeader;