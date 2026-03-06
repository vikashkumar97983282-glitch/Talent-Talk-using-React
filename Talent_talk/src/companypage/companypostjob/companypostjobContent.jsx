import React from "react";

const CompanyPostJobContent = () => {
  return (
    <div className="bg-teal-700 min-h-screen flex flex-col items-center py-10">

      <h1 className="text-3xl font-bold text-black mb-8">
        Post a New Jobs
      </h1>

      <div className="w-[600px]">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-black">Project Details</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-black text-sm">Save Draft</span>
            <span>💾</span>
          </div>
        </div>

        {/* Job Title */}
        <label className="block text-sm text-black mb-1">
          Job Title
        </label>
        <input
          type="text"
          className="w-full p-3 rounded bg-gray-200 mb-4 outline-none"
        />

        {/* Category */}
        <label className="block text-sm text-black mb-1">
          Project Category
        </label>
        <input
          type="text"
          className="w-full p-3 rounded bg-gray-200 mb-4 outline-none"
        />

        {/* Payment + Timeline */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/3">
            <label className="block text-sm text-black mb-1">
              Payment
            </label>
            <div className="flex items-center bg-gray-200 rounded px-3">
              <span>$</span>
              <input
                type="text"
                className="w-full p-2 bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-black mb-1">
              Time Line
            </label>
            <div className="flex items-center bg-gray-200 rounded px-3">
              <span className="mr-2">📅</span>
              <input
                type="text"
                className="w-full p-2 bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <label className="block text-sm text-black mb-1">
          Job Description
        </label>
        <textarea
          rows="5"
          className="w-full p-3 rounded bg-gray-200 outline-none"
        ></textarea>

        {/* Button */}
        <div className="flex justify-end mt-6">
          <button className="px-10 py-2 text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg">
            Post
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompanyPostJobContent;