import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Building2,
  CalendarClock,
  Eye,
  Filter,
  Search,
  Sparkles,
  BriefcaseBusiness,
  X,
} from "lucide-react";
import JobContainer from "./jobsContainer";

function JobBody() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get("/admin/jobs", { withCredentials: true });
        setJobs(res.data?.jobs || []);
      } catch (err) {
        console.log(err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const stats = useMemo(() => {
    const approved = jobs.filter((job) => String(job?.status || "").toLowerCase() === "approved").length;
    const pending = jobs.filter((job) => String(job?.status || "").toLowerCase() !== "approved").length;

    return [
      { label: "Total jobs", value: jobs.length, icon: BriefcaseBusiness, tone: "from-indigo-600 via-violet-600 to-cyan-500" },
      { label: "Approved", value: approved, icon: Eye, tone: "from-emerald-600 via-teal-600 to-cyan-500" },
      { label: "Pending review", value: pending, icon: Filter, tone: "from-amber-500 via-orange-500 to-rose-500" },
    ];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return (jobs || []).filter((job) => {
      const title = String(job?.title || "").toLowerCase();
      const company = String(job?.companyName || "").toLowerCase();
      const description = String(job?.description || "").toLowerCase();
      const status = String(job?.status || "").toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        company.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        status.includes(normalizedSearch);

      const matchesStatus =
        activeStatus === "all" ||
        (activeStatus === "approved" && status === "approved") ||
        (activeStatus === "pending" && status !== "approved");

      return matchesSearch && matchesStatus;
    });
  }, [jobs, normalizedSearch, activeStatus]);

  const filterOptions = [
    { key: "all", label: "All jobs" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
  ];

  return (
    <div className="flex min-h-full w-full justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-5 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
              <Sparkles size={13} />
              Review desk
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Job post approval</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Search jobs, filter by status, and inspect each post in a cleaner review layout.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[32rem]">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.tone} text-white shadow-md`}>
                    <Icon size={18} />
                  </div>
                  <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-white/80 bg-white/80 p-4 shadow-[0_16px_38px_rgba(79,70,229,0.1)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, company, description, or status"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {filterOptions.map((item) => {
                const active = activeStatus === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveStatus(item.key)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                        : "bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">{filteredJobs.length} job posts shown</p>
            <p className="text-sm text-slate-500">
              {search || activeStatus !== "all"
                ? "Filters are active."
                : "Showing all available job posts."}
            </p>
          </div>

          {(search || activeStatus !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveStatus("all");
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700"
            >
              Clear filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/80 bg-white/80 p-8 text-sm text-slate-500 shadow-[0_16px_38px_rgba(79,70,229,0.1)]">
            Loading jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-10 text-center shadow-[0_16px_38px_rgba(79,70,229,0.08)]">
            <p className="text-lg font-semibold text-slate-900">No jobs found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search term or switch back to the All jobs filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredJobs.map((elem, idx) => (
              <JobContainer
                key={elem.id || idx}
                status={elem.status}
                title={elem.title}
                company={elem.companyName}
                time={elem.time}
                desc={elem.description}
                img={elem.image}
                onOpen={() => setSelectedJob(elem)}
              />
            ))}
          </div>
        )}

        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.35)] sm:p-8">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                aria-label="Close job details"
              >
                <X size={18} />
              </button>

              <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="overflow-hidden rounded-3xl bg-slate-100">
                  <img
                    src={selectedJob.image || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60"}
                    alt={selectedJob.title || "Job cover"}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        String(selectedJob.status || "").toLowerCase() === "approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {selectedJob.status || "Pending"}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      {selectedJob.companyName || "Unknown company"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                    {selectedJob.title || "Untitled job"}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5">
                      <Building2 size={15} className="text-violet-600" />
                      {selectedJob.companyName || "Unknown company"}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5">
                      <CalendarClock size={15} className="text-violet-600" />
                      {selectedJob.time || "Recently posted"}
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {selectedJob.description || "No description available for this job yet."}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch(selectedJob.title || "");
                        setActiveStatus("all");
                      }}
                      className="rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition hover:-translate-y-0.5"
                    >
                      Search similar jobs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobBody;
