import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CompanyEditProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [createdYear, setCreatedYear] = useState("");
  const [avatar, setAvatar] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadCompanyProfile = async () => {
      try {
        const res = await axios.get("/company/profile", { withCredentials: true });
        const company = res.data?.company || {};

        setFormData((prev) => ({
          ...prev,
          name: company.name || "",
          email: company.email || "",
          phone: company.phone || "",
          location: company.location || "",
        }));
        setAvatar(company.avatar || "");
        setCreatedYear(company.createdAt ? new Date(company.createdAt).getFullYear() : "");
      } catch (err) {
        console.log(err);
        toast.error("Failed to load company profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanyProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      currentpassword: formData.currentPassword,
      newpassword: formData.newPassword,
    };

    try {
      setIsSaving(true);
      const res = await axios.post("/company/update", payload, { withCredentials: true });

      if (!res.data?.success) {
        toast.error(res.data?.message || "Failed to update profile.");
        return;
      }

      toast.success(res.data?.message || "Profile updated successfully.");
      navigate("/company/profile");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const getAvatarUrl = (avatarName) => {
    if (!avatarName) return "https://randomuser.me/api/portraits/women/65.jpg";
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
      const res = await axios.post("/company/upload", payload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedAvatar = res.data?.company?.avatar;
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
    <div className="flex-1 min-h-screen bg-[#f7f4ea] p-10 text-slate-900">
      <form onSubmit={handleSaveChanges}>

      
      <div className="flex items-center gap-6 mb-8">
        <img
          src={getAvatarUrl(avatar)}
          className="w-20 h-20 rounded-full object-cover"
          alt="profile"
        />

        <div>
          <h2 className="text-xl font-semibold">{formData.name || "Company Profile"}</h2>
          <p className="text-sm text-[#5a7368]">Company Name</p>
          <p className="text-sm text-[#7b8d84]">
            {createdYear ? `Joined in ${createdYear}` : ""}
          </p>
          <label className="mt-2 inline-block cursor-pointer rounded-md bg-[#1f5a49] px-3 py-1 text-sm text-white">
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

      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="space-y-4 max-w-md">

        <div>
          <label className="text-sm text-[#35584a]">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={isLoading}
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
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

        <div>
          <label className="text-sm text-[#35584a]">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg bg-[#fffdf8] p-2 outline-none ring-1 ring-[#e7dfcc]"
          />
        </div>

      </div>

      <button
        type="submit"
        disabled={isLoading || isSaving}
        className="mt-8 cursor-pointer rounded-lg bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-5 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Save Changes
      </button>
      </form>
    </div>
  );
}

export default CompanyEditProfile;
