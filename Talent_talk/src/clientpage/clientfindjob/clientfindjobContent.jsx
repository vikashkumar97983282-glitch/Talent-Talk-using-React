import React from "react";

function ClientFindJobContent() {
  return (
    <div className="bg-teal-700 min-h-screen text-white py-12 px-10">

      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold">
          Find Your Next Premium Project
        </h1>

        <p className="mt-3 text-gray-200">
          Connect with top-tier companies and work on high-impact projects
          that match your expertise.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-200 p-4 rounded-xl flex gap-4 w-[70%]">

          <input
            type="text"
            placeholder="Search users"
            className="flex-1 p-2 rounded-md outline-none text-black"
          />

          <select className="p-2 rounded-md text-black">
            <option>Category</option>
          </select>

          <select className="p-2 rounded-md text-black">
            <option>Budget Range</option>
          </select>

          <select className="p-2 rounded-md text-black">
            <option>Job Type</option>
          </select>

        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-8">

        {[1,2,3].map((item)=>(
          <div key={item} className="bg-white text-black rounded-xl p-6">

            <div className="flex justify-between">
              <div className="w-10 h-10 bg-gray-300"></div>
              <span className="text-gray-500">♡</span>
            </div>

            <h3 className="mt-4 font-semibold">
              Senior UI/UX Designer
            </h3>

            <p className="text-blue-600 font-semibold">
              $80k – $120k <span className="text-gray-500">/ year</span>
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Posted 2h ago · Remote
            </p>

            {/* Tags */}
            <div className="flex gap-2 mt-3 text-xs">
              <span className="bg-purple-200 px-2 py-1 rounded">Figma</span>
              <span className="bg-pink-200 px-2 py-1 rounded">UI/UX</span>
              <span className="bg-green-200 px-2 py-1 rounded">Mobile app</span>
            </div>

            <button className="mt-6 w-full bg-blue-700 text-white py-2 rounded-lg">
              Quick Apply
            </button>

          </div>
        ))}

      </div>

      {/* Explore Button */}
      <div className="flex justify-center mt-12">
        <button className="bg-gray-200 text-black px-6 py-3 rounded-xl">
          Explore More Projects
        </button>
      </div>

    </div>
  );
}

export default ClientFindJobContent;