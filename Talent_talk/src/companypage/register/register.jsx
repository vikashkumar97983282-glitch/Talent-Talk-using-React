import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CompanyRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    industry: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/company/register",
        formData,
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success(res.data.message || "Company registered successfully.");
        navigate("/company");
      } else {
        toast.error(res.data?.message || "Registration failed.");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to register company.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f7f4ea]">
      <div className="hidden w-1/2 flex-col justify-center bg-gradient-to-br from-[#14392e] via-[#1f5a49] to-[#3c7a63] p-12 text-white md:flex">
        <h1 className="mb-6 text-4xl font-bold leading-tight">
          Scale your <br /> buisiness with <br /> confidence
        </h1>

        <p className="max-w-md text-lg text-white/90">
          Join over 10,000 enterprises worldwide using our platform to streamline
          operations and drive B2B growth.
        </p>
      </div>

      <div className="flex w-full items-center justify-center p-10 md:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="mb-2 text-3xl font-bold">Create Account</h2>
          <p className="mb-8 text-[#5a7368]">
            Let's get your business set up for success.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[#35584a]">
                Company Legal Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 w-full rounded-md bg-[#fffdf8] px-4 py-2 ring-1 ring-[#e7dfcc] focus:outline-none focus:ring-2 focus:ring-[#3c7a63]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#35584a]">
                Work Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Company Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md bg-[#fffdf8] px-4 py-2 ring-1 ring-[#e7dfcc] focus:outline-none focus:ring-2 focus:ring-[#3c7a63]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#35584a]">
                Create Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-md bg-[#fffdf8] px-4 py-2 ring-1 ring-[#e7dfcc] focus:outline-none focus:ring-2 focus:ring-[#3c7a63]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#35584a]">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md bg-[#fffdf8] px-4 py-2 ring-1 ring-[#e7dfcc] focus:outline-none"
                >
                  <option value="">Select industry</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#35584a]">
                  Headquarters
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Search city..."
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md bg-[#fffdf8] px-4 py-2 ring-1 ring-[#e7dfcc] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] py-3 font-semibold text-white transition hover:opacity-90"
            >
              Create Account
            </button>

            <p className="text-center text-xs text-[#5a7368]">
              By clicking Create Account, you agree to our
              <span className="cursor-pointer text-[#2d6b58]"> Terms of Service </span>
              and
              <span className="cursor-pointer text-[#2d6b58]"> Privacy Policy</span>.
            </p>

            <p className="text-center text-sm text-[#5a7368]">
              Already have a company account?{" "}
              <Link to="/company" className="cursor-pointer text-[#2d6b58]">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegister;

