import React, { useState } from "react";

function ClientProjectContent() {

  // STATE (project)
  const [project, setProject] = useState({
    title: "Lead UX Designer for AI-Powered Analytics Dashboard",
    description:
      "We are seeking a high-caliber Lead UX Designer to spearhead the evolution of our flagship AI-driven analytics platform.",
    budget: "$12,000 - $18,000",
    duration: "3–6 Months",
    commitment: "30+ Hours",
  });

  // UPDATE (Edit Project)
  const editProject = () => {
    const newTitle = prompt("Enter new title", project.title);
    const newBudget = prompt("Enter new budget", project.budget);

    if (!newTitle || !newBudget) return;

    setProject({
      ...project,
      title: newTitle,
      budget: newBudget,
    });
  };

  // DELETE
  const deleteProject = () => {
    const confirmDelete = window.confirm("Delete this project?");
    if (!confirmDelete) return;

    setProject(null);
  };

  // CREATE (Reset / New Project)
  const createProject = () => {
    setProject({
      title: "New Project",
      description: "Add description...",
      budget: "$0",
      duration: "1 Month",
      commitment: "10 Hours",
    });
  };

  // If deleted
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-teal-700 text-white">
        <p className="mb-4">No Project Available</p>
        <button
          onClick={createProject}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Create Project
        </button>
      </div>
    );
  }

  return (
    <div className="bg-teal-700 min-h-screen px-8 py-6 text-white">

      {/* Title */}
      <h1 className="text-2xl font-bold">{project.title}</h1>

      <p className="text-gray-200 mt-1">
        Posted 2 hours ago · Remote, Global ·
        <span className="text-blue-300"> FEATURED</span>
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={editProject}
          className="bg-yellow-400 text-black px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={deleteProject}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-3 gap-6 mt-6">

        {/* Left */}
        <div className="col-span-2 space-y-6">

          <div className="bg-gray-200 text-black p-6 rounded-xl">
            <h2 className="font-semibold text-lg mb-3">
              Project Description
            </h2>

            <p className="text-sm">{project.description}</p>
          </div>

        </div>

        {/* Right */}
        <div className="bg-gray-200 text-black rounded-xl overflow-hidden">

          <div className="bg-teal-600 text-white p-5">
            <h2 className="font-semibold mb-2">Estimated Budget</h2>
            <p className="text-xl font-bold">{project.budget}</p>
            <p className="text-sm mt-1">
              Fixed-price · Intermediate–Expert Level
            </p>
          </div>

          <div className="p-5 space-y-3">

            <p className="text-sm">
              <strong>Project Duration:</strong> {project.duration}
            </p>

            <p className="text-sm">
              <strong>Weekly Commitment:</strong> {project.commitment}
            </p>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Apply Now
            </button>

            <button className="w-full bg-green-400 py-2 rounded-lg">
              Save Job
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ClientProjectContent;