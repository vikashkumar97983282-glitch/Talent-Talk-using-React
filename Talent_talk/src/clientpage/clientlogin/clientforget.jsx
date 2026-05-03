import { useState } from "react";
import { Outlet , Link} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ClientForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setIsSending(true);
      const res = await axios.post("/client/forgot-password/send-code", {
        email: email.trim(),
      });

      if (res.data?.success) {
        setIsCodeSent(true);
        toast.success(res.data?.message || "Verification code sent.");
        if (res.data?.devCode) {
          toast.info(`Dev code: ${res.data.devCode}`);
        }
      } else {
        toast.error(res.data?.message || "Failed to send verification code.");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to send verification code.");
    } finally {
      setIsSending(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email.trim() || !code.trim() || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }

    try {
      setIsResetting(true);
      const res = await axios.post("/client/forgot-password/reset", {
        email: email.trim(),
        code: code.trim(),
        newPassword,
        confirmPassword,
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Password reset successful.");
        navigate("/client");
      } else {
        toast.error(res.data?.message || "Failed to reset password.");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-800 flex items-center justify-center">
      
      <div className="bg-white/95 w-[380px] p-10 rounded-xl shadow-xl text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">Forget Password</h1>

        {/* Form */}
        <form onSubmit={isCodeSent ? handleResetPassword : handleSubmit} className="space-y-6 text-left">
          
          <div>
            <label className="text-sm">Email Address</label>
            <input
              type="email"
              placeholder="enter your email Address"
              className="w-full mt-2 p-3 rounded-lg bg-slate-100 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {isCodeSent && (
            <>
              <div>
                <label className="text-sm">Verification Code</label>
                <input
                  type="text"
                  placeholder="enter verification code"
                  className="w-full mt-2 p-3 rounded-lg bg-slate-100 outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm">New Password</label>
                <input
                  type="password"
                  placeholder="enter new password"
                  className="w-full mt-2 p-3 rounded-lg bg-slate-100 outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm">Confirm Password</label>
                <input
                  type="password"
                  placeholder="confirm new password"
                  className="w-full mt-2 p-3 rounded-lg bg-slate-100 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isSending || isResetting}
              className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-700 to-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCodeSent ? (isResetting ? "Resetting..." : "Reset Password") : (isSending ? "Sending..." : "Send Code")}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Login link */}
        <p className="text-sm">
          Do you have an account ?{" "}
          <Link to="/client" className="text-sky-700 cursor-pointer">Login</Link>
        </p>

      </div>
      <Outlet/>

    </div>
  );
}


export default ClientForgetPassword;
