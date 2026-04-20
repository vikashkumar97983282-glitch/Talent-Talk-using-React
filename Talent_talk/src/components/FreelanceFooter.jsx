import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGoogle, FaYoutube } from "react-icons/fa";

function FreelanceFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#05070d] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-center gap-3">
          {[FaFacebookF, FaInstagram, FaTwitter, FaGoogle, FaYoutube].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              aria-label="social link"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-sm text-white transition hover:bg-white hover:text-[#05070d]"
            >
              <Icon />
            </a>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-200">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/client/register" className="hover:text-white">Find Freelance Jobs</Link>
          <Link to="/company/register" className="hover:text-white">Hire Freelancers</Link>
          <Link to="/client" className="hover:text-white">Freelance Projects</Link>
          <a href="mailto:support@talenttalk.com" className="hover:text-white">Contact Us</a>
        </div>

        <div className="border-t border-white/15 pt-3 text-center text-xs text-slate-300">
          Copyright {year} Talent Talk. Built for freelance work, hiring, and project collaboration.
        </div>
      </div>
    </footer>
  );
}

export default FreelanceFooter;
