import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ClientProfileEditContent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [createdYear, setCreatedYear] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/client/profile", {
          withCredentials: true,
        });
        const data = res.data || {};
        const fullName = [data.firstname, data.lastname].filter(Boolean).join(" ");

        setFormData((prev) => ({
          ...prev,
          fullName,
          email: data.email || "",
          phone: data.phone || data.mobile || "",
        }));
        setCreatedYear(data.createdAt ? new Date(data.createdAt).getFullYear() : "");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.success("New password and confirm password must match.");
      return;
    }

    const payload = {
      fullname: formData.fullName.trim(),
      phone: formData.phone,
      newpassword: formData.newPassword,
    };

    try {
      setIsSaving(true);
      const res = await axios.post("http://localhost:3000/client/update", payload, {
        withCredentials: true,
      });

      navigate("/client/profile");
      toast.success(res.data.message)
    } catch (err) {
      console.log(err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 p-10 text-slate-900">
      <form onSubmit={handleSave}>
        <div className="mb-8 flex items-center gap-6">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="h-20 w-20 rounded-full"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {formData.fullName || "Client Profile"}
            </h2>
            <p className="text-sm text-slate-500">Edit your profile details</p>
            <p className="text-sm text-slate-400">
              {createdYear ? `Joined in ${createdYear}` : "Keep your account information up to date"}
            </p>
          </div>
        </div>

        <h3 className="mb-4 font-semibold">Personal Information</h3>

        <div className="mb-8 max-w-md space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full rounded-lg bg-white p-2 ring-1 ring-sky-100"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full rounded-lg bg-white p-2 ring-1 ring-sky-100"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full rounded-lg bg-white p-2 ring-1 ring-sky-100"
          />
        </div>

        <h3 className="mb-4 font-semibold">Security</h3>

        <div className="max-w-md space-y-4">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full rounded-lg bg-white p-2 ring-1 ring-sky-100"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full rounded-lg bg-white p-2 ring-1 ring-sky-100"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full rounded-lg bg-white p-2 ring-1 ring-sky-100"
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isLoading || isSaving}
            className="rounded-lg bg-linear-to-r from-indigo-700 to-sky-700 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientProfileEditContent;
