import React from "react";
import History from "./recentHistory";


function RecentActivity({ history = [] }){

    return (
        <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5 shadow-sm">
            <div className="mb-4">
                <h1 className="text-base font-bold tracking-tight text-slate-950">Recent activity</h1>
                <p className="mt-1 text-sm text-slate-500">Latest moves across the platform.</p>
            </div>
            {history.map((ele,idx)=>{
                return <History key={idx} project={ele.project} status={ele.status} time={ele.time}/>
            })}
        </div>
    )
}

export default RecentActivity;
