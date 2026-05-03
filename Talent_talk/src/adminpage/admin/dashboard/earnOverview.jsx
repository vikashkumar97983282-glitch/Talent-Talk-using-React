import React from "react";

function EarnOverview(){
    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h1 className="text-sm font-medium text-slate-500">Total Earning</h1>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">$89,012</h2>
            <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">+25%</span>
                <span className="text-slate-500">Last 30 Days</span>
            </div>
        </div>
    )
}

export default EarnOverview;
