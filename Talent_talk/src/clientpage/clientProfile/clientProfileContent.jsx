import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientProfileContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get("/client/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadProfile();
  }, []);

  const edit = () => {
    navigate("/client/profileEdit");
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return "https://i.pravatar.cc/100";
    const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
    return `${base}/uploads/${avatar}`;
  };

  return (
    <div className="flex-1 bg-slate-50 p-12 text-slate-900">
      <div className="mb-10 flex items-center gap-6">
        <img
          src={getAvatarUrl(user?.avatar)}
          alt="profile"
          className="h-20 w-20 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold">
            {user ? `${user.firstname} ${user.lastname}` : ""}
          </h2>
          <p className="text-sm text-slate-500">
            {user?.createdAt ? `Joined in ${new Date(user.createdAt).getFullYear()}` : ""}
          </p>
        </div>
      </div>

      <h3 className="mb-4 font-semibold">Personal Information</h3>

      <div className="space-y-3 text-lg">
        <p><strong>Full Name :</strong> {user ? `${user.firstname} ${user.lastname}` : ""}</p>
        <p><strong>Email :</strong> {user?.email}</p>
        <p><strong>Phone Number :</strong> {user?.phone}</p>
      </div>

      <div className="mt-10">
        <button
          onClick={edit}
          className="rounded-lg bg-linear-to-r from-indigo-700 to-sky-700 px-4 py-2 text-white"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ClientProfileContent;

