import React from "react";

function PaymentHistory(props){
    const status = String(props.status || "Pending");
    const statusStyle = status.toLowerCase() === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : status.toLowerCase() === "failed" ? "bg-rose-50 text-rose-700 ring-rose-100" : "bg-amber-50 text-amber-700 ring-amber-100";

    return (
        <article className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-slate-100 px-5 py-4 text-sm text-slate-600 transition-colors hover:bg-violet-50/40 md:grid-cols-6 md:items-center md:gap-4">
                <p className="break-all font-medium text-slate-700"><span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Transaction</span>{props.id || "-"}</p>
                <p><span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Client</span>{props.client || "-"}</p>
                <p><span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Freelancer</span>{props.freelancer || "-"}</p>
                <p className="font-semibold text-slate-800"><span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Amount</span>{props.amount || 0} <span className="text-xs font-medium text-slate-400">{props.cur || "INR"}</span></p>
                <p><span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Date</span>{props.date || "-"}</p>
                <p><span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Status</span><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusStyle}`}>{status}</span></p>
        </article>
    )
}

export default PaymentHistory;
