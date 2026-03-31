import React from "react";


function CompanyDashboardContent({postjob,setPostjob}) {



  return (
    <div className="flex">

      {/* Main Dashboard */}
      <div className="flex-1 p-10 bg-gray-100 min-h-screen overflow-auto">

        <h1 className="text-3xl font-bold mb-2">DASHBOARD</h1>
        <p className="text-gray-600 mb-8">
          Welcome back, here's what's happening with your company today
        </p>

        {/* Top Cards */}
        <div className="flex gap-8 mb-10">

          <div className="bg-teal-700 text-white p-6 rounded-xl w-52 text-center">
            <h3 className="text-lg">Active Jobs</h3>
            {/* ✅ dynamic count */}
            <p className="text-3xl font-bold mt-3">{postjob.length}</p>
            <span className="text-blue-300">Updated</span>
          </div>

          <div className="bg-teal-700 text-white p-6 rounded-xl w-52 text-center">
            <h3 className="text-lg">Recent Notification</h3>
            <p className="text-3xl font-bold mt-3">24</p>
          </div>

          <div className="bg-teal-700 text-white p-6 rounded-xl w-52 text-center">
            <h3 className="text-lg">Rating</h3>
            <p className="text-3xl font-bold mt-3">4/5</p>
          </div>

        </div>

        {/* Recent Applications */}
        <div className="bg-teal-700 text-white p-6 rounded-xl w-96 mb-10">

          <h2 className="text-xl mb-6">Recent Application</h2>

          <div className="space-y-5">
            <div className="flex justify-between">
              <span>Olivia Hayes</span>
              <span className="text-blue-300">90%</span>
            </div>
            <div className="flex justify-between">
              <span>Liam Harper</span>
              <span className="text-blue-300">94%</span>
            </div>
            <div className="flex justify-between">
              <span>Ethan Bennett</span>
              <span className="text-blue-300">89%</span>
            </div>
          </div>

          <button className="mt-6 w-full py-2 bg-blue-600 rounded-lg">
            View All
          </button>
        </div>

        {/* ✅ Dynamic Current Projects */}
        <h2 className="text-xl font-semibold mb-4">Current Projects</h2>

        <div className="space-y-4">

          {postjob.length === 0 ? (
            <p className="text-gray-500">No Jobs Posted Yet</p>
          ) : (
            postjob.map((job, idx) => (
              <div
                key={idx}
                className="bg-gray-200 p-4 rounded-lg flex justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Category: {job.category}
                  </p>

                  <p className="text-sm text-gray-600">
                    Payment: {job.payment}
                  </p>

                  <p className="text-sm text-gray-600">
                    Time: {job.time}
                  </p>

                  <p className="text-sm text-gray-600">
                    {job.description}
                  </p>
                </div>

                <span className="bg-green-500 w-25 text-white px-4 py-1 rounded-lg text-center ">
                  Active
                </span>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default CompanyDashboardContent;