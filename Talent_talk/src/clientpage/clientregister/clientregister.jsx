import { useState } from "react";
import { FaWallet, FaUser, FaChevronDown } from "react-icons/fa";

function ClientRegister() {
  const [purpose, setPurpose] = useState("");

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center p-6">
      <div className="bg-gray-200 w-full max-w-5xl rounded-xl p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Side */}
          <div className="space-y-4 border-r pr-6">

            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none"
            />

            <input
              type="email"
              placeholder="Enter your email Address"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none"
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none"
            />

            <textarea
              placeholder="Full Address"
              rows="4"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Purpose Cards */}
            <div className="flex gap-4">

              <div
                onClick={() => setPurpose("earn")}
                className={`flex-1 p-5 rounded-xl bg-white shadow cursor-pointer text-center ${
                  purpose === "earn" ? "border-2 border-purple-500" : ""
                }`}
              >
                <FaWallet className="text-4xl mx-auto mb-2" />
                <p>Earn Money</p>
              </div>

              <div
                onClick={() => setPurpose("education")}
                className={`flex-1 p-5 rounded-xl bg-white shadow cursor-pointer text-center ${
                  purpose === "education" ? "border-2 border-purple-500" : ""
                }`}
              >
                <FaUser className="text-4xl mx-auto mb-2" />
                <p>Education purpose</p>
              </div>

            </div>

            {/* Profession Dropdown */}
            <div className="relative">
              <select className="w-full p-3 rounded-lg bg-gray-100 appearance-none outline-none">
                <option>Choose profession</option>
                <option>Student</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Freelancer</option>
              </select>

              <FaChevronDown className="absolute right-4 top-4 text-gray-600" />
            </div>

            {/* Register Button */}
            <div className="pt-12 flex flex-col items-end">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold">
                Register
              </button>

              <p className="text-sm mt-2">
                Do you have an account?{" "}
                <span className="text-blue-600 cursor-pointer">Login</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ClientRegister;