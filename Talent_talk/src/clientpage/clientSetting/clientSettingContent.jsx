import React from "react";
import { useNavigate } from "react-router-dom";

function ClientSettingsContent() {

  const navigate = useNavigate();

  const handle = ()=>{
    navigate("/")
  }


  return (
    <div className="flex-1 bg-gray-100 p-10">

      <h1 className="text-xl font-semibold mb-8">Setting</h1>

      {/* Dark Mode */}
      <div className="flex justify-between items-center mb-6 max-w-md">
        <span>Dark Mode</span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer"/>
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500"></div>
        </label>
      </div>

      {/* Email Alerts */}
      <div className="flex justify-between items-center mb-10 max-w-md">
        <span>Email Alerts</span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer"/>
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500"></div>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Save Changes
        </button>

        <button onClick={handle} className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Logout
        </button>

      </div>

    </div>
  );
}

export default ClientSettingsContent;