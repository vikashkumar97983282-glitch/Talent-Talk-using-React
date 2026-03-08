import { useState } from "react";

function ClientForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center">
      
      <div className="bg-gray-200 w-[380px] p-10 rounded-xl shadow-lg text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">Forget Password</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          
          <div>
            <label className="text-sm">Email Address</label>
            <input
              type="email"
              placeholder="enter your email Address"
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-500"
            >
              Send to email
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Login link */}
        <p className="text-sm">
          Do you have an account ?{" "}
          <span className="text-blue-600 cursor-pointer">Login</span>
        </p>

      </div>

    </div>
  );
}


export default ClientForgetPassword;