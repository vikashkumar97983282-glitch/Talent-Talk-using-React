import React, { useEffect, useState } from "react";
import axios from "axios";
import DashCont from "./dashCont";
import EarnOverview from "./earnOverview";
import Graph from "./graph";
import RecentActivity from "./recentActivity";
import { useAdminTheme } from "../adminThemeHook";


function DashboardPage(){
    const [activeTab, setActiveTab] = useState("Overview");
    const { theme } = useAdminTheme();
    const [userCont, setUserCont] = useState([
        { user: "Total Users", count: 0, growth: "Live" },
        { user: "Active Users", count: 0, growth: "Live" },
        { user: "New Users", count: 0, growth: "7d" },
    ]);
    const [recentHistory, setRecentHistory] = useState([]);

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                const res = await axios.get("/admin/dashboard", { withCredentials: true });
                const stats = res.data?.stats || {};

                setUserCont([
                    {
                        user: "Total Users",
                        count: Number(stats.totalUsers || 0),
                        growth: "Live"
                    },
                    {
                        user: "Active Users",
                        count: Number(stats.activeUsers || 0),
                        growth: "Live"
                    },
                    {
                        user: "New Users",
                        count: Number(stats.newUsers || 0),
                        growth: "7d"
                    },
                ]);

                const activity = (res.data?.recentActivity || []).map((item) => ({
                    project: item.project,
                    status: item.status,
                    time: new Date(item.time).toLocaleDateString(),
                }));

                setRecentHistory(activity);

            } catch (err) {
                console.log(err);
            }
        };

        getDashboardData();
    }, []);

    return (
        <main className={`h-screen min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-7 lg:px-9 ${theme === "dark" ? "bg-[#0b1220] text-slate-300" : "bg-[radial-gradient(circle_at_top_right,_#dff7ff_0%,_transparent_32%),linear-gradient(135deg,_#f8fcff_0%,_#eef8ff_52%,_#f3fbfa_100%)] text-slate-700"}`}>
            <div className={`flex flex-wrap items-end justify-between gap-4 border-b pb-5 ${theme === "dark" ? "border-white/10" : "border-sky-100"}`}>
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Admin workspace</p>
                    <h1 className={`mt-2 text-3xl font-semibold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-950"}`}>{activeTab}</h1>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-cyan-400">Live data</span>
                    <span>Today</span>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                {userCont.map((ele,idx)=>{
                    return (
                        <DashCont
                            key={idx}
                            user={ele.user}
                            count={ele.count}
                            growth={ele.growth}
                        />
                    )
                })}
            </div>
            <div className="mt-8 flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-950"}`}>Performance</h2>
                <div className={`flex gap-1 rounded-lg border p-1 text-[11px] ${theme === "dark" ? "border-white/10 bg-white/[0.04] text-zinc-500" : "border-sky-100 bg-white/70 text-slate-400 shadow-sm"}`} role="tablist" aria-label="Dashboard views">
                    {["Overview", "Analytics", "Reports"].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-md px-2 py-1 transition-colors ${activeTab === tab ? (theme === "dark" ? "bg-white/10 text-white" : "bg-sky-100 text-sky-700") : (theme === "dark" ? "hover:text-zinc-300" : "hover:text-sky-700")} ${tab === "Reports" ? "hidden sm:block" : ""}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === "Overview" && (
                <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
                    <div className="space-y-5">
                        <EarnOverview/>
                        <Graph/>
                    </div>
                    <RecentActivity history={recentHistory}/>
                </div>
            )}

            {activeTab === "Analytics" && (
                <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
                    <Graph/>
                    <div className="space-y-4">
                        <div className="rounded-xl border border-white/10 bg-[#1b1b1b] p-5">
                            <p className="text-xs text-zinc-500">Tracked users</p>
                            <p className="mt-2 text-3xl font-semibold text-white">{userCont[0]?.count || 0}</p>
                            <p className="mt-1 text-xs text-emerald-400">{userCont[1]?.count || 0} active now</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#1b1b1b] p-5">
                            <p className="text-xs text-zinc-500">Recent activity</p>
                            <p className="mt-2 text-3xl font-semibold text-white">{recentHistory.length}</p>
                            <p className="mt-1 text-xs text-zinc-500">events recorded</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "Reports" && (
                <div className="mt-4 rounded-xl border border-white/10 bg-[#1b1b1b] p-4">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-sm font-semibold text-white">Workspace report</h2>
                            <p className="mt-1 text-xs text-zinc-500">Current platform metrics and recent events</p>
                        </div>
                        <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-zinc-400">Live snapshot</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[520px] text-left text-xs">
                            <thead className="border-b border-white/10 text-zinc-500">
                                <tr><th className="px-3 py-3 font-medium">Metric</th><th className="px-3 py-3 font-medium">Value</th><th className="px-3 py-3 font-medium">Status</th></tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-zinc-300">
                                {userCont.map((metric) => <tr key={metric.user}><td className="px-3 py-3">{metric.user}</td><td className="px-3 py-3 font-semibold text-white">{metric.count}</td><td className="px-3 py-3 text-emerald-400">{metric.growth}</td></tr>)}
                                <tr><td className="px-3 py-3">Recent activity</td><td className="px-3 py-3 font-semibold text-white">{recentHistory.length}</td><td className="px-3 py-3 text-zinc-500">Events</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </main>
    )
}

export default DashboardPage;
