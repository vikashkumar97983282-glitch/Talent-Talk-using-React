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
        <main className="min-h-0 min-w-0 flex-1 bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_48%,_#f5f3ff_100%)] px-5 py-6 text-slate-700 sm:px-7 lg:px-9 md:h-screen md:overflow-y-auto">

            <div className="text-2xl font-bold tracking-tight text-slate-950">
                <h1>Dashboard</h1>
            </div>

            <div className="mt-6 flex flex-wrap gap-5">
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

            <div className="mt-9 text-xl font-bold tracking-tight text-slate-950">
                <h1>Earning Overview</h1>
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
