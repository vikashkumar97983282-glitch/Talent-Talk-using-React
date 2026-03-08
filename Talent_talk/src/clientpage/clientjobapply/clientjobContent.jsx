import React from "react";

function ClientJobContent() {
  return (
    <div className="bg-teal-700 min-h-screen py-10 px-6 flex justify-center">
      <div className="w-[750px]">

        {/* Title */}
        <div className="text-white mb-6">
          <p className="text-sm text-gray-200">APPLICATION PROCESS</p>
          <h1 className="text-3xl font-bold">Submit Proposal</h1>
          <p className="text-gray-200">
            Apply for this professional opportunity
          </p>
        </div>

        {/* Job Info */}
        <div className="bg-gray-200 rounded-xl p-5 mb-6 flex justify-between items-center">
          <div>
            <p className="text-blue-600 text-sm">PROJECT FOCUS</p>
            <h3 className="font-semibold">
              Senior UI/UX Designer for Fintech App
            </h3>

            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-blue-600">$5,000 – $8,000</span>
              <span className="bg-green-200 px-3 py-1 rounded">
                3 – 6 Months
              </span>
            </div>
          </div>

          <button className="bg-white px-4 py-2 rounded-lg shadow">
            View Job Details
          </button>
        </div>

        {/* Proposal Form */}
        <div className="bg-gray-200 rounded-xl p-6">

          <h2 className="font-semibold mb-2">Proposal Details</h2>

          {/* Cover Letter */}
          <textarea
            placeholder="Write your professional cover letter here..."
            className="w-full h-32 p-3 rounded-lg mb-4 outline-none"
          ></textarea>

          {/* Bid + Timeline */}
          <div className="grid grid-cols-2 gap-4 mb-4">

            <input
              type="text"
              placeholder="Your Bid Amount"
              className="p-2 rounded-lg"
            />

            <select className="p-2 rounded-lg">
              <option>Less than 1 month</option>
              <option>1-3 months</option>
              <option>3-6 months</option>
            </select>

          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center mb-4">
            <p className="text-gray-600">
              Drag and drop files here or browse files
            </p>
            <p className="text-xs text-gray-500">
              Maximum file size 25MB
            </p>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            <input type="checkbox" />
            <p>I agree to the Terms of Service and Privacy Policy.</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button className="bg-yellow-200 px-5 py-2 rounded">
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-5 py-2 rounded">
              Submit Proposal
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ClientJobContent;