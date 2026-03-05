import React from "react";

function CompanyClientContent() {
  return (
    <div className="bg-teal-700 min-h-screen p-12 text-black">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Client</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users"
        className="w-[600px] p-3 rounded-lg bg-gray-200 mb-4"
      />

      {/* Filter */}
      <div className="mb-6">
        <button className="bg-gray-200 px-4 py-1 rounded">
          Filter ▼
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-300 rounded-xl p-6 w-[800px]">

        {/* Table Header */}
        <div className="grid grid-cols-4 mb-4 font-semibold">
          <span>Name</span>
          <span>Roll</span>
          <span>Rating</span>
          <span>Status</span>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-4 items-center py-3">

          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              className="w-8 h-8 rounded-full"
            />
            <span>Sophia Carter</span>
          </div>

          <span>Mobile App Developer</span>
          <span>4.5/5</span>
          <span className="text-green-400 font-semibold">Active</span>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 items-center py-3">

          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/22.jpg"
              className="w-8 h-8 rounded-full"
            />
            <span>Jackson Reed</span>
          </div>

          <span>Content Marketer</span>
          <span>4/5</span>
          <span className="text-yellow-300 font-semibold">Accepts</span>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-4 items-center py-3">

          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/30.jpg"
              className="w-8 h-8 rounded-full"
            />
            <span>Isabella Cole</span>
          </div>

          <span>Senior UX/UI Designer</span>
          <span>4.6/5</span>
          <span className="text-red-500 font-semibold">Deactive</span>
        </div>

      </div>

    </div>
  );
}

export default CompanyClientContent;