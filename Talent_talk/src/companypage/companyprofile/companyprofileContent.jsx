import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CompanyProfileContent() {
  const [company, setCompany] = useState(null);

  const getAvatarUrl = (avatarName) => {
    if (!avatarName) return "https://randomuser.me/api/portraits/women/65.jpg";
    const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
    return `${base}/uploads/${avatarName}`;
  };

  useEffect(() => {
    const loadCompanyProfile = async () => {
      try {
        const res = await axios.get("/company/profile", { withCredentials: true });
        setCompany(res.data?.company || null);
      } catch (err) {
        console.log(err);
      }
    };

    loadCompanyProfile();
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-[#f7f4ea] p-12 text-slate-900">

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">

        <img
          src={getAvatarUrl(company?.avatar)}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold">{company?.name || "Company Profile"}</h2>
          <p className="text-sm text-[#5a7368]">Company Name</p>
          <p className="text-sm text-[#7b8d84]">
            {company?.createdAt ? `Joined in ${new Date(company.createdAt).getFullYear()}` : ""}
          </p>
        </div>

      </div>

      {/* Personal Info */}
      <div className="space-y-4">

        <h3 className="font-semibold text-[#35584a]">
          Personal Information
        </h3>

        <div className="space-y-3">
          <p className="text-lg">
            <span className="font-medium">Full Name :</span> {company?.name || "--"}
          </p>

          <p className="text-lg">
            <span className="font-medium">Email :</span> {company?.email || "--"}
          </p>

          <p className="text-lg">
            <span className="font-medium">Phone Number :</span> {company?.phone || "--"}
          </p>

          <p className="text-lg max-w-xl">
            <span className="font-medium">Location : </span>
            {company?.location || "--"}
          </p>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-8">
        <Link to="/company/profile-Edit">
        <button className="cursor-pointer rounded-lg bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-4 py-2 text-white hover:opacity-90">
          edit profile
        </button>
        </Link>
      </div>

    </div>
  );
}

export default CompanyProfileContent;
