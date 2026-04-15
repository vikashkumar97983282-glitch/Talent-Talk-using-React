import React, {  useEffect, useState } from "react";
import axios from 'axios'


function CompanyDashboardContent() {

  const [job,setJob] = useState([]);

  useEffect(()=>{
    const postjob = async ()=>{
      try{
          const res = await axios.get("http://localhost:3000/company/postjob",{withCredentials:true});
          setJob(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    postjob();
  },[])
  console.log(job)

  return (
    <div className="flex">

      {/* Main Dashboard */}
      <div className="flex-1 min-h-screen overflow-auto bg-[#f7f4ea] p-10 text-slate-900">

        <h1 className="text-3xl font-bold mb-2">DASHBOARD</h1>
        <p className="mb-8 text-[#35584a]">
          Welcome back, here's what's happening with your company today
        </p>

        {/* Top Cards */}
        <div className="mb-10 flex gap-8">

          <div className="w-52 rounded-2xl bg-linear-to-br from-[#14392e] via-[#1f5a49] to-[#3c7a63] p-6 text-center text-white shadow-lg shadow-[#14392e]/15">
            <h3 className="text-lg">Active Jobs</h3>
            {/* ✅ dynamic count */}
            <p className="text-3xl font-bold mt-3">{job?.length || 0}</p>
            <span className="text-[#d9efe2]">Updated</span>
          </div>

          <div className="w-52 rounded-2xl bg-linear-to-br from-[#14392e] via-[#1f5a49] to-[#3c7a63] p-6 text-center text-white shadow-lg shadow-[#14392e]/15">
            <h3 className="text-lg">Recent Notification</h3>
            <p className="text-3xl font-bold mt-3">24</p>
          </div>

          <div className="w-52 rounded-2xl bg-linear-to-br from-[#14392e] via-[#1f5a49] to-[#3c7a63] p-6 text-center text-white shadow-lg shadow-[#14392e]/15">
            <h3 className="text-lg">Rating</h3>
            <p className="text-3xl font-bold mt-3">4/5</p>
          </div>

        </div>

        {/* Recent Applications */}
        <div className="mb-10 w-96 rounded-2xl bg-linear-to-br from-[#102a22] via-[#184739] to-[#2d6b58] p-6 text-white shadow-lg shadow-[#14392e]/15">

          <h2 className="text-xl mb-6">Recent Application</h2>

          <div className="space-y-5">
            <div className="flex justify-between">
              <span>Olivia Hayes</span>
              <span className="text-[#d9efe2]">90%</span>
            </div>
            <div className="flex justify-between">
              <span>Liam Harper</span>
              <span className="text-[#d9efe2]">94%</span>
            </div>
            <div className="flex justify-between">
              <span>Ethan Bennett</span>
              <span className="text-[#d9efe2]">89%</span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-[#f3efe3] py-2 text-[#16362b]">
            View All
          </button>
        </div>

        {/* ✅ Dynamic Current Projects */}
        <h2 className="text-xl font-semibold mb-4">Current Projects</h2>

        <div className="space-y-4">

          {job?.length === 0 ? (
            <p className="text-[#5a7368]">No Jobs Posted Yet</p>
          ) : (
            job.map((job, idx) => (
              <div
                key={idx}
                className="flex justify-between rounded-lg bg-[#fffdf8] p-4 shadow-sm ring-1 ring-[#e7dfcc]"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {job.title}
                  </h3>

                  <p className="text-sm text-slate-600">
                    Category: {job.category}
                  </p>

                  <p className="text-sm text-slate-600">
                    Payment: {job.payment}
                  </p>

                  <p className="text-sm text-slate-600">
                    Time: {job.time}
                  </p>

                  <p className="text-sm text-slate-600">
                    {job.description}
                  </p>
                </div>

                <span className="w-25 rounded-lg bg-linear-to-r from-[#2d6b58] to-[#4f8c73] px-4 py-1 text-center text-white">
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
