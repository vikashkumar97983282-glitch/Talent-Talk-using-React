import React from "react";
import History from "./recentHistory";


function RecentActivity({ history = [] }){

    return (
<<<<<<< HEAD
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-base font-semibold">Recent Activity</h1>
                <button className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100">View all</button>
=======
        <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(79,70,229,0.10)] backdrop-blur">
            <div className="mb-4">
                <h1 className="text-base font-bold tracking-tight text-slate-900">Recent Activity</h1>
>>>>>>> 0cc237e (change css and structure in admin page.)
            </div>
            {history.map((ele,idx)=>{
                return <History key={idx} project={ele.project} status={ele.status} time={ele.time}/>
            })}
        </div>
    )
}

export default RecentActivity;
