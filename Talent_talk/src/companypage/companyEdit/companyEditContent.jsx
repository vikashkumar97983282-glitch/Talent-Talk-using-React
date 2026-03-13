import React from "react";
import { Link } from "react-router-dom";

function CompanyEditProfile() {
  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-10">

      
      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://randomuser.me/api/portraits/women/65.jpg"
          className="w-20 h-20 rounded-full"
          alt="profile"
        />

        <div>
          <h2 className="text-xl font-semibold">Sophia Carter</h2>
          <p className="text-gray-500 text-sm">Company Name</p>
          <p className="text-gray-400 text-sm">Joined in 2021</p>
        </div>
      </div>

      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="space-y-4 max-w-md">

        <div>
          <label className="text-sm">Full Name</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded-lg bg-gray-200 outline-none"
          />
        </div>

        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 mt-1 rounded-lg bg-gray-200 outline-none"
          />
        </div>

        <div>
          <label className="text-sm">Phone Number</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded-lg bg-gray-200 outline-none"
          />
        </div>

        <div>
          <label className="text-sm">Location</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded-lg bg-gray-200 outline-none"
          />
        </div>

      </div>

      
      <h3 className="font-semibold mt-8 mb-4">Security</h3>

      <div className="space-y-4 max-w-md">

        <div>
          <label className="text-sm">Current Password</label>
          <input
            type="password"
            className="w-full p-2 mt-1 rounded-lg bg-gray-200 outline-none"
          />
        </div>

        <div>
          <label className="text-sm">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-2 mt-1 rounded-lg bg-gray-200 outline-none"
          />
        </div>

        <div>
          <label className="text-sm">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-2 mt-1 rounded-lg bg-gray-200 outline-none"
          />
        </div>

      </div>

    <Link to="/company/profile">
      <button className="mt-8 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-green-600 cursor-pointer" onClick={()=>{console.log("hello edit ")}}>
        Save Changes
      </button>
    </Link>
    </div>
  );
}

export default CompanyEditProfile;