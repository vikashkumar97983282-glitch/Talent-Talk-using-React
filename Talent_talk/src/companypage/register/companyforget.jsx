import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CompanyForgotPassword = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState();

  const handlelg = ()=>{
    if(email != null){
      navigate("/company")
    }
  }

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
      }}
    >
      <div className="text-center">

        <h1 className="mb-12 text-4xl font-bold text-[#16362b]">
          Forget Password
        </h1>

        <div className="mx-auto w-[350px] rounded-2xl bg-[#fffdf8]/90 p-8 shadow-xl ring-1 ring-[#e7dfcc]">

          <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="mb-5 w-full rounded-lg bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
          />

          <button
            onClick={handlelg}
            className="w-full rounded-lg bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] py-3 font-semibold text-white hover:opacity-90"
          >
            Send to email
          </button>

        </div>

      </div>
    </div>
  );
};

export default CompanyForgotPassword;
