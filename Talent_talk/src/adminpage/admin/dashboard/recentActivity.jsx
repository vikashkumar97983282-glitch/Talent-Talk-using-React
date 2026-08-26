import React from "react";
import History from "./recentHistory";


function RecentActivity({ history = [] }){

    return (
        <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(79,70,229,0.10)] backdrop-blur">
            <div className="mb-4">
                <h1 className="text-base font-bold tracking-tight text-slate-900">Recent Activity</h1>
            </div>
            {history.map((ele,idx)=>{
                return <History key={idx} project={ele.project} status={ele.status} time={ele.time}/>
            })}
        </div>
    )
}

export default RecentActivity;
