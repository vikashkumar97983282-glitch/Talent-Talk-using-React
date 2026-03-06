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
      return "bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm";
    if (status === "Pending")
      return "bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm";
    return "bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm";
  };

  return (
    <div className="bg-teal-700 min-h-screen p-8">

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 rounded-lg mb-4 bg-white"
      />

      {/* Filter */}
      <button className="bg-gray-200 px-3 py-1 rounded mb-6">
        Date Range
      </button>

      {/* Cards */}
      <div className="flex gap-6 mb-6">
        
        <div className="bg-gray-200 p-6 rounded-lg w-64">
          <p className="text-sm">Total Payment</p>
          <h3 className="text-xl font-bold">$1,250,000</h3>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg w-64">
          <p className="text-sm">Pending Payment</p>
          <h3 className="text-xl font-bold">$25,000</h3>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-400">
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
              <tr key={index} className="border-t">
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