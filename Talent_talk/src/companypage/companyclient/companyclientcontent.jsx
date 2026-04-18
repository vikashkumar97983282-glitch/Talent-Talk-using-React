import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  return (
    <div className="min-h-screen bg-[#f7f4ea] px-6 py-12 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <h1 className="mb-6 w-full text-2xl font-bold">Applied Clients</h1>

        <input
          type="text"
          placeholder="Search clients or jobs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full max-w-[720px] rounded-lg bg-[#fffdf8] p-3 ring-1 ring-[#e7dfcc]"
        />

        <div className="w-full max-w-[920px] rounded-2xl border border-[#e7dfcc] bg-[#fffdf8] p-6 shadow-sm">
          <div className="mb-4 grid grid-cols-4 rounded-xl bg-[#efe8d8] px-4 py-3 font-semibold text-[#16362b]">
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
                  className="grid grid-cols-4 items-center rounded-xl border-t border-emerald-100 py-3"
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

