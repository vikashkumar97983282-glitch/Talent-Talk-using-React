import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ClientFindJobContent() {
  const [job, setJob] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const jobs = async () => {
      try {
        const res = await axios.get("/client/alljobs", {
          withCredentials: true,
        });
        setJob(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load jobs.");
      }
    };

    jobs();
  }, []);

  const applyJob = async (jobId) => {
    let job_id = jobId;
    console.log(job_id)
    try {
      const res = await axios.post(
        "/client/applyjob",
        { job_id},
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to apply for the job.");
    }
  };

  const filteredJobs = job.filter((item) =>
    [item?.title, item?.category, item?.description]
      .filter(Boolean)
      .some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-slate-50 px-10 py-12 text-slate-900">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-semibold">Find Your Next Premium Project</h1>

        <p className="mt-3 text-slate-500">
          Connect with top-tier companies and work on high-impact projects
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="flex w-[70%] gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-sky-100">
          <input
            type="text"
            placeholder="Search jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-md p-2 text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {filteredJobs.length === 0 && (
          <p className="col-span-3 text-center text-slate-500">No jobs found.</p>
        )}

        {filteredJobs.map((jobItem) => (
          <div
            key={jobItem._id}
            className="rounded-xl bg-white p-6 text-black shadow-sm ring-1 ring-slate-200"
          >
            <div className="flex justify-between">
              <div className="h-10 w-10 bg-gray-300"></div>
              <span>&hearts;</span>
            </div>

            <h3 className="mt-4 font-semibold">{jobItem.title}</h3>

            <p className="font-semibold text-sky-700">${jobItem.payment}</p>

            <p className="mt-2 text-sm text-gray-500">{jobItem.category}</p>

            <button
              type="button"
              onClick={() => applyJob(jobItem._id)}
              className="mt-4 w-full rounded-lg bg-sky-700 py-2 text-white"
            >
              Quick Apply
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button className="rounded-xl bg-sky-100 px-6 py-3 text-sky-950">
          Explore More Projects
        </button>
      </div>
    </div>
  );
}

export default ClientFindJobContent;

