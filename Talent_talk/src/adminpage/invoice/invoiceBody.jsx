import React, { useEffect, useState } from "react";
import axios from "axios";
import InvoiceContainer from "./invoiceContainer";

function InvoiceBody() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const getInvoices = async () => {
            try {
                const res = await axios.get("/admin/invoices", { withCredentials: true });
                setInvoices(res.data?.invoices || []);
            } catch (err) {
                console.log(err);
                setInvoices([]);
            }
        };

        getInvoices();
    }, []);

    return (
        <div className="flex min-h-full w-full justify-center px-5 py-6 sm:px-8">
            <div className="mb-10 w-full max-w-6xl">
                <div className="mb-6 mt-5 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950">Invoices</h1>
                    <button className="h-9 w-32 rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600">
                        create invoice
                    </button>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 sm:gap-6 lg:gap-7">
                    {invoices.map((item, index) => (
                        <InvoiceContainer key={index} invoice={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InvoiceBody;
