import React, { useEffect, useState } from "react";
import axios from 'axios'

function ClientDashboardContent() {

  const [job, setJob] = useState([]);

  useEffect(()=>{
    const jobs = async ()=>{
      const res = await axios.get("http://localhost:3000/job",{withCredentials:true});
      setJob(res.data);
    }
    jobs();
  },[]);

  return (
    <div className="flex-1 bg-slate-50 p-8 text-slate-900">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold">Personal Insights</h1>
          <p className="text-slate-500">
            Welcome back, Alex. Here's what's happening today.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="rounded-lg bg-sky-100 px-4 py-2 text-sky-950">Daily</button>
          <button className="rounded-lg bg-sky-100 px-4 py-2 text-sky-950">Weekly</button>
          <button className="rounded-lg bg-sky-100 px-4 py-2 text-sky-950">Monthly</button>
        </div>

      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users"
        className="mb-8 w-80 rounded-lg border border-sky-100 bg-white p-2"
      />

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="rounded-xl bg-gradient-to-br from-indigo-700 to-sky-700 p-6 text-white">
          <p>Total Earning</p>
          <h2 className="text-2xl font-bold">$24,343</h2>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-indigo-700 to-sky-700 p-6 text-white">
          <p>Active Applications</p>
          <h2 className="text-2xl font-bold">{job.length}</h2>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-indigo-700 to-sky-700 p-6 text-white">
          <p>Average Rating</p>
          <h2 className="text-2xl font-bold">4.9 / 5.0</h2>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">

        {/* Chart */}
        <div className="col-span-2 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-900 p-6 text-white">

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
            <span className="cursor-pointer text-sky-700">
              View All
            </span>
          </div>

          <div className="space-y-4">

            {job.map((job,idx)=>{
              return (
                <div key={idx} className="rounded-xl bg-linear-to-r from-sky-700 to-indigo-700 p-4 text-white">
                  <h4 className="font-semibold">{job.title}</h4>
                  <p className="text-sm">{job.payment}</p>
                  <p className="text-xs">{job.time}</p>
                </div>
              )
            })}

            

          </div>

        </div>

      </div>

    </div>
  );
}

export default ClientDashboardContent;
