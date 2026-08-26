import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Pencil, Calendar, Users, BriefcaseBusiness, Plus } from "lucide-react";
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

  const totalApplications = jobs.reduce((total, job) => total + (Array.isArray(job.clientid) ? job.clientid.length : 0), 0);

  return (
    <div className="company-content min-h-screen px-4 py-7 text-slate-900 sm:px-8 sm:py-10">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6b58]">Your opportunities</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Manage Job Postings</h1>
          <p className="mt-2 text-sm text-slate-600">
            Oversee your active listings and update your job details.
          </p>
        </div>

        <button
          onClick={goToPostJob}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5"
        >
          <Plus size={17} /> Post New Job
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-xl items-center rounded-xl bg-white px-4 py-2 ring-1 ring-[#dcebdd] shadow-sm">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search for job title, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent p-2 text-sm outline-none"
          />
        </div>
        <div className="flex gap-2 text-sm text-slate-500"><span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-[#dcebdd]"><BriefcaseBusiness className="mr-1 inline text-[#2d6b58]" size={15}/>{jobs.length} jobs</span><span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-[#dcebdd]"><Users className="mr-1 inline text-sky-600" size={15}/>{totalApplications} applicants</span></div>
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
            className="mb-5 rounded-2xl border border-[#dcebdd] bg-white/90 p-5 shadow-[0_14px_32px_rgba(31,58,47,0.08)] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">{job.title || "Untitled job"}</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} /> {formatDate(job.time)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} /> {Array.isArray(job.clientid) ? job.clientid.length : 0} Application
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold capitalize text-emerald-700 ring-1 ring-emerald-100">
                  {job.status || "initial"}
                </span>
                <button
                  type="button"
                  onClick={() => openEditor(job)}
                  className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-[#16362b] transition hover:bg-emerald-50"
                >
                  <Pencil size={16} /> Edit
                </button>
              </div>
            </div>

            {editJobId === job._id && (
              <div className="mt-5 grid gap-3 rounded-2xl bg-[#edf7f3] p-4 ring-1 ring-[#dcebdd] sm:grid-cols-2">
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
                  className="rounded bg-white p-2 outline-none ring-1 ring-[#e7dfcc] sm:col-span-2"
                />
                <div className="flex gap-3 sm:col-span-2">
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
