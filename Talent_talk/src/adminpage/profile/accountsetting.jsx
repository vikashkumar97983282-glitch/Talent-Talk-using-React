import React, { useEffect, useState } from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AccountSettings() {

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(()=>{
    const user = async ()=>{
      let res = await axios.get("/admin/profile",{withCredentials:true});
      const data = res.data || {};
      setFormData((prev) => ({
        ...prev,
        fullName: data.firstname+" "+data.lastname || "",
        email: data.email || "",
        phone: data.phone || "",
        currentPassword: "",
      }));
      setAvatar(data.avatar || "");
      setCreatedAt(data.createdAt || "");
    }
    user();
  },[])

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {

    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits ❌");
      return;
    }


    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }
    if (!formData.currentPassword && !formData.newPassword) {
      toast.error("Please enter a password to update your profile.");
      return;
    }

    try {
      const payload = {
        name: formData.fullName,
        password: formData.newPassword || formData.currentPassword,
      };

      await axios.post(
        "/admin/profileupdate",
        payload,
        { withCredentials: true }
      );

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setIsEditing(false);
      toast.success("Profile updated successfully.");
      navigate("/admin/settings");
    } catch (error) {
      console.log("Profile update failed:", error);
      toast.success("Failed to update profile. Please try again.");
    }
  };

  const getAvatarUrl = (avatarName) => {
    if (!avatarName) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxnsgAbYVaKCxUrJ9-dnMi0RvQ5I2mPAFIlw&s";
    }
    const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
    return `${base}/uploads/${avatarName}`;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const payload = new FormData();
    payload.append("image", file);

    try {
      setIsUploadingImage(true);
      const res = await axios.post("/admin/upload", payload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedAvatar = res.data?.admin?.avatar;
      if (updatedAvatar) {
        setAvatar(updatedAvatar);
      }
      toast.success(res.data?.message || "Profile image updated.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload profile image.");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_48%,_#f5f3ff_100%)] md:h-screen md:flex-row md:overflow-hidden">
        <AdminPanel />

    <div className="min-w-0 flex-1 md:h-full md:overflow-y-scroll">
      <div className="min-h-full p-5 text-slate-700 sm:p-10">
        {/* Profile Header */}
        <div className="mb-10 flex items-center rounded-3xl border border-white/80 bg-white/75 p-6 shadow-[0_12px_30px_rgba(79,70,229,0.10)]">
          <img
            src={getAvatarUrl(avatar)}
            alt="profile"
            className="mr-6 h-16 w-16 rounded-full object-cover ring-3 ring-violet-200 ring-offset-3 ring-offset-white"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">{formData.fullName || "Admin"}</h1>
            <p className="font-medium text-violet-600">Admin</p>
            <p className="text-sm text-slate-400">
              {createdAt ? `Joined in ${new Date(createdAt).getFullYear()}` : ""}
            </p>
            <label className="mt-2 inline-block cursor-pointer rounded-lg bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600">
              {isUploadingImage ? "Uploading..." : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploadingImage}
              />
            </label>
          </div>
        </div>

        {/* Form container */}
        <form className="max-w-3xl space-y-10 rounded-3xl border border-white/80 bg-white/75 p-7 shadow-[0_12px_30px_rgba(79,70,229,0.10)]">
          {/* Personal Information */}
          <section>
            <h2 className="mb-6 text-lg font-semibold text-slate-900">Personal Information</h2>
            <div className="space-y-6 max-w-md">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
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
                  className={`w-full rounded-xl border border-indigo-100 bg-white px-4 py-2 text-slate-700 shadow-sm
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-300"
                        : "bg-slate-100 cursor-not-allowed"
                    }`}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  readOnly
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-indigo-100 bg-slate-100 px-4 py-2 text-slate-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
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
                  className={`w-full rounded-xl border border-indigo-100 bg-white px-4 py-2 text-slate-700 shadow-sm
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-300"
                        : "bg-slate-100 cursor-not-allowed"
                    }`}
                />
              </div>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="mb-6 text-lg font-semibold text-slate-900">Security</h2>
            <div className="space-y-6 max-w-md">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
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
                  className={`w-full rounded-xl border border-indigo-100 bg-white px-4 py-2 text-slate-700 shadow-sm
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-300"
                        : "bg-slate-100 cursor-not-allowed"
                    }`}
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
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
                  className={`w-full rounded-xl border border-indigo-100 bg-white px-4 py-2 text-slate-700 shadow-sm
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-300"
                        : "bg-slate-100 cursor-not-allowed"
                    }`}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
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
                  className={`w-full rounded-xl border border-indigo-100 bg-white px-4 py-2 text-slate-700 shadow-sm
                    ${
                      isEditing
                        ? "focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-300"
                        : "bg-slate-100 cursor-not-allowed"
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
                className="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-violet-600"
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-violet-600"
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

