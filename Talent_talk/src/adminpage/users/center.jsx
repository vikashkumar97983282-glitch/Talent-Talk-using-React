import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  BadgeCheck,
  CalendarClock,
  Filter,
  Globe2,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  Users2,
  X,
} from "lucide-react";
import HistoryContent from "./historyContent";
import History from "./history";

function Center() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/admin/users", { withCredentials: true });
        setUsers(res.data?.users || []);
      } catch (err) {
        console.log(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const roles = useMemo(() => {
    return Array.from(
      new Set((users || []).map((user) => String(user?.role || "").trim()).filter(Boolean))
    );
  }, [users]);

  const statuses = useMemo(() => {
    return Array.from(
      new Set((users || []).map((user) => String(user?.status || "").trim()).filter(Boolean))
    );
  }, [users]);

  const filteredUsers = useMemo(() => {
    return (users || []).filter((user) => {
      const haystack = [
        user?.name,
        user?.email,
        user?.role,
        user?.department,
        user?.status,
      ]
        .map((value) => String(value || "").toLowerCase())
        .join(" ");

      const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
      const matchesRole = activeRole === "all" || String(user?.role || "").toLowerCase() === activeRole;
      const matchesStatus =
        activeStatus === "all" || String(user?.status || "").toLowerCase() === activeStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, normalizedSearch, activeRole, activeStatus]);

  const stats = [
    {
      label: "Total users",
      value: users.length,
      icon: Users2,
      tone: "from-indigo-600 via-violet-600 to-cyan-500",
    },
    {
      label: "Visible now",
      value: filteredUsers.length,
      icon: Search,
      tone: "from-slate-900 via-slate-700 to-slate-500",
    },
    {
      label: "Roles",
      value: roles.length || 0,
      icon: ShieldCheck,
      tone: "from-emerald-600 via-teal-600 to-cyan-500",
    },
  ];

  const resetFilters = () => {
    setSearch("");
    setActiveRole("all");
    setActiveStatus("all");
  };

  const formatUserDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatUserAge = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    if (diffDays < 1) return "Joined today";
    if (diffDays === 1) return "Joined 1 day ago";
    if (diffDays < 30) return `Joined ${diffDays} days ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `Joined ${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;

    const diffYears = Math.floor(diffMonths / 12);
    return `Joined ${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
  };

  const roleOptions = ["all", ...roles];
  const statusOptions = ["all", ...statuses];

  return (
    <div className="flex min-h-full w-full justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-5 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
              <Sparkles size={13} />
              Admin review
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">User management</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review platform members, search across profiles, and filter users quickly by role or status.
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
          <div className="flex flex-col gap-4">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, role, or department"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                <Filter size={13} />
                Role
              </div>
              {roleOptions.map((role) => {
                const active = activeRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                        : "bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                    }`}
                  >
                    {role === "all" ? "All roles" : role}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                <BadgeCheck size={13} />
                Status
              </div>
              {statusOptions.map((status) => {
                const active = activeStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setActiveStatus(status)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200/60"
                        : "bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                    }`}
                  >
                    {status === "all" ? "All statuses" : status}
                  </button>
                );
              })}

              {(search || activeRole !== "all" || activeStatus !== "all") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">{filteredUsers.length} users shown</p>
            <p className="text-sm text-slate-500">
              {search || activeRole !== "all" || activeStatus !== "all"
                ? "Filters are active."
                : "Showing all users."}
            </p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
              <Globe2 size={14} className="text-violet-600" />
              Live directory
            </p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/80 bg-white/80 p-8 text-sm text-slate-500 shadow-[0_16px_38px_rgba(79,70,229,0.1)]">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-10 text-center shadow-[0_16px_38px_rgba(79,70,229,0.08)]">
            <p className="text-lg font-semibold text-slate-900">No users found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try another search term or reset the filters.
            </p>
          </div>
        ) : (
          <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_16px_38px_rgba(79,70,229,0.1)]">
            <HistoryContent />
            <div className="divide-y divide-slate-100">
              {filteredUsers.map((elem) => (
                <History
                  key={elem.id}
                  image={elem.avatar}
                  name={elem.name}
                  email={elem.email}
                  role={elem.role}
                  action={elem.status}
                  dept={elem.department}
                  createdAt={elem.createdAt}
                  joinedLabel={formatUserDate(elem.createdAt)}
                  onView={() => setSelectedUser(elem)}
                />
              ))}
            </div>
          </section>
        )}

        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.35)] sm:p-8">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                aria-label="Close user details"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name || "User"}
                  className="h-24 w-24 rounded-3xl object-cover ring-4 ring-slate-100"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                      {selectedUser.role || "Client"}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      {selectedUser.status || "Active"}
                    </span>
                  </div>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                    {selectedUser.name || "Unknown user"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{selectedUser.email || "No email"}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Department</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{selectedUser.department || "Client"}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Joined on</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {formatUserDate(selectedUser.createdAt)}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Joined detail</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CalendarClock size={15} className="text-violet-600" />
                    {formatUserAge(selectedUser.createdAt) || "Join date not available"}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">User summary</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {selectedUser.status || "Active"} account in the {selectedUser.department || "platform"} area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Center;
