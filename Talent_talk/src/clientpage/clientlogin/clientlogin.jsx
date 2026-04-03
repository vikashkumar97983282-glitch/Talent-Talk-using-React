import React from "react";
import { useState } from "react";
import { Outlet , Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ClientLogin() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
   
    if (email === "client@gmail.com" && password === "1234"){
      navigate("/client/dashboard");
      console.log("login successfully!")
    } else{
      setEmail("")
      setPassword("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-800 flex flex-col items-center justify-center text-sky-50">

    
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {/* Card */}
      <div className="bg-white/95 w-[380px] rounded-xl p-8 shadow-xl text-center text-slate-900">
        <form  onSubmit={handleSubmit}>

        <h2 className="text-2xl font-semibold">Talent Talk</h2>
        <p className="text-sm text-slate-500 mb-6">
          welcome back! please enter your details
        </p>

        {/* Email */}
        <div className="text-left mb-4">
          <label className="text-sm">Email Address</label>
          <input
            type="email"
            placeholder="enter your email Address"
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full mt-1 p-3 rounded-lg bg-slate-100 outline-none"
          />
        </div>

        {/* Password */}
        <div className="text-left mb-4">
          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="enter your Password"
            onChange={(e)=>{setPassword(e.target.value)}}
            autoComplete="password"
            className="w-full mt-1 p-3 rounded-lg bg-slate-100 outline-none"
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

          <Link to="/client/forget-password" className="text-sky-700 cursor-pointer">
            forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button type="submit" className="w-40 py-3 rounded-full bg-gradient-to-r from-indigo-700 to-sky-700 text-white font-semibold">
          Login
        </button>

        </form>

    
        <div className="border-t my-6"></div>

        {/* Signup */}
        <p className="text-sm">
          Dont have an account ?{" "}
          <Link to="/client/register" className="text-sky-700 cursor-pointer">
            sign up for free
          </Link>
        </p>
        
        

      </div>
      
      <Outlet/>
    </div>
  );
}

export default ClientLogin;
