import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/company")
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">

      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-teal-500 text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold leading-tight mb-6">
          Scale your <br /> buisiness with <br /> confidence
        </h1>

        <p className="text-lg text-white/90 max-w-md">
          Join over 10,000 enterprises worldwide using our platform to streamline
          operations and drive B2B growth.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-10">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 mb-8">
            Let’s get your business set up for success.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Company Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Company Legal Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Work Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Company Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Create Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Industry + City */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
                >
                  <option value="">Select industry</option>
                  <option>IT</option>
                  <option>Finance</option>
                  <option>Manufacturing</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Headquarters
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Search city..."
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
                />
              </div>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Create Account
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center">
              By clicking “Create Account”, you agree to our
              <span className="text-blue-600 cursor-pointer"> Terms of Service </span>
              and
              <span className="text-blue-600 cursor-pointer"> Privacy Policy</span>.
            </p>

            {/* Login */}
            <p className="text-center text-sm text-gray-600">
              Already have a company account?{" "}
              <Link to="/company" className="text-blue-600 cursor-pointer">Log in</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegister;