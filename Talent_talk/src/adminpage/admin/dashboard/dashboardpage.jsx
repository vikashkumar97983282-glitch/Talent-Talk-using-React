import React from "react";
import DashCont from "./dashCont";
import EarnOverview from "./earnOverview";
import Graph from "./graph";
import { AllCommunityModule, ModuleRegistry } from "ag-charts-community";
import RecentActivity from "./recentActivity";




function DashboardPage(){

    const userCont = [{user: "Total Users", count: 4824, growth: "+12%"},{user: "Active Users", count: 3824, growth: "+8%"},{user: "New Users", count: 1024, growth: "+20%"}]

    return (
        <div className="h-screen w-[80vw] overflow-y-scroll">
            <div className="ml-5 mt-5 font-bold text-2xl">
                <h1>Dashboard</h1>
            </div>
            <div className="flex flex-wrap gap-5 mt-5 ml-5 ">
                {userCont.map((ele,idx)=>{
                    return <DashCont key={idx} user={ele.user} count={ele.count} growth={ele.growth}/>
                })}
            </div>
            <div className="ml-5 mt-5 font-bold text-1.5xl">
                <h1>Earning Overview</h1>
            </div>
            <div className="w-full ">
                <EarnOverview/>
                <Graph/>
                <RecentActivity/>
            </div>
            
        </div>
    )
}

export default DashboardPage;