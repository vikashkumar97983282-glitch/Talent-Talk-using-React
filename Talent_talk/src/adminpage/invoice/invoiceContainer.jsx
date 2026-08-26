import React from "react";

function InvoiceContainer({ invoice }){
    const createdDate = invoice?.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : "-";
    const statusColor = invoice?.status === "Success" ? "text-green-700" : invoice?.status === "Failed" ? "text-red-600" : "text-amber-700";

    return (
        <div className="mt-2 flex flex-wrap gap-5">
            <div className="w-65 rounded-2xl border border-white/15 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-5 text-white shadow-[0_14px_28px_rgba(49,46,129,0.25)] transition-transform hover:-translate-y-1">
                <p className="text-xs opacity-80">{invoice?.invoiceNumber || "INV-00000"}</p>
                <h3 className="mt-1 text-lg font-semibold">{invoice?.companyName || "Company"}</h3>
                <p className="text-sm opacity-90">Client: {invoice?.clientName || "Client"}</p>
                <p className="mt-2 text-sm">Amount: {invoice?.amount || 0} {invoice?.currency || "INR"}</p>
                <p className={`text-sm font-semibold ${statusColor}`}>Status: {invoice?.status || "Pending"}</p>
                <p className="text-xs opacity-80">Created: {createdDate}</p>
            </div>
        </div>
    )
}

export default InvoiceContainer;
