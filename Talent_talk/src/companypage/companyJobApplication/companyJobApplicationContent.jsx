import React from "react";
import { Search } from "lucide-react";

const candidates = [
  { id: 1, name: "Jackson Reed", role: "Mobile App Developer", score: 95 },
  { id: 2, name: "Jackson Reed", role: "Mobile App Developer", score: 94 },
  { id: 3, name: "Jackson Reed", role: "Mobile App Developer", score: 93 },
  { id: 4, name: "Jackson Reed", role: "Mobile App Developer", score: 92 },
  { id: 5, name: "Jackson Reed", role: "Mobile App Developer", score: 91 },
  { id: 6, name: "Jackson Reed", role: "Mobile App Developer", score: 90 },
];

const CompanyJobApplicationsContent = () => {
  return (
    <div className="min-h-screen bg-[#f7f4ea] px-10 py-8 text-slate-900">

      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <p className="text-xs uppercase text-[#3c7a63]">
            Open Position: Senior Product Designer
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Job Applications
          </h1>

          <p className="text-sm text-[#5a7368]">
            Reviewing 24 top-tier candidates curated for your team
          </p>
        </div>

        {/* Search */}
        <div className="flex w-[350px] items-center rounded bg-[#fffdf8] px-3 ring-1 ring-[#e7dfcc]">
          <Search size={18} className="text-slate-500"/>
          <input
            type="text"
            placeholder="Search for job title, keywords..."
            className="bg-transparent outline-none p-2 w-full"
          />
        </div>

      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-8 border-b border-[#e7dfcc] pb-2 text-sm">
        <button className="font-semibold text-[#1f5a49]">All Applications (24)</button>
        <button>Shortlisted (8)</button>
        <button>Interviewing (3)</button>
        <button>Rejected</button>

        <div className="ml-auto">
          <button className="rounded bg-[#efe8d8] px-4 py-1 text-[#16362b]">
            Filter
          </button>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-3 gap-6">

        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]"
          >

            {/* Profile */}
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/50"
                  alt="candidate"
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h3 className="font-semibold">
                    {candidate.name}
                  </h3>

                  <p className="text-sm text-[#3c7a63]">
                    {candidate.role}
                  </p>
                </div>
              </div>

              {/* Score */}
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#4f8c73] bg-[#edf5ef] text-[#2d6b58] font-semibold">
                  {candidate.score}%
                </div>
                <p className="text-xs">Match Score</p>
              </div>

            </div>

            {/* Skills */}
            <div className="flex gap-2 mt-4 text-xs">
              <span className="rounded bg-[#e7f1ea] px-2 py-1 text-[#16362b]">
                Figma
              </span>
              <span className="rounded bg-[#eef3de] px-2 py-1 text-[#42543b]">
                UI/UX
              </span>
              <span className="rounded bg-[#f4ecd8] px-2 py-1 text-[#6a5530]">
                Mobile app
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-5">
              <button className="rounded bg-[#efe8d8] px-4 py-1 text-[#16362b]">
                View Profile
              </button>

              <button className="rounded bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-4 py-1 text-white">
                Shortlist
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="text-[#1f5a49]">
          Load More Candidates...
        </button>
      </div>

    </div>
  );
};

export default CompanyJobApplicationsContent;
