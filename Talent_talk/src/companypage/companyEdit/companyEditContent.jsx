import React from "react";
import { Link } from "react-router-dom";

function CompanyEditProfile() {
  return (
    <div className="flex-1 min-h-screen bg-[#f7f4ea] p-10 text-slate-900">

      
      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://randomuser.me/api/portraits/women/65.jpg"
          className="w-20 h-20 rounded-full"
          alt="profile"
        />

        <div>
          <h2 className="text-xl font-semibold">Sophia Carter</h2>
          <p className="text-sm text-[#5a7368]">Company Name</p>
          <p className="text-sm text-[#7b8d84]">Joined in 2021</p>
        </div>
      </div>

      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="space-y-4 max-w-md">

        <div>
          <label className="text-sm text-[#35584a]">Full Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">Phone Number</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">Location</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

      </div>

      
      <h3 className="font-semibold mt-8 mb-4">Security</h3>

      <div className="space-y-4 max-w-md">

        <div>
          <label className="text-sm text-[#35584a]">Current Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

      </div>

    <Link to="/company/profile">
      <button className="mt-8 cursor-pointer rounded-lg bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-5 py-2 text-white hover:opacity-90" onClick={()=>{console.log("hello edit ")}}>
        Save Changes
      </button>
    </Link>
    </div>
  );
}

export default CompanyEditProfile;
