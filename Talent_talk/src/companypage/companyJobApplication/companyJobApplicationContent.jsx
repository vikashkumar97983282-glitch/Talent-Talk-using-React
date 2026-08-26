import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Users, UserCheck, BriefcaseBusiness, Mail } from "lucide-react";

const normalizeToArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  return [value];
};

const CompanyJobApplicationsContent = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingKey, setUpdatingKey] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await axios.get("/company/appliedclients", { withCredentials: true });
        setJobs(Array.isArray(res.data?.jobs) ? res.data.jobs : []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load job applications.");
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

  const applications = useMemo(() => {
    return jobs.flatMap((job) => {
      const clients = normalizeToArray(job?.clientid);
      const shortlistedIds = normalizeToArray(job?.shortlistedClients).map((entry) =>
        typeof entry === "string" ? entry : entry?._id
      );

      return clients
        .filter(Boolean)
        .map((client) => {
          const clientId = client?._id || "";

          return {
            jobId: job?._id,
            clientId,
            jobTitle: job?.title || "Untitled job",
            clientName: `${client?.firstname || ""} ${client?.lastname || ""}`.trim() || "Client User",
            clientEmail: client?.email || "No email",
            profession: client?.profession || "General",
            isShortlisted: shortlistedIds.includes(clientId),
          };
        });
    });
  }, [jobs]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((app) => {
      if (activeTab === "shortlisted" && !app.isShortlisted) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [app.clientName, app.jobTitle, app.clientEmail, app.profession]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [applications, search, activeTab]);

  const shortlistedCount = applications.filter((item) => item.isShortlisted).length;

  const handleShortlist = async (application) => {
    const key = `${application.jobId}_${application.clientId}`;

    try {
      setUpdatingKey(key);
      const nextShortlistedState = !application.isShortlisted;

      const res = await axios.post(
        "/company/shortlist",
        {
          jobId: application.jobId,
          clientId: application.clientId,
          shortlisted: nextShortlistedState,
        },
        { withCredentials: true }
      );

      if (!res.data?.success) {
        toast.error(res.data?.message || "Failed to update shortlist.");
        return;
      }

      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job._id !== application.jobId) {
            return job;
          }

          return {
            ...job,
            shortlistedClients: normalizeToArray(res.data?.job?.shortlistedClients),
          };
        })
      );

      toast.success(res.data?.message || "Shortlist updated successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update shortlist.");
    } finally {
      setUpdatingKey("");
    }
  };

  return (
    <div className="company-content min-h-screen px-4 py-7 text-slate-900 sm:px-8 sm:py-10">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6b58]">Talent pipeline</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Job Applications</h1>
          <p className="mt-2 text-sm text-[#5a7368]">Review applicants and shortlist candidates for your team.</p>
        </div>

        <div className="flex w-full max-w-sm items-center rounded-xl bg-white px-4 py-2 ring-1 ring-[#dcebdd] shadow-sm">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, role, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent p-2 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="mr-2 text-sm font-semibold text-slate-500">{applications.length} total</span>
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={activeTab === "all" ? "rounded-full bg-[#1f5a49] px-4 py-2 text-sm font-semibold text-white" : "rounded-full bg-white px-4 py-2 text-sm text-slate-700 ring-1 ring-[#dcebdd]"}
        >
          All Applications ({applications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("shortlisted")}
          className={activeTab === "shortlisted" ? "rounded-full bg-[#1f5a49] px-4 py-2 text-sm font-semibold text-white" : "rounded-full bg-white px-4 py-2 text-sm text-slate-700 ring-1 ring-[#dcebdd]"}
        >
          Shortlisted ({shortlistedCount})
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">Loading applications...</div>
      )}

      {!isLoading && filteredApplications.length === 0 && (
        <div className="rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">No applications found.</div>
      )}

      {!isLoading && filteredApplications.length > 0 && (
        <div>
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-[#dcebdd]"><Users className="mb-2 text-[#2d6b58]" size={18}/><p className="text-xs uppercase tracking-wider text-slate-500">All applicants</p><strong className="text-2xl">{applications.length}</strong></div>
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-[#dcebdd]"><UserCheck className="mb-2 text-emerald-600" size={18}/><p className="text-xs uppercase tracking-wider text-slate-500">Shortlisted</p><strong className="text-2xl">{shortlistedCount}</strong></div>
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-[#dcebdd]"><BriefcaseBusiness className="mb-2 text-sky-600" size={18}/><p className="text-xs uppercase tracking-wider text-slate-500">Open roles</p><strong className="text-2xl">{new Set(applications.map((item) => item.jobId)).size}</strong></div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredApplications.map((application) => {
            const key = `${application.jobId}_${application.clientId}`;
            const isUpdating = updatingKey === key;

            return (
              <div key={key} className="rounded-2xl border border-[#dcebdd] bg-white/90 p-5 shadow-[0_14px_32px_rgba(31,58,47,0.08)] transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{application.clientName}</h3>
                    <p className="text-sm font-medium text-[#3c7a63]">{application.profession}</p>
                  </div>

                  <span className="rounded-full bg-[#edf5ef] px-3 py-1 text-xs text-[#2d6b58]">
                    {application.isShortlisted ? "Shortlisted" : "Applicant"}
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><Mail size={15} className="text-slate-400" />{application.clientEmail}</p>
                <p className="mt-2 text-sm text-slate-700">Applied for: {application.jobTitle}</p>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleShortlist(application)}
                    disabled={isUpdating}
                    className="rounded-xl bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-900/10 disabled:opacity-60"
                  >
                    {isUpdating
                      ? "Saving..."
                      : application.isShortlisted
                        ? "Remove Shortlist"
                        : "Shortlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
};

export default CompanyJobApplicationsContent;
