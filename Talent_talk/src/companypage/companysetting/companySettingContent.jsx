import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

function CompanySettingsContent() {

  const navigate = useNavigate()

  const [darkMode, setDarkMode] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

  const handlelogout = async ()=>{
    try{
      let res = await axios.post("/company/logout",{},{withCredentials:true});
      console.log(res.data);
      if(res.data.success){
        navigate("/company")
        toast.success(res.data.message);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen flex-1 bg-[#f7f4ea] p-5 text-slate-900 sm:p-10">

      <h2 className="text-lg font-semibold mb-6">Setting</h2>

      {/* Dark Mode */}
      <div className="mb-6 flex w-full max-w-96 items-center justify-between rounded-xl bg-[#fffdf8] px-5 py-4 shadow-sm ring-1 ring-[#e7dfcc]">
        <span>Dark Mode</span>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            darkMode ? "bg-[#3c7a63]" : "bg-[#efe8d8]"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              darkMode ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Email Alerts */}
      <div className="mb-10 flex w-full max-w-96 items-center justify-between rounded-xl bg-[#fffdf8] px-5 py-4 shadow-sm ring-1 ring-[#e7dfcc]">
        <span>Email Alerts</span>

        <button
          onClick={() => setEmailAlert(!emailAlert)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            emailAlert ? "bg-[#3c7a63]" : "bg-[#efe8d8]"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              emailAlert ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">

        <Link to="/company/dashboard" className="rounded-lg bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-4 py-2 text-white">
          Save Changes
        </Link>

        <button onClick={handlelogout} className="rounded-lg bg-rose-500 px-4 py-2 text-white">
          Logout
        </button>

      </div>
    </div>
  );
}

export default CompanySettingsContent;

