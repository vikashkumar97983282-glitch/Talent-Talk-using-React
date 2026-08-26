import React from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import InvoiceBody from "./invoiceBody";


function Invoice(){

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
            <AdminPanel/>
            <main className="min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_48%,_#f5f3ff_100%)] text-slate-700">
                <InvoiceBody/>
            </main>

        </div>
    )
}

export default Invoice;
