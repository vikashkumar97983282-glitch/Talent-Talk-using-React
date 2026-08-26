import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminPanel from "../admin/adminPanel/adminPanel";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  Camera,
  CreditCard,
  LockKeyhole,
  Mail,
  PencilLine,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function AccountSettings() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [profileSnapshot, setProfileSnapshot] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get("/admin/profile", { withCredentials: true });
        const data = res.data || {};
        const fullName = [data.firstname, data.lastname].filter(Boolean).join(" ");
        const snapshot = {
          fullName,
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        };

        setFormData({
          ...emptyForm,
          ...snapshot,
        });
        setProfileSnapshot(snapshot);
        setAvatar(data.avatar || "");
        setCreatedAt(data.createdAt || "");
      } catch (error) {
        console.log(error);
        toast.error("Failed to load admin profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      ...(profileSnapshot || {}),
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const phone = formData.phone.trim();
    const phoneRegex = /^\d{10}$/;

    if (phone && !phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.newPassword || formData.currentPassword) {
      if (!formData.currentPassword || !formData.newPassword) {
        toast.error("Enter both current and new password to change your password.");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New password and confirm password must match.");
        return;
      }
    }

    try {
      setIsSaving(true);

      const payload = {
        name: formData.fullName.trim(),
        phone,
        address: formData.address.trim(),
        currentpassword: formData.currentPassword,
        newpassword: formData.newPassword,
        password: formData.newPassword || formData.currentPassword,
      };

      const res = await axios.post("/admin/profileupdate", payload, {
        withCredentials: true,
      });

      const updatedSnapshot = res.data?.admin
        ? {
            fullName:
              [res.data.admin.firstname, res.data.admin.lastname].filter(Boolean).join(" ") ||
              formData.fullName.trim(),
            email: res.data.admin.email || formData.email,
            phone: res.data.admin.phone || phone,
            address: res.data.admin.address || formData.address.trim(),
          }
        : {
            fullName: formData.fullName.trim(),
            email: formData.email,
            phone,
            address: formData.address.trim(),
          };

      if (res.data?.admin?.avatar) {
        setAvatar(res.data.admin.avatar);
      }

      setProfileSnapshot(updatedSnapshot);
      setFormData({
        ...emptyForm,
        ...updatedSnapshot,
      });

      setIsEditing(false);
      toast.success(res.data?.message || "Profile updated successfully.");
      navigate("/admin/settings");
    } catch (error) {
      console.log("Profile update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
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
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload profile image.");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="admin-page-theme flex min-h-screen w-full flex-col bg-[radial-gradient(circle_at_top,_rgba(165,180,252,0.28),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] md:h-screen md:flex-row md:overflow-hidden">
      <AdminPanel />

      <div className="min-w-0 flex-1 md:h-full md:overflow-y-auto">
        <div className="mx-auto min-h-full max-w-7xl px-4 py-6 text-slate-700 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Admin settings</h1>
              <p className="mt-1 text-sm text-slate-500">
                Update profile details, contact information, and security preferences.
              </p>
            </div>

            <Link
              to="/admin/settings"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700"
            >
              <ArrowLeft size={16} />
              Back to overview
            </Link>
          </div>

          <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_repeat(3,minmax(0,220px))]">
            <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)]">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-200/40 blur-2xl" />
              <div className="absolute -bottom-12 right-24 h-28 w-28 rounded-full bg-cyan-200/35 blur-2xl" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 shrink-0">
                  <img
                    src={getAvatarUrl(avatar)}
                    alt="admin profile"
                    className="h-24 w-24 rounded-3xl object-cover ring-4 ring-white shadow-lg"
                  />
                  <label className="absolute -bottom-2 -right-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white shadow-lg transition hover:bg-violet-600">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-violet-700">
                    <ShieldCheck size={13} />
                    Admin account
                  </div>
                  <h2 className="mt-3 truncate text-2xl font-bold tracking-tight text-slate-950">
                    {formData.fullName || "Admin"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{formData.email || "admin@example.com"}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {createdAt ? `Member since ${memberSince}` : "Join date not available"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={isEditing ? resetForm : handleEdit}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700"
                    >
                      <PencilLine size={16} />
                      {isEditing ? "Cancel edit" : "Edit profile"}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/admin/settings")}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition hover:-translate-y-0.5"
                    >
                      <BadgeCheck size={16} />
                      View overview
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-[0_20px_45px_rgba(79,70,229,0.12)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Email</p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-900">{formData.email || "--"}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                The email address is read-only here to keep the admin login stable.
              </p>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-[0_20px_45px_rgba(79,70,229,0.12)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Phone</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formData.phone || "--"}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Keep a valid phone number so account recovery and support reach you quickly.
              </p>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-[0_20px_45px_rgba(79,70,229,0.12)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <CalendarClock size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Joined</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{memberSince}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Your admin profile has been active since the date shown here.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <section className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] sm:p-7">
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <UserRound size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Personal information</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Update your public admin details and contact information.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
                      Full name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 shadow-sm outline-none transition ${
                        isEditing
                          ? "border-violet-200 bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                          : "cursor-not-allowed border-slate-200 bg-slate-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      inputMode="numeric"
                      placeholder="10 digit number"
                      value={formData.phone}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 shadow-sm outline-none transition ${
                        isEditing
                          ? "border-violet-200 bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                          : "cursor-not-allowed border-slate-200 bg-slate-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Office or home location"
                      value={formData.address}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 shadow-sm outline-none transition ${
                        isEditing
                          ? "border-violet-200 bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                          : "cursor-not-allowed border-slate-200 bg-slate-100"
                      }`}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] sm:p-7">
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                    <LockKeyhole size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Change your password only when needed. Leave this section empty to keep your current one.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-slate-700">
                      Current password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 shadow-sm outline-none transition ${
                        isEditing
                          ? "border-violet-200 bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                          : "cursor-not-allowed border-slate-200 bg-slate-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-slate-700">
                      New password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Enter a new password"
                      autoComplete="new-password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 shadow-sm outline-none transition ${
                        isEditing
                          ? "border-violet-200 bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                          : "cursor-not-allowed border-slate-200 bg-slate-100"
                      }`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
                      Confirm new password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border px-4 py-3 text-slate-800 shadow-sm outline-none transition ${
                        isEditing
                          ? "border-violet-200 bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                          : "cursor-not-allowed border-slate-200 bg-slate-100"
                      }`}
                    />
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)]">
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                  <CreditCard size={17} className="text-violet-600" />
                  Account overview
                </h3>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Profile status</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">Active and verified</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Contact</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formData.phone || "Add a phone number"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Location</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formData.address || "Add an address"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-4 text-white">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <BadgeCheck size={16} className="text-cyan-300" />
                    Quick reminder
                  </div>
                  <p className="mt-2 text-sm leading-6 text-indigo-100/80">
                    Use edit mode to update your name, phone, and address. Password changes are optional and only need
                    the current password when you choose to update it.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)]">
                <h3 className="text-base font-semibold text-slate-900">What you can update</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <BadgeCheck size={16} className="text-emerald-600" />
                    Name, phone number, and address
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgeCheck size={16} className="text-emerald-600" />
                    Profile photo
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgeCheck size={16} className="text-emerald-600" />
                    Password and confirmation
                  </p>
                </div>
              </div>
            </aside>
          </form>

          <div className="mt-6 flex justify-end rounded-3xl border border-white/80 bg-white/80 p-4 shadow-[0_20px_45px_rgba(79,70,229,0.12)]">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || isLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition hover:-translate-y-0.5"
              >
                <PencilLine size={16} />
                Edit profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
