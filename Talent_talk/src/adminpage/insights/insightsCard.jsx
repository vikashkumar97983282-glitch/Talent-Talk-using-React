import React from "react";



function InsightsCard({ meta = {} }){
    const totalJobs = Number(meta.totalJobs || 0);
    const completedJobs = Number(meta.completedJobs || 0);
    const completionRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

    return (
        <section className="mt-7 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-lg font-bold tracking-tight text-slate-900">Platform Growth</h1><p className="mt-1 text-sm text-slate-500">Key outcomes across your marketplace.</p></div><span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">Performance overview</span></div>
            <div className="mt-6 grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full" style={{ background: `conic-gradient(#6366f1 ${completionRate * 3.6}deg, #e2e8f0 0deg)` }}>
                    <div className="flex h-30 w-30 flex-col items-center justify-center rounded-full bg-white"><span className="text-3xl font-bold tracking-tight text-slate-900">{completionRate}%</span><span className="text-xs font-semibold text-slate-400">complete</span></div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total users</p><p className="mt-1 text-xl font-bold text-slate-900">{meta.totalUsers || 0}</p></div>
                    <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total jobs</p><p className="mt-1 text-xl font-bold text-slate-900">{totalJobs}</p></div>
                    <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed jobs</p><p className="mt-1 text-xl font-bold text-slate-900">{completedJobs}</p></div>
                    <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Successful payments</p><p className="mt-1 text-xl font-bold text-slate-900">{meta.successfulPayments || 0}</p></div>
                </div>
            </div>
        </section>
    )
}

export default InsightsCard;
