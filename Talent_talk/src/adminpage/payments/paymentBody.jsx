import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentStatus from "./paymentStatus";
import PaymentHistory from "./paymentHistory";


function PaymentsBody(){
    const [status, setStatus] = useState([
        { title: "Total Revenue", amount: "0 INR" },
        { title: "Pending Payouts", amount: "0 INR" },
    ]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const visibleTransactions = transactions.filter((transaction) => {
        const query = search.trim().toLowerCase();
        const matchesSearch = !query || [transaction.transactionId, transaction.client, transaction.freelancer, transaction.amount, transaction.currency]
            .some((value) => String(value || "").toLowerCase().includes(query));
        const matchesStatus = selectedStatus === "All" || String(transaction.status || "Pending").toLowerCase() === selectedStatus.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    useEffect(() => {
        const getPayments = async () => {
            try {
                const res = await axios.get("/admin/payments", { withCredentials: true });
                const summary = res.data?.summary || {};
                setStatus([
                    { title: "Total Revenue", amount: `${Number(summary.totalRevenue || 0)} INR` },
                    { title: "Pending Payouts", amount: `${Number(summary.pendingPayouts || 0)} INR` },
                ]);
                setTransactions(res.data?.payments || []);
            } catch (err) {
                console.log(err);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        getPayments();
    }, []);

    return (
        <div className="flex min-h-full w-full justify-center px-5 py-6 sm:px-8">
            <div className="mb-10 w-full max-w-6xl">
                <div className="mb-6 mt-5 flex flex-wrap items-end justify-between gap-4">
                    <div><h1 className="text-2xl font-bold tracking-tight text-slate-950">Payments &amp; Payouts</h1><p className="mt-1 text-sm text-slate-500">Monitor revenue, outstanding payouts, and recent transactions.</p></div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">Live overview</span>
                </div>
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row">
                    <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search transaction, client, or freelancer" className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"/>
                    <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)} className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none focus:border-violet-300">
                        <option>All</option><option>Success</option><option>Pending</option><option>Failed</option>
                    </select>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {status.map((elem,idx)=>{
                        return <PaymentStatus key={idx} title={elem.title} amt={elem.amount} index={idx}/>
                    })}
                </div>
                <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h2 className="font-bold tracking-tight text-slate-900">Recent transactions</h2><span className="text-xs font-semibold text-slate-400">{visibleTransactions.length} records</span></div>
                    <div className="hidden grid-cols-6 gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 md:grid"><span>Transaction</span><span>Client</span><span>Freelancer</span><span>Amount</span><span>Date</span><span>Status</span></div>
                    <div>
                    {loading && <p className="p-6 text-sm text-slate-500">Loading payments...</p>}
                    {!loading && visibleTransactions.length === 0 && <p className="p-6 text-sm text-slate-500">No payments match the selected filters.</p>}
                    {visibleTransactions.map((elem,idx)=>{
                        return <PaymentHistory key={idx} id={elem.transactionId} client={elem.client} freelancer={elem.freelancer} amount={elem.amount} cur={elem.currency} date={new Date(elem.date).toLocaleDateString()} status={elem.status}/>
                    })}
                    </div>
                </section>

            </div>
            
        </div>
    )
}

export default PaymentsBody;
