import React from "react";
import { FaHome, FaProjectDiagram, FaSearch, FaEnvelope, FaDollarSign, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ClientAdminPanel() {

  const panel = [
  { name: "Dashboard", icon: FaHome, path: "/client/dashboard" },
  { name: "Projects", icon: FaProjectDiagram, path: "/client/projects" },
  { name: "Find Jobs", icon: FaSearch, path: "/client/find-jobs" },
  { name: "Message", icon: FaEnvelope, path: "/client/message" },
  { name: "Payments", icon: FaDollarSign, path: "/client/payments" },
  { name: "Settings", icon: FaCog, path: "/client/settings" },
];

  const navigate = useNavigate("");

  const handle = (name,path)=>{
    console.log(name)
    navigate(path)
  }

  const handleProfile = ()=>{
    navigate("/client/profile")
  }


  return (
    <div className="w-64 h-screen bg-teal-700 text-white p-6">

      {/* Profile */}

      <button onClick={handleProfile} className="cursor-pointer">
        <div className="flex items-center gap-3 mb-10">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-lg font-semibold">Sophi Carter</h2>
      </div>
      </button>
      

      {/* Menu */}
      <ul className="space-y-6">

        {panel.map((elem,idx)=>{
          const Icon = elem.icon;
          return(
            <button key={idx} onClick={()=>handle(elem.name,elem.path)}  name="{elem.name}" className="flex items-center gap-3 cursor-pointer hover:text-gray-200">
          <Icon />
          {elem.name}
        </button>
          )
        })}


      </ul>

    </div>
  );
}

export default ClientAdminPanel;