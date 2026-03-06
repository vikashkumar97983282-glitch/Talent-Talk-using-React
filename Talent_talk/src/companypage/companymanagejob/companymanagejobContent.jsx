import React from "react";
import { Search, Eye, Pencil, Trash2, PauseCircle, RotateCcw, Calendar, Users } from "lucide-react";

function CompanyManageJobsContent() {
  return (
    <div className="bg-teal-700 min-h-screen px-10 py-8">

      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Job Postings</h1>
          <p className="text-sm text-black">
            Oversee your active listings and track applicant progress.
          </p>
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full">
          + Post New Jobs
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-4 mb-6">
        
        <div className="flex items-center bg-gray-200 rounded px-3 w-[350px]">
          <Search size={18} className="text-gray-600"/>
          <input
            type="text"
            placeholder="Search for job title, keywords..."
            className="bg-transparent outline-none p-2 w-full"
          />
        </div>

        <button className="bg-gray-200 px-4 py-2 rounded">
          Status All
        </button>

        <button className="bg-gray-200 px-4 py-2 rounded">
          Sort: Recent
        </button>

      </div>

      {/* Job Cards */}

      {/* Card 1 */}
      <div className="bg-gray-200 rounded-xl p-5 flex justify-between items-center mb-5">

        <div>
          <h2 className="text-xl font-semibold">Mobile App Developer</h2>

          <div className="flex gap-5 text-sm mt-2 text-gray-700">
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

          <button className="flex items-center gap-1 bg-gray-300 px-3 py-1 rounded text-sm">
            <Eye size={16}/> View Application
          </button>

          <Pencil className="cursor-pointer"/>
          <PauseCircle className="text-red-500 cursor-pointer"/>
          <Trash2 className="text-red-600 cursor-pointer"/>

        </div>

      </div>

      {/* Card 2 */}
      <div className="bg-gray-200 rounded-xl p-5 flex justify-between items-center mb-5">

        <div>
          <h2 className="text-xl font-semibold">Brand Identity Designer</h2>

          <div className="flex gap-5 text-sm mt-2 text-gray-700">
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

          <button className="flex items-center gap-1 bg-gray-300 px-3 py-1 rounded text-sm">
            <Eye size={16}/> View Application
          </button>

          <Pencil className="cursor-pointer"/>
          <Trash2 className="text-red-600 cursor-pointer"/>

        </div>

      </div>

      {/* Card 3 */}
      <div className="bg-gray-200 rounded-xl p-5 flex justify-between items-center mb-5">

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
      <div className="bg-gray-200 rounded-xl p-5 flex justify-between items-center">

        <div>
          <h2 className="text-xl font-semibold">Data Science(ML)</h2>

          <div className="flex gap-5 text-sm mt-2 text-gray-700">
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

          <button className="flex items-center gap-1 bg-gray-300 px-3 py-1 rounded text-sm">
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