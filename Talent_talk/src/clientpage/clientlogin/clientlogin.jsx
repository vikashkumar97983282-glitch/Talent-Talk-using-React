import React from "react";
import { useState } from "react";
import { Outlet , Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { setClientProfileCache } from "../clientUtils/clientProfile";

function ClientLogin() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
        let res = await axios.post("/client/login",{email,password},{withCredentials:true})
    
      if (res.data.success){
        try {
          const profileRes = await axios.get("/client/profile", { withCredentials: true });
          setClientProfileCache(profileRes.data || null);
        } catch (profileErr) {
          console.log("Unable to preload client profile:", profileErr);
        }
        navigate("/client/dashboard");
        toast.success(res.data.message)
      } else{
        setEmail("")
        setPassword("")
      }
    }
    catch(err){
      console.log(err);
      toast.error("invalid user")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-sky-800 flex flex-col items-center justify-center text-sky-50">

      <Link to="/" className="absolute right-7 top-7 flex h-10 min-w-24 items-center justify-center rounded-[10px] bg-white/80 px-4 text-slate-900 hover:bg-white">
                    Home
                </Link>

    
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {/* Card */}
      <div className="w-full max-w-[380px] rounded-xl bg-white/95 p-5 text-center text-slate-900 shadow-xl sm:p-8">
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
        <button type="submit" className="w-40 py-3 rounded-full bg-linear-to-r from-indigo-700 to-sky-700 text-white font-semibold">
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

