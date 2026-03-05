import React from "react";

const CompanyForgotPassword = () => {
  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
      }}
    >
      <div className="text-center">

        <h1 className="text-4xl font-bold text-black mb-12">
          Forget Password
        </h1>

        <div className="w-[350px] mx-auto">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-200 outline-none mb-5"
          />

          <button
            className="w-full py-3 text-white font-semibold rounded-lg 
            bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90"
          >
            Send to email
          </button>

        </div>

      </div>
    </div>
  );
};

export default CompanyForgotPassword;