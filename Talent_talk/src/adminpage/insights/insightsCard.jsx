import React from "react";



function InsightsCard({ meta = {} }){

    return (
        <div className="mt-5 flex flex-wrap gap-4 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-[0_10px_24px_rgba(79,70,229,0.10)]">
            <div className="h-50 w-[40%] rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 shadow-inner">
            </div>
            <div>
                <h1 className="font-bold text-slate-900">Platform Growth</h1>
                <p className="text-sm text-slate-600">Total users: {meta.totalUsers || 0}</p>
                <p className="text-sm text-slate-600">Total jobs: {meta.totalJobs || 0}</p>
                <p className="text-sm text-slate-600">Completed jobs: {meta.completedJobs || 0}</p>
                <p className="text-sm text-slate-600">Successful payments: {meta.successfulPayments || 0}</p>
            </div>
        </div>
    )
}

export default InsightsCard;
