import React, { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CompanyPaymentContent() {
  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [clientRes, historyRes] = await Promise.all([
          axios.get("/company/payment/clients", { withCredentials: true }),
          axios.get("/company/payment/history", { withCredentials: true }),
        ]);

        const clientList = Array.isArray(clientRes.data?.clients)
          ? clientRes.data.clients
          : [];
        setClients(clientList);
        if (clientList.length > 0) {
          setSelectedClient((prev) => prev || clientList[0]._id);
        }

        setPayments(
          Array.isArray(historyRes.data?.payments) ? historyRes.data.payments : []
        );
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load payment data.");
      }
    };

    loadData();
  }, []);

  const formatCurrency = (value) =>
    `INR ${Number(value || 0).toLocaleString("en-IN")}`;

  const selectedClientPendingPayment = useMemo(() => {
    if (!selectedClient) return null;

    const pendingPayments = payments
      .filter(
        (pay) =>
          pay.status === "Pending" &&
          String(pay.clientId?._id || "") === String(selectedClient)
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );

    return pendingPayments[0] || null;
  }, [payments, selectedClient]);

  React.useEffect(() => {
    if (!selectedClient) {
      setAmount("");
      setDescription("");
      return;
    }

    if (!selectedClientPendingPayment) return;

    setAmount(String(selectedClientPendingPayment.amount || ""));
    setDescription(selectedClientPendingPayment.description || "");
  }, [selectedClientPendingPayment, selectedClient]);

  const totalPayment = useMemo(
    () =>
      payments
        .filter((pay) => pay.status === "Success")
        .reduce((sum, pay) => sum + Number(pay.amount || 0), 0),
    [payments]
  );

  const pendingPayment = useMemo(
    () =>
      payments
        .filter((pay) => pay.status === "Pending")
        .reduce((sum, pay) => sum + Number(pay.amount || 0), 0),
    [payments]
  );

  const statusStyle = (status) => {
    if (status === "Success")
      return "rounded-full bg-[#e7f1ea] px-3 py-1 text-sm text-[#2d6b58]";
    if (status === "Pending")
      return "rounded-full bg-[#f4ecd8] px-3 py-1 text-sm text-[#8a6a2f]";
    return "rounded-full bg-[#f6dfdb] px-3 py-1 text-sm text-[#a54a3d]";
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayNow = async () => {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      toast.error("Enter a valid payment amount.");
      return;
    }
    if (!selectedClient) {
      toast.error("Select a client first.");
      return;
    }

    setIsProcessing(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Razorpay SDK failed to load.");
        setIsProcessing(false);
        return;
      }

      const configRes = await axios.get("/company/payment/config", {
        withCredentials: true,
      });
      const orderRes = await axios.post(
        "/company/payment/create-order",
        { amount: numericAmount, clientId: selectedClient, description },
        { withCredentials: true }
      );

      if (!orderRes.data?.success) {
        toast.error(orderRes.data?.message || "Failed to create payment order.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: configRes.data?.keyId,
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "Talent Talk",
        description: "Company Payment",
        order_id: orderRes.data.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "/company/payment/verify",
              {
                ...response,
                amount: numericAmount,
              },
              { withCredentials: true }
            );

            if (verifyRes.data?.success) {
              const historyRes = await axios.get("/company/payment/history", {
                withCredentials: true,
              });
              setPayments(
                Array.isArray(historyRes.data?.payments) ? historyRes.data.payments : []
              );
              setAmount("");
              setDescription("");
              toast.success("Payment completed successfully.");
            } else {
              toast.error(verifyRes.data?.message || "Payment verification failed.");
            }
          } catch (err) {
            toast.error(err.response?.data?.message || "Payment verification failed.");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: async () => {
            try {
              const historyRes = await axios.get("/company/payment/history", {
                withCredentials: true,
              });
              setPayments(
                Array.isArray(historyRes.data?.payments) ? historyRes.data.payments : []
              );
            } catch (err) {
              console.log(err);
            } finally {
              setIsProcessing(false);
            }
          },
        },
        theme: {
          color: "#1f5a49",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        setIsProcessing(false);
      });
      razorpayInstance.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to start payment.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="company-content min-h-screen p-5 text-slate-900 sm:p-8">
      <div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6b58]">Financial overview</p><h2 className="mt-2 text-3xl font-bold">Payment Management</h2><p className="mt-2 text-sm text-slate-500">Send payments securely and review your company transaction history.</p></div>

      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-lg bg-[#fffdf8] p-4 ring-1 ring-[#e7dfcc]">
        <div className="min-w-60 flex-1">
          <label className="mb-1 block text-sm text-[#35584a]">Select Client</label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full rounded-md bg-white px-4 py-2 ring-1 ring-[#e7dfcc] focus:outline-none focus:ring-2 focus:ring-[#3c7a63]"
          >
            <option value="">None</option>
            {clients.length === 0 ? (
              <option value="">No clients available</option>
            ) : (
              clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {`${client.firstname || ""} ${client.lastname || ""}`.trim()} ({client.email})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="min-w-60 flex-1">
          <label className="mb-1 block text-sm text-[#35584a]">Amount (INR)</label>
          <input
            type="number"
            min="1"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md bg-white px-4 py-2 ring-1 ring-[#e7dfcc] focus:outline-none focus:ring-2 focus:ring-[#3c7a63]"
          />
        </div>

        <div className="min-w-60 flex-1">
          <label className="mb-1 block text-sm text-[#35584a]">Description</label>
          <input
            type="text"
            placeholder="Optional note"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-white px-4 py-2 ring-1 ring-[#e7dfcc] focus:outline-none focus:ring-2 focus:ring-[#3c7a63]"
          />
        </div>

        {selectedClientPendingPayment && (
          <div className="w-full text-xs text-[#35584a]">
            Pending payment auto-filled for selected client.
          </div>
        )}

        <button
          onClick={handlePayNow}
          disabled={isProcessing || clients.length === 0 || !selectedClient}
          className="rounded-lg bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-5 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isProcessing ? "Processing..." : "Pay with Razorpay"}
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="w-full rounded-lg bg-[#fffdf8] p-6 shadow-sm ring-1 ring-[#e7dfcc] sm:w-64">
          <p className="text-sm">Total Payment</p>
          <h3 className="text-xl font-bold">{formatCurrency(totalPayment)}</h3>
        </div>

        <div className="w-full rounded-lg bg-[#fffdf8] p-6 shadow-sm ring-1 ring-[#e7dfcc] sm:w-64">
          <p className="text-sm">Pending Payment</p>
          <h3 className="text-xl font-bold">{formatCurrency(pendingPayment)}</h3>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white/90 shadow-[0_14px_32px_rgba(31,58,47,0.08)] ring-1 ring-[#dcebdd]">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#efe8d8] text-[#16362b]">
            <tr>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Client</th>
              <th className="p-3">Role</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-[#5a7368]">
                  No payment history yet.
                </td>
              </tr>
            ) : (
              payments.map((pay, index) => (
                <tr key={`${pay._id || index}`} className="border-t border-[#efe6d4]">
                  <td className="p-3">{pay.razorpayPaymentId || pay.razorpayOrderId || "N/A"}</td>
                  <td className="p-3">
                    {`${pay.clientId?.firstname || ""} ${pay.clientId?.lastname || ""}`.trim() ||
                      "N/A"}
                  </td>
                  <td className="p-3">{pay.description || "Company Checkout"}</td>
                  <td className="p-3">{formatCurrency(pay.amount)}</td>
                  <td className="p-3">
                    {new Date(pay.createdAt || Date.now()).toISOString().slice(0, 10)}
                  </td>
                  <td className="p-3">
                    <span className={statusStyle(pay.status)}>{pay.status}</span>
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

export default CompanyPaymentContent;
