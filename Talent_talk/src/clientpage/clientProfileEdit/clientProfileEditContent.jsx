import React from "react";
import { useNavigate } from "react-router-dom";

function ClientProfileEditContent() {

  const navigate = useNavigate();

  const save = ()=>{
    navigate("/profile")
  }


  return (
    <div className="flex-1 bg-gray-100 p-10">

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold">Sophia Carter</h2>
          <p className="text-gray-500 text-sm">Company Name</p>
          <p className="text-gray-400 text-sm">Joined in 2021</p>
        </div>

      </div>

      {/* Personal Information */}
      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="max-w-md space-y-4 mb-8">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 bg-gray-200 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-gray-200 rounded-lg"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 bg-gray-200 rounded-lg"
        />

      </div>

      {/* Security Section */}
      <h3 className="font-semibold mb-4">Security</h3>

      <div className="max-w-md space-y-4">

        <input
          type="password"
          placeholder="Current Password"
          className="w-full p-2 bg-gray-200 rounded-lg"
        />

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 bg-gray-200 rounded-lg"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-2 bg-gray-200 rounded-lg"
        />

      </div>

      {/* Save Button */}
      <div className="mt-8">
        <button onClick={save} className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
          Save Changes
        </button>
      </div>

    </div>
  );
}

export default ClientProfileEditContent;