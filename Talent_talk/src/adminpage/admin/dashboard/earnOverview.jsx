import React from "react";

function EarnOverview({ revenue = 0 }) {
    const displayRevenue = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(revenue);

    return (
        <div className="grid gap-4 rounded-3xl border border-slate-100 bg-slate-50/80 p-5 shadow-sm sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4">
                <h1 className="text-sm font-medium text-slate-500">Earning</h1>
                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{displayRevenue}</h2>
                <h3 className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">Live total</h3>
            </div>
            <div className="rounded-2xl bg-white p-4">
                <h1 className="text-sm font-medium text-slate-500">Trend</h1>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">+25%</h2>
                <h3 className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">Last 30 days</h3>
            </div>
            <div className="rounded-2xl bg-white p-4">
                <h1 className="text-sm font-medium text-slate-500">Payouts</h1>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Healthy</h2>
                <h3 className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-600">On schedule</h3>
            </div>
        </div>
    )
}

export default EarnOverview;
