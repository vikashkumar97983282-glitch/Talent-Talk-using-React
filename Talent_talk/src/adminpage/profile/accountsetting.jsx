import React, { useState } from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";

function AccountSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Rohit Sharma",
    email: "rohit@gmail.com",
    phone: "9798328268",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here (e.g., API call)
    console.log("Saved data:", formData);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
        <AdminPanel />

    <div className="h-full flex-1 min-w-0 overflow-y-scroll">
      <div className="min-h-full p-10 bg-white">
        {/* Profile Header */}
        <div className="flex items-center mb-10">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxnsgAbYVaKCxUrJ9-dnMi0RvQ5I2mPAFIlw&s"
            alt="profile"
            className="w-16 h-16 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold">Sophia Carter</h1>
            <p className="text-gray-600">Admin</p>
            <p className="text-gray-400 text-sm">Joined in 2021</p>
          </div>
        </div>

        {/* Form container */}
        <form className="max-w-3xl space-y-10">
          {/* Personal Information */}
          <section>
            <h2 className="font-semibold mb-6 text-lg">Personal Information</h2>
            <div className="space-y-6 max-w-md">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                />
              </div>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="font-semibold mb-6 text-lg">Security</h2>
            <div className="space-y-6 max-w-md">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                />
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex justify-end">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AccountSettings;
