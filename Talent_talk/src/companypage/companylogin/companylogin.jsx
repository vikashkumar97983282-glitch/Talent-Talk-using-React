import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CompanyLogin() {

  const navigate = useNavigate("");

  const [email,setemail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = ()=>{
    // e.preventDefault()
    if (email === "company@gmail.com"  && password === "1234"){
      console.log("login successfully")
      navigate("/company/dashboard")
    }
    else{
      setemail("");
      setPassword("");
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
        
        <h1 className="text-4xl font-bold text-black mb-10">
          Company Login
        </h1>

        <div className="w-[350px] border border-black/40 p-8 backdrop-blur-md bg-white/10">

        <form onSubmit={handlelogin}>

          <input
            type="email"
            placeholder="Email"
            onChange={(e)=>setemail(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-gray-200 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete=""
            className="w-full p-3 mb-3 rounded bg-gray-200 outline-none"
          />

          <div className="text-right text-sm mb-4">
            <Link to="/company/forget-password" className="text-blue-600 hover:underline">
              forgot password?
            </Link>
          </div>

          <button className="w-full py-3 rounded text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90">
            Login
          </button>

          <p className="mt-4 text-sm">
            Dont you have an account ?
            <Link to="/company/register" className="text-blue-600 ml-1 hover:underline">
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