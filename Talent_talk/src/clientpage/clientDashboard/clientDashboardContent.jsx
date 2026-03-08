import React from "react";

function ClientDashboardContent() {
  return (
    <div className="flex-1 p-8 bg-gray-100">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold">Personal Insights</h1>
          <p className="text-gray-500">
            Welcome back, Alex. Here's what's happening today.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-200 rounded-lg">Daily</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">Weekly</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">Monthly</button>
        </div>

      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users"
        className="w-80 p-2 border rounded-lg mb-8"
      />

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-teal-600 text-white p-6 rounded-xl">
          <p>Total Earning</p>
          <h2 className="text-2xl font-bold">$24,343</h2>
        </div>

        <div className="bg-teal-600 text-white p-6 rounded-xl">
          <p>Active Applications</p>
          <h2 className="text-2xl font-bold">24</h2>
        </div>

        <div className="bg-teal-600 text-white p-6 rounded-xl">
          <p>Average Rating</p>
          <h2 className="text-2xl font-bold">4.9 / 5.0</h2>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">

        {/* Chart */}
        <div className="col-span-2 bg-teal-700 text-white p-6 rounded-2xl">

          <h3 className="text-lg font-semibold mb-4">
            Earnings Growth
          </h3>

          <div className="bg-white h-52 rounded-lg flex items-center justify-center text-gray-400">
            Chart Area
          </div>

          <p className="mt-4">$12,400 this month</p>

        </div>

        {/* Applied Jobs */}
        <div>

          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Applied Jobs</h3>
            <span className="text-blue-500 cursor-pointer">
              View All
            </span>
          </div>

          <div className="space-y-4">

            <div className="bg-teal-600 text-white p-4 rounded-xl">
              <h4 className="font-semibold">Senior Product Designer</h4>
              <p className="text-sm">Airbnb · $120-$150/hr</p>
              <p className="text-xs">2 days ago · 12 applicants</p>
            </div>

            <div className="bg-teal-600 text-white p-4 rounded-xl">
              <h4 className="font-semibold">Web3 Interface Architect</h4>
              <p className="text-sm">Coinbase · $140-$180/hr</p>
              <p className="text-xs">5 days ago · 8 applicants</p>
            </div>

            <div className="bg-teal-600 text-white p-4 rounded-xl">
              <h4 className="font-semibold">Brand Identity Lead</h4>
              <p className="text-sm">Notion · $90-$120/hr</p>
              <p className="text-xs">4 days ago · 34 applicants</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ClientDashboardContent;