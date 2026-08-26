import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Users, BriefcaseBusiness, CheckCircle2 } from "lucide-react";

function CompanyClientContent() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppliedClients = async () => {
      try {
        const res = await axios.get("/company/appliedclients", {
          withCredentials: true,
        });
        setJobs(Array.isArray(res.data?.jobs) ? res.data.jobs : []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load applied clients.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppliedClients();
  }, []);

  const getStatusClass = (status) => {
    const normalizedStatus = String(status || "initial").toLowerCase();

    if (normalizedStatus === "complete") {
      return "text-emerald-600";
    }

    if (normalizedStatus === "progress") {
      return "text-sky-600";
    }

    return "text-amber-500";
  };

  const rows = jobs
    .filter((job) => job?.clientid)
    .filter((job) => {
      const client = job.clientid || {};
      const query = search.toLowerCase();
      const name = `${client.firstname || ""} ${client.lastname || ""}`.toLowerCase();
      const title = String(job.title || "").toLowerCase();
      const email = String(client.email || "").toLowerCase();

      return name.includes(query) || title.includes(query) || email.includes(query);
    });

  const completedCount = rows.filter((job) => String(job.status).toLowerCase() === "complete").length;
  const activeCount = rows.filter((job) => String(job.status).toLowerCase() !== "complete").length;

  return (
    <div className="company-content min-h-screen px-4 py-7 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <div className="mb-6 flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6b58]">Talent pipeline</p>
            <h1 className="mt-2 text-3xl font-bold">Applied Clients</h1>
            <p className="mt-2 text-sm text-slate-500">Track candidates connected to your company’s job posts.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-[#dcebdd]"><Users className="mx-auto mb-1 text-[#2d6b58]" size={16}/><strong className="block text-base">{rows.length}</strong><span className="text-slate-500">Total</span></div>
            <div className="rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-[#dcebdd]"><BriefcaseBusiness className="mx-auto mb-1 text-sky-600" size={16}/><strong className="block text-base">{activeCount}</strong><span className="text-slate-500">Active</span></div>
            <div className="rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-[#dcebdd]"><CheckCircle2 className="mx-auto mb-1 text-emerald-600" size={16}/><strong className="block text-base">{completedCount}</strong><span className="text-slate-500">Complete</span></div>
          </div>
        </div>

        <label className="mb-6 flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-[#dcebdd] focus-within:ring-2 focus-within:ring-emerald-300">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search clients, jobs, or email" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
        </label>

        <div className="w-full overflow-hidden rounded-2xl border border-[#dcebdd] bg-white/90 p-4 shadow-[0_14px_32px_rgba(31,58,47,0.08)] sm:p-6">
          <div className="mb-4 hidden grid-cols-4 rounded-xl bg-[#edf7f3] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#35584a] sm:grid">
            <span>Name</span>
            <span>Job</span>
            <span>Email</span>
            <span>Status</span>
          </div>

          {isLoading && (
            <div className="py-6 text-center text-slate-500">Loading applied clients...</div>
          )}

          {!isLoading && rows.length === 0 && (
            <div className="py-6 text-center text-slate-500">No applied clients found.</div>
          )}

          {!isLoading &&
            rows.map((job) => {
              const client = job.clientid || {};
              const clientName = `${client.firstname || ""} ${client.lastname || ""}`.trim();
              const status = job.status || "initial";

              return (
                <div
                  key={job._id}
                  className="grid grid-cols-1 gap-2 rounded-xl border-t border-emerald-100 py-4 text-sm sm:grid-cols-4 sm:items-center sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/80"
                      alt="client"
                      className="h-8 w-8 rounded-full"
                    />
                    <span>{clientName || "Client User"}</span>
                  </div>

                  <span>{job.title || "Untitled Job"}</span>
                  <span>{client.email || "No email"}</span>
                  <span className={`font-semibold capitalize ${getStatusClass(status)}`}>
                    {status}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CompanyClientContent;

