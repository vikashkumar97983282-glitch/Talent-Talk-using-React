import React, { useEffect, useState } from "react";
import axios from "axios";
import DashCont from "./dashCont";
import EarnOverview from "./earnOverview";
import Graph from "./graph";
import RecentActivity from "./recentActivity";


function DashboardPage(){
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
<<<<<<< HEAD
        <div className="h-screen w-[80vw] overflow-y-auto bg-slate-100 px-6 py-6 text-slate-900">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-600">Welcome back. Here is a quick snapshot of activity and earnings.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
                    Updated just now
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
=======
        <main className="h-screen min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_48%,_#f5f3ff_100%)] px-5 py-6 text-slate-700 sm:px-7 lg:px-9">

            <div className="text-2xl font-bold tracking-tight text-slate-950">
                <h1>Dashboard</h1>
            </div>

            <div className="mt-6 flex flex-wrap gap-5">
>>>>>>> 0cc237e (change css and structure in admin page.)
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
<<<<<<< HEAD
            <div className="mt-8">
                <h1 className="text-xl font-semibold">Earning Overview</h1>
=======

            <div className="mt-9 text-xl font-bold tracking-tight text-slate-950">
                <h1>Earning Overview</h1>
>>>>>>> 0cc237e (change css and structure in admin page.)
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">

                <div className="space-y-5">
                    <EarnOverview/>
                    <Graph/>
                </div>

                <div>
                    <RecentActivity history={recentHistory}/>
                </div>

            </div>

        </main>
    )
}

export default DashboardPage;
