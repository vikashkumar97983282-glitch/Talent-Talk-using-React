import React, { useState } from "react";

function ClientFindJobContent() {

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
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-teal-700 min-h-screen text-white py-12 px-10">

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold">
          Find Your Next Premium Project
        </h1>

        <p className="mt-3 text-gray-200">
          Connect with top-tier companies and work on high-impact projects
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 p-4 rounded-xl flex gap-4 w-[70%]">

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
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>

        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-8">

        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white text-black rounded-xl p-6">

            <div className="flex justify-between">
              <div className="w-10 h-10 bg-gray-300"></div>
              <span>♡</span>
            </div>

            <h3 className="mt-4 font-semibold">{job.title}</h3>

            <p className="text-blue-600 font-semibold">
              {job.salary}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {job.type}
            </p>

            {/* Tags */}
            <div className="flex gap-2 mt-3 text-xs">
              {job.tags.map((tag, i) => (
                <span key={i} className="bg-purple-200 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

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

            <button className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg">
              Quick Apply
            </button>

          </div>
        ))}

      </div>

      {/* Explore */}
      <div className="flex justify-center mt-12">
        <button className="bg-gray-200 text-black px-6 py-3 rounded-xl">
          Explore More Projects
        </button>
      </div>

    </div>
  );
}

export default ClientFindJobContent;