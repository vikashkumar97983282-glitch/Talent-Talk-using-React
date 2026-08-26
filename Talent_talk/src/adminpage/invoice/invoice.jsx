import React from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import InvoiceBody from "./invoiceBody";


function Invoice(){

    return (
        <div className="admin-page-theme flex min-h-screen w-full flex-col bg-slate-50 md:h-screen md:flex-row md:overflow-hidden">
            <AdminPanel/>
            <main className="min-w-0 flex-1 bg-slate-50 text-slate-700 md:overflow-y-auto">
                <InvoiceBody/>
            </main>

        </div>
    )
}

export default Invoice;
