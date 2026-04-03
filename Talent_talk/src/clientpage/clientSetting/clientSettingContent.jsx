import React from "react";
import { Link } from "react-router-dom";

function ClientSettingsContent() {

  // const handle = ()=>{
  //   navigate("/")
  // }


  return (
    <div className="flex-1 bg-slate-50 p-10 text-slate-900">

      <h1 className="text-xl font-semibold mb-8">Setting</h1>

      {/* Dark Mode */}
      <div className="flex justify-between items-center mb-6 max-w-md rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-sky-100">
        <span>Dark Mode</span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer"/>
          <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-sky-600"></div>
        </label>
      </div>

      {/* Email Alerts */}
      <div className="flex justify-between items-center mb-10 max-w-md rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-sky-100">
        <span>Email Alerts</span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer"/>
          <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-sky-600"></div>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">

        <Link to="/client/dashboard" className="bg-gradient-to-r from-indigo-700 to-sky-700 text-white px-4 py-2 rounded-lg">
          Save Changes
        </Link>

        <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Logout
        </Link>

      </div>

    </div>
  );
}

export default ClientSettingsContent;
