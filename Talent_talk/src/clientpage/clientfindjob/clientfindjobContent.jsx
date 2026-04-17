import React, { useEffect, useState } from "react";
import axios from 'axios'

function ClientFindJobContent() {

  const [job , setJob] = useState([]);

  useEffect(()=>{
    const jobs = async ()=>{
      const res = await axios.get("http://localhost:3000/client/alljobs",{withCredentials:true});
      setJob(res.data)
    }
    jobs();
  },[])
  console.log(job)

  // STATE (jobs)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior UI/UX Designer",
      salary: "$80k – $120k",
      type: "Remote",
      tags: ["Figma", "UI/UX", "Mobile"],
    },
    {
      id: 2,
      title: "Frontend Developer",
      salary: "$60k – $100k",
      type: "Hybrid",
      tags: ["React", "JS", "CSS"],
    },
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  // CREATE
  const addJob = () => {
    if (!title) return;

    const newJob = {
      id: Date.now(),
      title,
      salary: "$50k – $90k",
      type: "Remote",
      tags: ["New"],
    };

    setJobs([...jobs, newJob]);
    setTitle("");
  };

  // DELETE
  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // UPDATE
  const updateJob = (id) => {
    const newTitle = prompt("Enter new job title");
    if (!newTitle) return;

    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, title: newTitle } : job
      )
    );
  };

  // SEARCH FILTER
  const filteredJobs = job.filter((item) =>
    String(item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 px-10 py-12 text-slate-900">

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold">
          Find Your Next Premium Project
        </h1>

        <p className="mt-3 text-slate-500">
          Connect with top-tier companies and work on high-impact projects
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex justify-center mb-6">
        <div className="flex w-[70%] gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-sky-100">

          <input
            type="text"
            placeholder="Search jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 rounded-md text-black"
          />

          <input
            type="text"
            placeholder="Add job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded-md text-black"
          />

          <button
            onClick={addJob}
            className="rounded bg-sky-700 px-4 text-white"
          >
            Add
          </button>

        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-8">

        {filteredJobs.map((job) => (
          <div key={job._id} className="rounded-xl bg-white p-6 text-black shadow-sm ring-1 ring-slate-200">

            <div className="flex justify-between">
              <div className="w-10 h-10 bg-gray-300"></div>
              <span>♡</span>
            </div>

            <h3 className="mt-4 font-semibold">{job.title}</h3>

            <p className="text-sky-700 font-semibold">
              ${job.payment}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {job.category}
            </p>

            {/* Tags
            // <div className="flex gap-2 mt-3 text-xs">
            //   {job.tags.map((tag, i) => (
            //     <span key={i} className="rounded bg-purple-200 px-2 py-1">
            //       {tag}
            //     </span>
            //   ))}
            // </div> */}

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => updateJob(job.id)}
                className="bg-yellow-400 px-3 py-1 rounded text-black"
              >
                Edit
              </button>

              <button
                onClick={() => deleteJob(job.id)}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>

            <button className="mt-4 w-full rounded-lg bg-sky-700 py-2 text-white">
              Quick Apply
            </button>

          </div>
        ))}

      </div>

      {/* Explore */}
      <div className="flex justify-center mt-12">
        <button className="rounded-xl bg-sky-100 px-6 py-3 text-sky-950">
          Explore More Projects
        </button>
      </div>

    </div>
  );
}

export default ClientFindJobContent;
