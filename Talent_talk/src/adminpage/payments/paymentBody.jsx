import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../users/filter";
import PaymentStatus from "./paymentStatus";
import PaymentHeader from "./paymenHeader";
import PaymentHistory from "./paymentHistory";


function PaymentsBody(){
    const [status, setStatus] = useState([
        { title: "Total Revenue", amount: "0 INR" },
        { title: "Pending Payouts", amount: "0 INR" },
    ]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const paymentHistory=["Transaction","Client","Freelancer","Amount","Date","Status"]

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
                <div className="">
                <h1 className="mb-5 mt-5 text-2xl font-bold tracking-tight text-slate-950">User Management</h1>
                <input type="text" placeholder="enter the value" className="h-11 w-full rounded-xl border border-indigo-100 bg-white/80 px-5 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"/>
                </div>
                <div className="h-100% w-full mt-5">
                    <Filter/>
                </div>
                <div className="flex flex-wrap gap-8.5 mt-5">
                    {status.map((elem,idx)=>{
                        return <PaymentStatus key={idx} title={elem.title} amt={elem.amount}/>
                    })}
                </div>
                <div className="mt-5 flex h-11 w-full flex-wrap items-center gap-20 rounded-t-2xl border border-indigo-100 bg-indigo-50/80 text-xs font-bold uppercase tracking-wider text-indigo-700">
                    {paymentHistory.map((elem,idx)=>{
                        return <PaymentHeader key={idx} header={elem}/>
                    })}
                </div>
                <div className="flex w-full flex-wrap items-center">
                    {loading && <p className="p-4 text-sm text-slate-500">Loading payments...</p>}
                    {!loading && transactions.length === 0 && <p className="p-4 text-sm text-slate-500">No payments found.</p>}
                    {transactions.map((elem,idx)=>{
                        return <PaymentHistory key={idx} id={elem.transactionId} client={elem.client} freelancer={elem.freelancer} amount={elem.amount} cur={elem.currency} date={new Date(elem.date).toLocaleDateString()} status={elem.status}/>
                    })}
                </div>

            </div>
            
        </div>
    )
}

export default PaymentsBody;
