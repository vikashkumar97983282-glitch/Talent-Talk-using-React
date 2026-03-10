import React from "react";
import { useNavigate } from "react-router-dom";

function ClientProfileContent() {
  
  const navigate = useNavigate();

  const edit = ()=>{
    navigate("/profileEdit")
  }


  return (
    <div className="flex-1 bg-gray-100 p-12">

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-10">

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold">Sophia Carter</h2>
          <p className="text-gray-500 text-sm">Joined in 2021</p>
        </div>

      </div>

      {/* Personal Info */}
      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="space-y-3 text-lg">
        <p><strong>Full Name :</strong> Sophia Carter</p>
        <p><strong>Email :</strong> sophi@gmail.com</p>
        <p><strong>Phone Number :</strong> 1234561230</p>
      </div>

      {/* Edit Button */}
      <div className="mt-10">
        <button onClick={edit} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Edit Profile
        </button>
      </div>

    </div>
  );
}

export default ClientProfileContent;