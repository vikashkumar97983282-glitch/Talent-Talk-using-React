import React, { useState } from "react";
import { Link } from "react-router-dom";

function CompanySettingsContent() {

  const [darkMode, setDarkMode] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

  return (
    <div className="flex-1 p-10 bg-gray-100 min-h-screen">

      <h2 className="text-lg font-semibold mb-6">Setting</h2>

      {/* Dark Mode */}
      <div className="flex items-center justify-between mb-6 w-96">
        <span>Dark Mode</span>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            darkMode ? "bg-green-500" : "bg-gray-300"
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
      <div className="flex items-center justify-between mb-10 w-96">
        <span>Email Alerts</span>

        <button
          onClick={() => setEmailAlert(!emailAlert)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            emailAlert ? "bg-green-500" : "bg-gray-300"
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

        <Link to="/company/dashboard" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Save Changes
        </Link>

        <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Logout
        </Link>

      </div>
    </div>
  );
}

export default CompanySettingsContent;