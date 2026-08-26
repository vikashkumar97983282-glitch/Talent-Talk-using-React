import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CompanyDashboardContent() {
  const [job, setJob] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalUsers = job.reduce((uniqueUsers, currentJob) => {
    const clients = Array.isArray(currentJob?.clientid)
      ? currentJob.clientid
      : currentJob?.clientid
      ? [currentJob.clientid]
      : [];

    clients.forEach((clientId) => {
      if (clientId) uniqueUsers.add(String(clientId));
    });

    return uniqueUsers;
  }, new Set()).size;

  const totalPayment = job.reduce((sum, currentJob) => {
    const payment = Number(currentJob?.payment);
    return Number.isFinite(payment) ? sum + payment : sum;
  }, 0);

  useEffect(() => {
    const loadPostedJobs = async () => {
      try {
        const res = await axios.get("/company/postjob", {
          withCredentials: true,
        });
        setJob(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPostedJobs();
  }, []);

  return (
    <div className="flex">
      <div className="company-content min-h-screen flex-1 overflow-auto p-5 text-slate-900 sm:p-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2d6b58]">Company overview</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Dashboard</h1>
        <p className="mt-2 text-[#35584a]">
          Welcome back, here's what's happening with your company today
        </p>
          </div>
          <div className="flex gap-3">
            <Link to="/company/postjob" className="rounded-xl bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5">+ Post job</Link>
            <Link to="/company/job-application" className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#1f5a49] shadow-sm ring-1 ring-[#dcebdd] transition hover:bg-[#f3faf6]">Applications</Link>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-5 sm:gap-8">
          <div className="w-full min-w-44 flex-1 rounded-2xl bg-linear-to-br from-[#14392e] via-[#1f5a49] to-[#3c7a63] p-6 text-center text-white shadow-lg shadow-[#14392e]/15 sm:w-52">
            <h3 className="text-lg">Active Jobs</h3>
            <p className="mt-3 text-3xl font-bold">{job.length || 0}</p>
            <span className="text-[#d9efe2]">Updated</span>
          </div>

          <div className="w-full min-w-44 flex-1 rounded-2xl bg-linear-to-br from-[#14392e] via-[#1f5a49] to-[#3c7a63] p-6 text-center text-white shadow-lg shadow-[#14392e]/15 sm:w-52">
            <h3 className="text-lg">Total User</h3>
            <p className="mt-3 text-3xl font-bold">{totalUsers}</p>
          </div>

          <div className="w-full min-w-44 flex-1 rounded-2xl bg-linear-to-br from-[#14392e] via-[#1f5a49] to-[#3c7a63] p-6 text-center text-white shadow-lg shadow-[#14392e]/15 sm:w-52">
            <h3 className="text-lg">Total Payment</h3>
            <p className="mt-3 text-3xl font-bold">
              ${totalPayment.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        <div className="mb-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.55fr)]">
          <div className="w-full rounded-2xl bg-linear-to-br from-[#102a22] via-[#184739] to-[#2d6b58] p-6 text-white shadow-lg shadow-[#14392e]/15">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm text-[#d9efe2]">Live hiring activity</p><h2 className="mt-2 text-3xl font-bold">{totalUsers} applicants</h2></div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#d9efe2]">This workspace</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-[#d9efe2]">Review applications, compare candidates, and keep your open roles moving.</p>
            <Link to="/company/job-application" className="mt-6 inline-flex rounded-lg bg-[#f3efe3] px-4 py-2 text-sm font-semibold text-[#16362b] transition hover:bg-white">Review applications</Link>
          </div>
          <div className="rounded-2xl border border-[#dcebdd] bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold text-[#35584a]">Next best action</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{job.length ? "Keep your listings fresh" : "Create your first job"}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{job.length ? "Update your active posts to attract stronger candidates." : "Publish a clear brief to start receiving applications."}</p>
            <Link to={job.length ? "/company/managejob" : "/company/postjob"} className="mt-5 inline-flex text-sm font-bold text-[#2d6b58] hover:underline">{job.length ? "Manage jobs →" : "Post a job →"}</Link>
          </div>
        </div>

        <h2 className="mb-4 text-xl font-semibold">Current Projects</h2>

        <div className="space-y-4">
          {isLoading ? (
            <div className="rounded-2xl bg-white/70 p-6 text-[#5a7368] shadow-sm ring-1 ring-[#dcebdd]">Loading your jobs...</div>
          ) : job.length === 0 ? (
            <p className="text-[#5a7368]">No Jobs Posted Yet</p>
          ) : (
            job.map((currentJob, idx) => (
              <div
                key={currentJob._id || idx}
                className="flex justify-between rounded-lg bg-[#fffdf8] p-4 shadow-sm ring-1 ring-[#e7dfcc]"
              >
                <div>
                  <h3 className="text-lg font-semibold">{currentJob.title}</h3>

                  <p className="text-sm text-slate-600">
                    Category: {currentJob.category}
                  </p>

                  <p className="text-sm text-slate-600">
                    Payment: {currentJob.payment}
                  </p>

                  <p className="text-sm text-slate-600">
                    Time: {currentJob.time}
                  </p>

                  <p className="text-sm text-slate-600">
                    {currentJob.description}
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
}

export default CompanyDashboardContent;

