import React from "react";
import { Search, Eye, Pencil, Trash2, PauseCircle, RotateCcw, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CompanyManageJobsContent() {

  const navigate = useNavigate();

  const btn = ()=>{
    navigate("/company/postjob")
  }
  


  return (
    <div className="min-h-screen bg-[#f7f4ea] px-10 py-8 text-slate-900">

      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Job Postings</h1>
          <p className="text-sm text-slate-600">
            Oversee your active listings and track applicant progress.
          </p>
        </div>

        <button onClick={btn} className="rounded-full bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-5 py-2 text-white">
          + Post New Jobs
        </button>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex gap-4">
        
        <div className="flex w-[350px] items-center rounded bg-[#fffdf8] px-3 ring-1 ring-[#e7dfcc]">
          <Search size={18} className="text-slate-500"/>
          <input
            type="text"
            placeholder="Search for job title, keywords..."
            className="bg-transparent outline-none p-2 w-full"
          />
        </div>

        <button className="rounded bg-[#efe8d8] px-4 py-2 text-[#16362b]">
          Status All
        </button>

        <button className="rounded bg-[#efe8d8] px-4 py-2 text-[#16362b]">
          Sort: Recent
        </button>

      </div>

      {/* Job Cards */}

      {/* Card 1 */}
      <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">

        <div>
          <h2 className="text-xl font-semibold">Mobile App Developer</h2>

          <div className="mt-2 flex gap-5 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Calendar size={16}/> oct 16, 2026
            </span>
            <span className="flex items-center gap-1">
              <Users size={16}/> 42 Application
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <span className="bg-green-200 text-green-700 px-4 py-1 rounded-full text-sm">
            Active
          </span>

          <button className="flex items-center gap-1 rounded bg-[#efe8d8] px-3 py-1 text-sm text-[#16362b]">
            <Eye size={16}/> View Application
          </button>

          <Pencil className="cursor-pointer"/>
          <PauseCircle className="text-red-500 cursor-pointer"/>
          <Trash2 className="text-red-600 cursor-pointer"/>

        </div>

      </div>

      {/* Card 2 */}
      <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">

        <div>
          <h2 className="text-xl font-semibold">Brand Identity Designer</h2>

          <div className="mt-2 flex gap-5 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Calendar size={16}/> oct 16, 2026
            </span>
            <span className="flex items-center gap-1">
              <Users size={16}/> 0 Application
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <span className="bg-yellow-200 text-yellow-700 px-4 py-1 rounded-full text-sm">
            Pending Approval
          </span>

          <button className="flex items-center gap-1 rounded bg-[#efe8d8] px-3 py-1 text-sm text-[#16362b]">
            <Eye size={16}/> View Application
          </button>

          <Pencil className="cursor-pointer"/>
          <Trash2 className="text-red-600 cursor-pointer"/>

        </div>

      </div>

      {/* Card 3 */}
      <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">

        <div>
          <h2 className="text-xl font-semibold text-gray-400">
            Fullstack Node.js Dev..
          </h2>

          <div className="flex gap-5 text-sm mt-2 text-green-600">
            ✔ Hired: Alex River
          </div>
        </div>

        <div className="flex items-center gap-4">

          <span className="bg-purple-200 text-purple-700 px-4 py-1 rounded-full text-sm">
            Completed
          </span>

          <RotateCcw className="cursor-pointer"/>

        </div>

      </div>

      {/* Card 4 */}
      <div className="flex items-center justify-between rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">

        <div>
          <h2 className="text-xl font-semibold">Data Science(ML)</h2>

          <div className="mt-2 flex gap-5 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Calendar size={16}/> oct 16, 2026
            </span>
            <span className="flex items-center gap-1">
              <Users size={16}/> 18 Application
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <span className="bg-green-200 text-green-700 px-4 py-1 rounded-full text-sm">
            Active
          </span>

          <button className="flex items-center gap-1 rounded bg-[#efe8d8] px-3 py-1 text-sm text-[#16362b]">
            <Eye size={16}/> View Application
          </button>

          <Pencil className="cursor-pointer"/>
          <PauseCircle className="text-red-500 cursor-pointer"/>
          <Trash2 className="text-red-600 cursor-pointer"/>

        </div>

      </div>

    </div>
  );
};

export default CompanyManageJobsContent;
