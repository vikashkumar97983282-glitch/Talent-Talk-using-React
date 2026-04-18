import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ClientProjectContent() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingJobId, setUpdatingJobId] = useState("");
  const statusOptions = [
    { label: "Initial", value: "initial" },
    { label: "Progress", value: "progress" },
    { label: "Complete", value: "complete" },
  ];

  useEffect(() => {
    const loadAppliedJobs = async () => {
      try {
        const res = await axios.get("/client/applyjob", {
          withCredentials: true,
        });
        setProjects(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load applied jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppliedJobs();
  }, []);

  const getStatusText = (status) => {
    if (status === "complete") {
      return "Complete";
    }

    if (status === "progress") {
      return "Progress";
    }

    return "Initial";
  };

  const getStatusStyle = (status) => {
    const normalizedStatus = String(status).toLowerCase();

    if (normalizedStatus === "complete") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (normalizedStatus === "progress") {
      return "bg-sky-100 text-sky-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  const handleStatusChange = async (projectId, nextStatus) => {
    try {
      setUpdatingJobId(projectId);
      const res = await axios.post(
        "/client/changejobstatus",
        {
          job_id: projectId,
          status: nextStatus,
        },
        { withCredentials: true }
      );

      if (!res.data?.success) {
        toast.error(res.data?.message || "Failed to update status.");
        return;
      }

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId
            ? { ...project, status: nextStatus }
            : project
        )
      );

      toast.success(res.data?.message || "Status updated successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update status.");
    } finally {
      setUpdatingJobId("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-6 text-slate-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Applied Jobs</h1>
        <p className="mt-2 text-slate-500">
          Track the jobs you have applied for and check their current status.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-sky-100">
          Loading applied jobs...
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-sky-100">
          <h2 className="text-xl font-semibold">No applied jobs yet</h2>
          <p className="mt-2 text-slate-500">
            Apply for a job from the Find Job page and it will appear here.
          </p>
        </div>
      )}

      <div className="grid gap-6">
        {projects.map((project) => {
          const status = project?.status || "initial";

          return (
            <div
              key={project._id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sky-100"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {project.description || "No description available for this job yet."}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
                      status
                    )}`}
                  >
                    {getStatusText(status)}
                  </span>

                  <select
                    value={status}
                    onChange={(e) => handleStatusChange(project._id, e.target.value)}
                    disabled={updatingJobId === project._id}
                    className="rounded-lg border border-sky-100 bg-white px-3 py-2 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Budget
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    ${project.payment || "Not set"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Category
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {project.category || "General"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Time
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {project.time || "Recently applied"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClientProjectContent;

