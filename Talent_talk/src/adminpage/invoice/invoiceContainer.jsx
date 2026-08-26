import React from "react";

function InvoiceContainer({ invoice }){
    const createdDate = invoice?.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : "-";
    const statusStyle = invoice?.status === "Success"
        ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
        : invoice?.status === "Failed"
          ? "bg-rose-50 text-rose-700 ring-rose-100"
          : "bg-amber-50 text-amber-700 ring-amber-100";

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-slate-800 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_36px_rgba(79,70,229,0.16)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
            <div className="flex items-start justify-between gap-3 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{invoice?.invoiceNumber || "INV-00000"}</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusStyle}`}>{invoice?.status || "Pending"}</span>
            </div>
            <h3 className="mt-5 truncate text-lg font-bold tracking-tight text-slate-900">{invoice?.companyName || "Company"}</h3>
            <p className="mt-1 truncate text-sm text-slate-500">Client: {invoice?.clientName || "Client"}</p>
            <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                <div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Amount</p><p className="mt-1 text-xl font-bold tracking-tight text-slate-900">{invoice?.amount || 0} <span className="text-sm text-slate-500">{invoice?.currency || "INR"}</span></p></div>
                <p className="text-right text-xs font-medium text-slate-400">Created<br /><span className="text-slate-500">{createdDate}</span></p>
            </div>
        </article>
    )
}

export default InvoiceContainer;
