import React from "react";

function EarnOverview(){
    return (
        <div className="w-full rounded-2xl border border-white/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(79,70,229,0.10)] backdrop-blur">
            <h1 className="text-sm font-medium text-slate-500">Earning</h1>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">$89,012</h2>
            <h3 className="mt-2 text-xs font-bold uppercase tracking-wider text-violet-600" >Last 30 Days +25%</h3>
        </div>
    )
}

export default EarnOverview;
