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
    <div className="bg-teal-700 min-h-screen px-10 py-8">

      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <p className="text-xs uppercase text-blue-900">
            Open Position: Senior Product Designer
          </p>

          <h1 className="text-3xl font-bold text-black">
            Job Applications
          </h1>

          <p className="text-sm text-black">
            Reviewing 24 top-tier candidates curated for your team
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center bg-gray-200 rounded px-3 w-[350px]">
          <Search size={18} className="text-gray-600"/>
          <input
            type="text"
            placeholder="Search for job title, keywords..."
            className="bg-transparent outline-none p-2 w-full"
          />
        </div>

      </div>

      {/* Tabs */}
      <div className="flex gap-8 text-sm border-b pb-2 mb-6">
        <button className="font-semibold">All Applications (24)</button>
        <button>Shortlisted (8)</button>
        <button>Interviewing (3)</button>
        <button>Rejected</button>

        <div className="ml-auto">
          <button className="bg-gray-200 px-4 py-1 rounded">
            Filter
          </button>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-3 gap-6">

        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-gray-200 rounded-2xl p-5"
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

                  <p className="text-blue-600 text-sm">
                    {candidate.role}
                  </p>
                </div>
              </div>

              {/* Score */}
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center text-blue-600 font-semibold">
                  {candidate.score}%
                </div>
                <p className="text-xs">Match Score</p>
              </div>

            </div>

            {/* Skills */}
            <div className="flex gap-2 mt-4 text-xs">
              <span className="bg-purple-200 px-2 py-1 rounded">
                Figma
              </span>
              <span className="bg-pink-200 px-2 py-1 rounded">
                UI/UX
              </span>
              <span className="bg-green-200 px-2 py-1 rounded">
                Mobile app
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-5">
              <button className="bg-gray-300 px-4 py-1 rounded">
                View Profile
              </button>

              <button className="bg-blue-600 text-white px-4 py-1 rounded">
                Shortlist
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="text-blue-800">
          Load More Candidates...
        </button>
      </div>

    </div>
  );
};

export default CompanyJobApplicationsContent;