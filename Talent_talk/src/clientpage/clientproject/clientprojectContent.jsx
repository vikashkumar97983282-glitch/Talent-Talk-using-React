import React from "react";

function ClientProjectContent() {
  return (
    <div className="bg-teal-700 min-h-screen px-8 py-6 text-white">

      {/* Title */}
      <h1 className="text-2xl font-bold">
        Lead UX Designer for AI-Powered Analytics Dashboard
      </h1>

      <p className="text-gray-200 mt-1">
        Posted 2 hours ago · Remote, Global ·
        <span className="text-blue-300"> FEATURED</span>
      </p>

      {/* Main Section */}
      <div className="grid grid-cols-3 gap-6 mt-6">

        {/* Left Content */}
        <div className="col-span-2 space-y-6">

          {/* Project Description */}
          <div className="bg-gray-200 text-black p-6 rounded-xl">

            <h2 className="font-semibold text-lg mb-3">
              Project Description
            </h2>

            <p className="text-sm mb-4">
              We are seeking a high-caliber Lead UX Designer to spearhead the
              evolution of our flagship AI-driven analytics platform.
            </p>

            <h3 className="font-semibold mb-2">Key Responsibilities</h3>

            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Architect end-to-end user journeys</li>
              <li>Design system tailored for data density</li>
              <li>Collaborate with stakeholders</li>
              <li>Conduct usability testing</li>
            </ul>

            <h3 className="font-semibold mt-4 mb-2">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-purple-200 px-3 py-1 rounded">
                User Research
              </span>
              <span className="bg-purple-200 px-3 py-1 rounded">
                Prototyping
              </span>
              <span className="bg-purple-200 px-3 py-1 rounded">
                Figma Mastery
              </span>
              <span className="bg-purple-200 px-3 py-1 rounded">
                Data Visualization
              </span>
              <span className="bg-purple-200 px-3 py-1 rounded">
                UX Architecture
              </span>
            </div>

          </div>

          {/* Project Assets */}
          <div className="bg-gray-200 text-black p-6 rounded-xl">

            <h2 className="font-semibold text-lg mb-4">
              Project Assets
            </h2>

            <div className="flex gap-6">

              <div className="bg-gray-300 px-4 py-3 rounded">
                Project_Scope.pdf
              </div>

              <div className="bg-gray-300 px-4 py-3 rounded">
                Current_Workflow.jpg
              </div>

            </div>

          </div>

        </div>

        {/* Right Budget Card */}
        <div className="bg-gray-200 text-black rounded-xl overflow-hidden">

          <div className="bg-teal-600 text-white p-5">
            <h2 className="font-semibold mb-2">Estimated Budget</h2>
            <p className="text-xl font-bold">$12,000 - $18,000</p>
            <p className="text-sm mt-1">
              Fixed-price · Intermediate–Expert Level
            </p>
          </div>

          <div className="p-5 space-y-3">

            <p className="text-sm">
              <strong>Project Duration:</strong> 3–6 Months
            </p>

            <p className="text-sm">
              <strong>Weekly Commitment:</strong> 30+ Hours
            </p>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Apply Now
            </button>

            <button className="w-full bg-green-400 py-2 rounded-lg">
              Save Job
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ClientProjectContent;