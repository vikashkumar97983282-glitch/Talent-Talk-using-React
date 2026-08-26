import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

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
    <div className="min-h-screen bg-[#f7f4ea] px-4 py-6 text-slate-900 sm:px-10 sm:py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
          <p className="text-sm text-[#5a7368]">Review applicants and shortlist candidates for your team.</p>
        </div>

        <div className="flex w-full max-w-[350px] items-center rounded bg-[#fffdf8] px-3 ring-1 ring-[#e7dfcc]">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, role, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent p-2 outline-none"
          />
        </div>
      </div>

      <div className="mb-6 flex gap-4 overflow-x-auto border-b border-[#e7dfcc] pb-2 text-sm sm:gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={activeTab === "all" ? "font-semibold text-[#1f5a49]" : "text-slate-700"}
        >
          All Applications ({applications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("shortlisted")}
          className={activeTab === "shortlisted" ? "font-semibold text-[#1f5a49]" : "text-slate-700"}
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredApplications.map((application) => {
            const key = `${application.jobId}_${application.clientId}`;
            const isUpdating = updatingKey === key;

            return (
              <div key={key} className="rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{application.clientName}</h3>
                    <p className="text-sm text-[#3c7a63]">{application.profession}</p>
                  </div>

                  <span className="rounded-full bg-[#edf5ef] px-3 py-1 text-xs text-[#2d6b58]">
                    {application.isShortlisted ? "Shortlisted" : "Applicant"}
                  </span>
                </div>

                <p className="text-sm text-slate-600">{application.clientEmail}</p>
                <p className="mt-2 text-sm text-slate-700">Applied for: {application.jobTitle}</p>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleShortlist(application)}
                    disabled={isUpdating}
                    className="rounded bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-4 py-1 text-white disabled:opacity-60"
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
      )}
    </div>
  );
};

export default CompanyJobApplicationsContent;
