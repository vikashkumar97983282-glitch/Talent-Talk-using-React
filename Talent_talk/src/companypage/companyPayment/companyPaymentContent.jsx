import React from "react";

function CompanyPaymentContent() {
  const payments = [
    {
      id: "TXN12345",
      client: "Ava Harper",
      role: "Data Science",
      amount: "$5,000",
      date: "2023-08-15",
      status: "Completed",
    },
    {
      id: "TXN67890",
      client: "Liam Carter",
      role: "UI/UX",
      amount: "$2,500",
      date: "2023-08-16",
      status: "Pending",
    },
    {
      id: "TXN11223",
      client: "Sophia Clark",
      role: "Mobile Application",
      amount: "$7,500",
      date: "2023-08-17",
      status: "Completed",
    },
    {
      id: "TXN33445",
      client: "Jackson Reed",
      role: "Blogers",
      amount: "$1,000",
      date: "2023-08-18",
      status: "Refunded",
    },
  ];

  const statusStyle = (status) => {
    if (status === "Completed")
      return "rounded-full bg-[#e7f1ea] px-3 py-1 text-sm text-[#2d6b58]";
    if (status === "Pending")
      return "rounded-full bg-[#f4ecd8] px-3 py-1 text-sm text-[#8a6a2f]";
    return "rounded-full bg-[#f6dfdb] px-3 py-1 text-sm text-[#a54a3d]";
  };

  return (
    <div className="min-h-screen bg-[#f7f4ea] p-8 text-slate-900">

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        className="mb-4 w-full rounded-lg bg-[#fffdf8] p-2 ring-1 ring-[#e7dfcc]"
      />

      {/* Filter */}
      <button className="mb-6 rounded bg-[#efe8d8] px-3 py-1 text-[#16362b]">
        Date Range
      </button>

      {/* Cards */}
      <div className="flex gap-6 mb-6">
        
        <div className="w-64 rounded-lg bg-[#fffdf8] p-6 shadow-sm ring-1 ring-[#e7dfcc]">
          <p className="text-sm">Total Payment</p>
          <h3 className="text-xl font-bold">$1,250,000</h3>
        </div>

        <div className="w-64 rounded-lg bg-[#fffdf8] p-6 shadow-sm ring-1 ring-[#e7dfcc]">
          <p className="text-sm">Pending Payment</p>
          <h3 className="text-xl font-bold">$25,000</h3>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-[#fffdf8] shadow-sm ring-1 ring-[#e7dfcc]">

        <table className="w-full text-left">

          <thead className="bg-[#efe8d8] text-[#16362b]">
            <tr>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Client</th>
              <th className="p-3">Roll</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay, index) => (
              <tr key={index} className="border-t border-[#efe6d4]">
                <td className="p-3">{pay.id}</td>
                <td className="p-3">{pay.client}</td>
                <td className="p-3">{pay.role}</td>
                <td className="p-3">{pay.amount}</td>
                <td className="p-3">{pay.date}</td>
                <td className="p-3">
                  <span className={statusStyle(pay.status)}>
                    {pay.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CompanyPaymentContent;
