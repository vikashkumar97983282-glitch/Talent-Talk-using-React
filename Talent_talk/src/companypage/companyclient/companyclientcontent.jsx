import React from "react";

function CompanyClientContent() {


  return (
    <div className="min-h-screen bg-[#f7f4ea] px-6 py-12 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">

      {/* Title */}
      <h1 className="mb-6 w-full text-2xl font-bold">Client</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users"
        className="mb-4 w-full max-w-[560px] rounded-lg bg-[#fffdf8] p-3 ring-1 ring-[#e7dfcc]"
      />

      {/* Filter */}
      <div className="mb-6 w-full max-w-[560px]">
        <button className="rounded bg-[#efe8d8] px-4 py-1 text-[#16362b]">
          Filter ▼
        </button>
      </div>

      {/* Table */}
      <div className="w-full max-w-[760px] rounded-2xl border border-[#e7dfcc] bg-[#fffdf8] p-6 shadow-sm">

        {/* Table Header */}
        <div className="mb-4 grid grid-cols-4 rounded-xl bg-[#efe8d8] px-4 py-3 font-semibold text-[#16362b]">
          <span>Name</span>
          <span>Roll</span>
          <span>Rating</span>
          <span>Status</span>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-4 items-center rounded-xl py-3">

          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              className="w-8 h-8 rounded-full"
            />
            <span>Sophia Carter</span>
          </div>

          <span>Mobile App Developer</span>
          <span>4.5/5</span>
          <span className="font-semibold text-emerald-600">Active</span>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 items-center rounded-xl border-t border-emerald-100 py-3">

          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/22.jpg"
              className="w-8 h-8 rounded-full"
            />
            <span>Jackson Reed</span>
          </div>

          <span>Content Marketer</span>
          <span>4/5</span>
          <span className="font-semibold text-amber-500">Accepts</span>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-4 items-center rounded-xl border-t border-emerald-100 py-3">

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

    </div>
  );
}

export default CompanyClientContent;
