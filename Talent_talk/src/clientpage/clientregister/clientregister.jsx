import { useState } from "react";
import { FaWallet, FaUser, FaChevronDown } from "react-icons/fa";
import { Outlet, Link , useNavigate} from "react-router-dom";

function ClientRegister() {
  const [purpose, setPurpose] = useState("");

  const navigate = useNavigate();

  const handleregister = ()=>{
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-800 flex items-center justify-center p-6">
      <div className="bg-white/95 w-full max-w-5xl rounded-xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

        <form onSubmit={handleregister}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          

          {/* Left Side */}
          <div className="space-y-4 border-r pr-6">

            <input
              type="text"
              placeholder="First Name"
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <input
              type="email"
              placeholder="Enter your email Address"
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <input
              type="password"
              placeholder="Enter Password"
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <textarea
              placeholder="Full Address"
              rows="4"
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Purpose Cards */}
            <div className="flex gap-4">

              <div
                onClick={() => setPurpose("earn")}
                className={`flex-1 p-5 rounded-xl bg-white shadow cursor-pointer text-center ${
                  purpose === "earn" ? "border-2 border-sky-500" : ""
                }`}
              >
                <FaWallet className="text-4xl mx-auto mb-2" />
                <p>Earn Money</p>
              </div>

              <div
                onClick={() => setPurpose("education")}
                className={`flex-1 p-5 rounded-xl bg-white shadow cursor-pointer text-center ${
                  purpose === "education" ? "border-2 border-sky-500" : ""
                }`}
              >
                <FaUser className="text-4xl mx-auto mb-2" />
                <p>Education purpose</p>
              </div>

            </div>

            {/* Profession Dropdown */}
            <div className="relative">
              <select className="w-full p-3 rounded-lg bg-slate-100 appearance-none outline-none">
                <option>Choose profession</option>
                <option>Student</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Freelancer</option>
              </select>

              <FaChevronDown className="absolute right-4 top-4 text-slate-500" />
            </div>

            {/* Register Button */}
            <div className="pt-12 flex flex-col items-end">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-700 to-sky-700 text-white font-semibold">
                Register
              </button>

              <p className="text-sm mt-2">
                Do you have an account?{" "}
                <Link to="/client" className="text-sky-700 cursor-pointer">Login</Link>
              </p>
            </div>

          </div>
          

        </div>
        </form>
      </div>
      <Outlet/>
    </div>
  );
}

export default ClientRegister;
