import React from "react";
import History from "./recentHistory";


function RecentActivity({ history = [] }){

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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
