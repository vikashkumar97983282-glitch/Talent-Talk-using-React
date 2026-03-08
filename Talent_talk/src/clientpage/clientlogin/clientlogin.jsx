import { useState } from "react";

function ClientLogin() {
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen bg-teal-700 flex flex-col items-center justify-center">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {/* Card */}
      <div className="bg-gray-200 w-[380px] rounded-xl p-8 shadow-lg text-center">

        <h2 className="text-2xl font-semibold">Talent Talk</h2>
        <p className="text-sm text-gray-600 mb-6">
          welcome back! please enter your details
        </p>

        {/* Email */}
        <div className="text-left mb-4">
          <label className="text-sm">Email Address</label>
          <input
            type="email"
            placeholder="enter your email Address"
            className="w-full mt-1 p-3 rounded-lg bg-gray-100 outline-none"
          />
        </div>

        {/* Password */}
        <div className="text-left mb-4">
          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="enter your Password"
            className="w-full mt-1 p-3 rounded-lg bg-gray-100 outline-none"
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>

          <span className="text-purple-600 cursor-pointer">
            forgot password?
          </span>
        </div>

        {/* Login Button */}
        <button className="w-40 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold">
          Login
        </button>

    
        <div className="border-t my-6"></div>

        {/* Signup */}
        <p className="text-sm">
          Dont have an account ?{" "}
          <span className="text-purple-600 cursor-pointer">
            sign up for free
          </span>
        </p>

      </div>
    </div>
  );
}

export default ClientLogin;