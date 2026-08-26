import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Pencil, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CompanyManageJobsContent() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editJobId, setEditJobId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    payment: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await axios.get("/company/postjob", { withCredentials: true });
        setJobs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      return jobs;
    }

    return jobs.filter((job) =>
      [job?.title, job?.category, job?.description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(keyword))
    );
  }, [jobs, search]);

  const openEditor = (job) => {
    setEditJobId(job._id);
    setForm({
      title: job.title || "",
      category: job.category || "",
      payment: job.payment ?? "",
      time: job.time ? new Date(job.time).toISOString().slice(0, 16) : "",
      description: job.description || "",
    });
  };

  const closeEditor = () => {
    setEditJobId("");
    setForm({
      title: "",
      category: "",
      payment: "",
      time: "",
      description: "",
    });
  };

  const handleSave = async () => {
    if (!editJobId) {
      return;
    }

    try {
      setIsSaving(true);
      const res = await axios.put(
        `/company/postjob/${editJobId}`,
        {
          title: form.title,
          category: form.category,
          payment: form.payment,
          time: form.time,
          description: form.description,
        },
        { withCredentials: true }
      );

      if (!res.data?.success) {
        toast.error(res.data?.message || "Failed to update job.");
        return;
      }

      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === editJobId ? res.data.job : job))
      );
      toast.success(res.data?.message || "Job updated successfully.");
      closeEditor();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update job.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "No deadline";
    }

    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) {
      return "No deadline";
    }

    return parsed.toLocaleDateString();
  };

  const goToPostJob = () => {
    navigate("/company/postjob");
  };

  return (
    <div className="min-h-screen bg-[#f7f4ea] px-4 py-6 text-slate-900 sm:px-10 sm:py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Job Postings</h1>
          <p className="text-sm text-slate-600">
            Oversee your active listings and update your job details.
          </p>
        </div>

        <button
          onClick={goToPostJob}
          className="rounded-full bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-5 py-2 text-white"
        >
          + Post New Jobs
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex w-full max-w-[350px] items-center rounded bg-[#fffdf8] px-3 ring-1 ring-[#e7dfcc]">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search for job title, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent p-2 outline-none"
          />
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">
          Loading jobs...
        </div>
      )}

      {!isLoading && filteredJobs.length === 0 && (
        <div className="rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">
          No jobs found.
        </div>
      )}

      {!isLoading &&
        filteredJobs.map((job) => (
          <div
            key={job._id}
            className="mb-5 rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{job.title || "Untitled job"}</h2>
                <div className="mt-2 flex gap-5 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} /> {formatDate(job.time)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} /> {Array.isArray(job.clientid) ? job.clientid.length : 0} Application
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-green-200 px-4 py-1 text-sm text-green-700">
                  {job.status || "initial"}
                </span>
                <button
                  type="button"
                  onClick={() => openEditor(job)}
                  className="flex items-center gap-1 rounded bg-[#efe8d8] px-3 py-1 text-sm text-[#16362b]"
                >
                  <Pencil size={16} /> Edit
                </button>
              </div>
            </div>

            {editJobId === job._id && (
              <div className="mt-5 grid gap-3 rounded-xl bg-[#f7f4ea] p-4 ring-1 ring-[#e7dfcc]">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Job title"
                  className="rounded bg-white p-2 outline-none ring-1 ring-[#e7dfcc]"
                />
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="Category"
                  className="rounded bg-white p-2 outline-none ring-1 ring-[#e7dfcc]"
                />
                <input
                  type="number"
                  value={form.payment}
                  onChange={(e) => setForm((prev) => ({ ...prev, payment: e.target.value }))}
                  placeholder="Payment"
                  className="rounded bg-white p-2 outline-none ring-1 ring-[#e7dfcc]"
                />
                <input
                  type="datetime-local"
                  value={form.time}
                  onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                  className="rounded bg-white p-2 outline-none ring-1 ring-[#e7dfcc]"
                />
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Description"
                  className="rounded bg-white p-2 outline-none ring-1 ring-[#e7dfcc]"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="rounded bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-4 py-2 text-white disabled:opacity-60"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={closeEditor}
                    className="rounded bg-[#efe8d8] px-4 py-2 text-[#16362b]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default CompanyManageJobsContent;
