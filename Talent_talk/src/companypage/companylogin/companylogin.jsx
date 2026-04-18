import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

function CompanyLogin() {

  const navigate = useNavigate();

  const [email,setemail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e)=>{
    e.preventDefault();

    try {
        let res = await axios.post("/company/login",{email,password},{withCredentials:true})


      if (res.data.success){
        toast.success(res.data.message)
        navigate("/company/dashboard")
      }
      else{
        setemail("");
        setPassword("");
        toast.error(res.data.message || "Invalid email or password.");
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.response?.data?.message || "invalid user")
    }
  }


  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')",
      }}
    >
      <div className="text-center">

        <Link to="/" className="absolute right-7 top-7 flex h-10 min-w-24 items-center justify-center rounded-[10px] bg-white/80 px-4 text-slate-900 hover:bg-white">
                    Home
                </Link>
        
        <h1 className="mb-10 text-4xl font-bold text-[#16362b]">
          Company Login
        </h1>

        <div className="w-[350px] rounded-2xl border border-[#e7dfcc] bg-[#fffdf8]/90 p-8 backdrop-blur-md shadow-xl">

        <form onSubmit={handlelogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className="mb-4 w-full rounded bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete=""
            className="mb-3 w-full rounded bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
          />

          <div className="text-right text-sm mb-4">
            <Link to="/company/forget-password" className="text-[#2d6b58] hover:underline">
              forgot password?
            </Link>
          </div>

          <button className="w-full rounded bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] py-3 font-semibold text-white hover:opacity-90">
            Login
          </button>

          <p className="mt-4 text-sm">
            Dont you have an account ?
            <Link to="/company/register" className="ml-1 text-[#2d6b58] hover:underline">
              Register
            </Link>
          </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;

