import React from "react";

function ClientPaymentContent() {
  return (
    <div className="bg-teal-700 min-h-screen p-8 text-white">

      {/* Title */}
      <h1 className="text-2xl font-bold">Payout Portal</h1>
      <p className="text-gray-200 mb-6">
        Monitor your revenue and manage instant withdrawals.
      </p>

      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-300 text-black p-6 rounded-xl">
          <p className="text-sm">AVAILABLE NOW</p>
          <h2 className="text-lg font-semibold mt-2">
            Available for Withdrawal
          </h2>
          <p className="text-xl font-bold">$12,450.00</p>
        </div>

        <div className="bg-blue-500 p-6 rounded-xl">
          <p className="text-sm">PROCESSING</p>
          <h2 className="text-lg font-semibold mt-2">
            Pending Clearance
          </h2>
          <p className="text-xl font-bold">$3,200.00</p>
        </div>

        <div className="bg-orange-400 text-black p-6 rounded-xl">
          <p className="text-sm">LIFETIME</p>
          <h2 className="text-lg font-semibold mt-2">
            Total Earned
          </h2>
          <p className="text-xl font-bold">$84,500.00</p>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">

        {/* Chart Section */}
        <div className="col-span-2 bg-gray-200 text-black p-6 rounded-xl">

          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Monthly Income Trends</h3>
            <span className="text-sm text-gray-500">
              Last 6 Months
            </span>
          </div>

          <p className="text-xl font-bold text-purple-600">
            $8,240
          </p>

          <div className="h-40 flex items-center justify-center text-gray-400">
            Chart Area
          </div>

        </div>

        {/* Withdraw Section */}
        <div className="bg-gray-200 text-black p-6 rounded-xl">

          <h3 className="font-semibold mb-4">Withdraw Funds</h3>

          <input
            type="text"
            value="5,000.00 USD"
            className="w-full p-2 border rounded mb-4"
            readOnly
          />

          <p className="text-sm mb-4">
            Convert to EUR (€) : €4,642.50
          </p>

          <button className="w-full bg-indigo-500 text-white py-2 rounded-lg mb-4">
            Withdraw $5,000.00
          </button>

          <div className="bg-white p-3 rounded">
            <p className="font-semibold">Payout Method</p>
            <p className="text-sm text-gray-600">
              Chase Bank Business
            </p>
            <p className="text-sm text-gray-600">
              PayPal Wallet
            </p>
          </div>

        </div>

      </div>

      {/* Recent Payouts */}
      <div className="bg-gray-200 text-black p-6 rounded-xl mt-6">

        <h3 className="font-semibold mb-4">Recent Payouts</h3>

        <div className="space-y-3">

          <div className="flex justify-between">
            <p>Chase Bank Withdrawal</p>
            <span className="text-green-600">$2,400 COMPLETED</span>
          </div>

          <div className="flex justify-between">
            <p>Project UX Revamp Final</p>
            <span className="text-blue-600">$4,500 CLEARED</span>
          </div>

          <div className="flex justify-between">
            <p>Paypal Transfer</p>
            <span className="text-yellow-600">$1,200 PROCESSING</span>
          </div>

        </div>

      </div>

      {/* Add Account */}
      <div className="mt-6 flex justify-end">
        <button className="bg-gray-300 text-black px-4 py-2 rounded">
          Add Account
        </button>
      </div>

    </div>
  );
}

export default ClientPaymentContent;