import React from "react";
import DashCont from "./dashCont";
import EarnOverview from "./earnOverview";
import Graph from "./graph";
import RecentActivity from "./recentActivity";




function DashboardPage(){

    const userCont = [{user: "Total Users", count: 4824, growth: "+12%"},{user: "Active Users", count: 3824, growth: "+8%"},{user: "New Users", count: 1024, growth: "+20%"}]

    return (
        <div className="h-screen w-[80vw] overflow-y-scroll bg-sky-50 px-5 py-5 text-slate-900">
            <div className="font-bold text-2xl">
                <h1>Dashboard</h1>
            </div>
            <div className="mt-5 flex flex-wrap gap-5">
                {userCont.map((ele,idx)=>{
                    return <DashCont key={idx} user={ele.user} count={ele.count} growth={ele.growth}/>
                })}
            </div>
            <div className="mt-8 font-bold text-xl">
                <h1>Earning Overview</h1>
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
