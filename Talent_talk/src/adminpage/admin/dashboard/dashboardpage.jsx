import React from "react";
import DashCont from "./dashCont";
import EarnOverview from "./earnOverview";
import Graph from "./graph";
import RecentActivity from "./recentActivity";




function DashboardPage(){

    const userCont = [{user: "Total Users", count: 4824, growth: "+12%"},{user: "Active Users", count: 3824, growth: "+8%"},{user: "New Users", count: 1024, growth: "+20%"}]

    return (
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
                {userCont.map((ele,idx)=>{
                    return <DashCont key={idx} user={ele.user} count={ele.count} growth={ele.growth}/>
                })}
            </div>
            <div className="mt-8">
                <h1 className="text-xl font-semibold">Earning Overview</h1>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
                <div className="space-y-5">
                    <EarnOverview/>
                    <Graph/>
                </div>
                <div>
                    <RecentActivity/>
                </div>
            </div>
            
        </div>
    )
}

export default DashboardPage;
