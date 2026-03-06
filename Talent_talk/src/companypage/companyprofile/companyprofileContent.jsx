import React from "react";

function CompanyProfileContent() {
  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-12">

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">

        <img
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold">Sophia Carter</h2>
          <p className="text-gray-500 text-sm">Company Name</p>
          <p className="text-gray-400 text-sm">Joined in 2021</p>
        </div>

      </div>

      {/* Personal Info */}
      <div className="space-y-4">

        <h3 className="font-semibold text-gray-700">
          Personal Information
        </h3>

        <p className="text-lg">
          <span className="font-medium">Full Name :</span> Sophia Carter
        </p>

        <p className="text-lg">
          <span className="font-medium">Email :</span> sophi@gmail.com
        </p>

        <p className="text-lg">
          <span className="font-medium">Phone Number :</span> 1234561230
        </p>

        <p className="text-lg max-w-xl">
          <span className="font-medium">Location :</span>
          asdnjssfoshsfnso,jfhguodhg,kjshu,768930
        </p>

      </div>

      {/* Edit Button */}
      <div className="mt-8">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          edit profile
        </button>
      </div>

    </div>
  );
}

export default CompanyProfileContent;