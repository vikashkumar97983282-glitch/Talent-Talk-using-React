import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ClientPaymentContent() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const res = await axios.get("/client/payments", { withCredentials: true });
        setPayments(Array.isArray(res.data?.payments) ? res.data.payments : []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Unable to load payments.");
      }
    };

    loadPayments();
  }, []);

  const formatCurrency = (value) =>
    `INR ${Number(value || 0).toLocaleString("en-IN")}`;

  const normalizePaymentStatus = (status) => {
    const value = String(status || "").trim().toLowerCase();
    if (value === "success") return "Success";
    if (value === "pending") return "Pending";
    if (value === "failed") return "Failed";
    return "Pending";
  };

  const successTotal = useMemo(
    () =>
      payments
        .filter((pay) => normalizePaymentStatus(pay.status) === "Success")
        .reduce((sum, pay) => sum + Number(pay.amount || 0), 0),
    [payments]
  );

  const pendingTotal = useMemo(
    () =>
      payments
        .filter((pay) => normalizePaymentStatus(pay.status) === "Pending")
        .reduce((sum, pay) => sum + Number(pay.amount || 0), 0),
    [payments]
  );

  const statusStyle = (status) => {
    if (status === "Success")
      return "rounded-full bg-[#d7f5e3] px-3 py-1 text-xs font-semibold text-[#1d7a4e]";
    if (status === "Pending")
      return "rounded-full bg-[#fff2d9] px-3 py-1 text-xs font-semibold text-[#a0691a]";
    return "rounded-full bg-[#ffe1db] px-3 py-1 text-xs font-semibold text-[#b03f2f]";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <h1 className="text-2xl font-bold">Project Payments</h1>
      <p className="mb-6 text-slate-500">
        When project status is Complete, payment is added as Pending. After company payment is done, status becomes Success.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 p-6 text-black">
          <p className="text-sm">SUCCESS PAYMENTS</p>
          <h2 className="mt-2 text-lg font-semibold">Payment Done</h2>
          <p className="text-xl font-bold">{formatCurrency(successTotal)}</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-indigo-700 to-sky-700 p-6 text-white">
          <p className="text-sm">PENDING PAYMENTS</p>
          <h2 className="mt-2 text-lg font-semibold">Awaiting Company Payment</h2>
          <p className="text-xl font-bold">{formatCurrency(pendingTotal)}</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-amber-200 to-orange-200 p-6 text-black">
          <p className="text-sm">TOTAL REQUESTS</p>
          <h2 className="mt-2 text-lg font-semibold">Payment Entries</h2>
          <p className="text-xl font-bold">{payments.length}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-sky-100">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Company</th>
              <th className="p-3">Description</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-slate-500">
                  No payment entries yet. Mark project status as Complete to create a Pending payment.
                </td>
              </tr>
            ) : (
              payments.map((pay) => (
                <tr key={pay._id} className="border-t border-slate-100">
                  <td className="p-3">{pay.companyId?.name || "N/A"}</td>
                  <td className="p-3">{pay.description || "Company payout"}</td>
                  <td className="p-3">{formatCurrency(pay.amount)}</td>
                  <td className="p-3">
                    {new Date(
                      (normalizePaymentStatus(pay.status) === "Success" ? pay.paidAt : pay.createdAt) ||
                        Date.now()
                    )
                      .toISOString()
                      .slice(0, 10)}
                  </td>
                  <td className="p-3">
                    <span className={statusStyle(normalizePaymentStatus(pay.status))}>
                      {normalizePaymentStatus(pay.status)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientPaymentContent;
