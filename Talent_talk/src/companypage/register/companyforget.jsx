import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CompanyForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setIsSending(true);
      const res = await axios.post("/company/forgot-password/send-code", {
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
      const res = await axios.post("/company/forgot-password/reset", {
        email: email.trim(),
        code: code.trim(),
        newPassword,
        confirmPassword,
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Password reset successful.");
        navigate("/company");
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
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
      }}
    >
      <div className="text-center">

        <h1 className="mb-12 text-4xl font-bold text-[#16362b]">
          Forgot Password
        </h1>

        <div className="mx-auto w-[350px] rounded-2xl bg-[#fffdf8]/90 p-8 shadow-xl ring-1 ring-[#e7dfcc]">
          <form onSubmit={isCodeSent ? handleResetPassword : handleSendCode}>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              className="mb-5 w-full rounded-lg bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
            />

            {isCodeSent && (
              <>
                <input
                  type="text"
                  value={code}
                  onChange={(e)=>setCode(e.target.value)}
                  placeholder="Verification code"
                  className="mb-5 w-full rounded-lg bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
                />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="mb-5 w-full rounded-lg bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="mb-5 w-full rounded-lg bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
                />
              </>
            )}

            <button
              type="submit"
              disabled={isSending || isResetting}
              className="w-full rounded-lg bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCodeSent ? (isResetting ? "Resetting..." : "Reset Password") : (isSending ? "Sending..." : "Send Code")}
            </button>
          </form>

          <p className="mt-4 text-sm text-[#35584a]">
            Back to{" "}
            <Link to="/company" className="font-semibold hover:underline">
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default CompanyForgotPassword;
