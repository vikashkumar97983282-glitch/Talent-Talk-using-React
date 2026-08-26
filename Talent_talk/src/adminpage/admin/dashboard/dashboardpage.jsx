import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  CalendarDays,
  IndianRupee,
  Sparkles,
  Users2,
} from "lucide-react";
import DashCont from "./dashCont";
import EarnOverview from "./earnOverview";
import Graph from "./graph";
import RecentActivity from "./recentActivity";
import { useAdminTheme } from "../adminThemeHook";

function DashboardPage() {
  const { theme } = useAdminTheme();
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalJobs: 0,
    revenue: 0,
  });
  const [recentHistory, setRecentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await axios.get("/admin/dashboard", { withCredentials: true });
        const stats = res.data?.stats || {};

        setDashboard({
          totalUsers: Number(stats.totalUsers || 0),
          activeUsers: Number(stats.activeUsers || 0),
          newUsers: Number(stats.newUsers || 0),
          totalJobs: Number(stats.totalJobs || stats.jobs || 0),
          revenue: Number(stats.revenue || stats.totalRevenue || 0),
        });

        const activity = (res.data?.recentActivity || []).map((item) => ({
          project: item.project,
          status: item.status,
          time: item.time ? new Date(item.time).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }) : "-",
        }));

        setRecentHistory(activity);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  const summaryCards = useMemo(() => [
    {
      label: "Total users",
      count: dashboard.totalUsers,
      growth: "Live",
      icon: Users2,
    },
    {
      label: "Active users",
      count: dashboard.activeUsers,
      growth: "Live",
      icon: Sparkles,
    },
    {
      label: "New users",
      count: dashboard.newUsers,
      growth: "7d",
      icon: CalendarDays,
    },
    {
      label: "Open jobs",
      count: dashboard.totalJobs,
      growth: "Marketplace",
      icon: BriefcaseBusiness,
    },
  ], [dashboard]);

  return (
    <main
      className={`min-h-0 min-w-0 flex-1 md:h-screen md:overflow-y-auto ${
        theme === "dark"
          ? "bg-[#0b1220] text-slate-200"
          : "bg-[radial-gradient(circle_at_top_right,_rgba(165,180,252,0.34),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#ecfeff_100%)] text-slate-700"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className={`overflow-hidden rounded-[2rem] border p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] sm:p-7 ${
          theme === "dark"
            ? "border-white/10 bg-white/[0.03]"
            : "border-white/80 bg-white/80"
        }`}>
          <div className="relative flex flex-col gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
                <Sparkles size={13} />
                Admin dashboard
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Dashboard
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Keep an eye on user growth, job activity, and revenue trends from one focused overview.
              </p>
            </div>

            <div className={`grid w-full min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4 ${loading ? "opacity-70" : ""}`}>
              {summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className={`rounded-2xl border p-4 shadow-sm ${
                      theme === "dark"
                        ? "border-white/10 bg-white/[0.04]"
                        : "border-slate-100 bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {card.label}
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                          {card.count}
                        </h2>
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-600">
                          {card.growth}
                        </p>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-md">
                        <Icon size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.8fr)]">
          <div className="space-y-6">
            <section className={`rounded-[2rem] border p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] ${
              theme === "dark"
                ? "border-white/10 bg-white/[0.03]"
                : "border-white/80 bg-white/80"
            }`}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Revenue</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Earning overview</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    A quick snapshot of current earnings and recent activity.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                  <IndianRupee size={13} />
                  Live revenue
                </div>
              </div>

              <EarnOverview revenue={dashboard.revenue} />
            </section>

            <section className={`rounded-[2rem] border p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] ${
              theme === "dark"
                ? "border-white/10 bg-white/[0.03]"
                : "border-white/80 bg-white/80"
            }`}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Performance</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Activity chart</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Track platform movement across recent months.
                  </p>
                </div>
              </div>

              <Graph />
            </section>
          </div>

          <aside className={`rounded-[2rem] border p-6 shadow-[0_20px_45px_rgba(79,70,229,0.12)] ${
            theme === "dark"
              ? "border-white/10 bg-white/[0.03]"
              : "border-white/80 bg-white/80"
          }`}>
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Recent activity</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Latest updates</h2>
              <p className="mt-1 text-sm text-slate-500">
                Recent platform actions and live movement.
              </p>
            </div>

            <RecentActivity history={recentHistory} />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
