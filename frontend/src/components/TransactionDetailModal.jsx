import React from "react";
import useCurrency from "../hooks/useCurrency";

const DetailRow = ({ label, value, color }) => (
  <div className="flex justify-between py-2 border-b border-gray-200">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className={`text-sm font-semibold ${color ?? "text-gray-900"}`}>
      {value}
    </span>
  </div>
);

const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
  const { currency } = useCurrency();

  if (!isOpen || !transaction) return null;

  const isIncome = transaction.isIncome;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
  }).format(transaction.cost);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg mx-4 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3">
          Transaction Details
        </h2>

        {/* Details */}
        <div className="space-y-2">
          <DetailRow
            label="Type"
            value={isIncome ? "Income" : "Expense"}
            color={isIncome ? "text-orange-600" : "text-orange-700"}
          />

          <DetailRow label="Name / Description" value={transaction.name} />

          <DetailRow label="Category" value={transaction.category} />

          <DetailRow
            label="Amount"
            value={`${isIncome ? "+" : "-"}${formattedAmount}`}
            color={isIncome ? "text-orange-600" : "text-orange-700"}
          />

          <DetailRow
            label="Date"
            value={new Date(transaction.addedOn).toLocaleDateString()}
          />

          {/* Notes Section */}
          <div className="pt-4 mt-2">
            <p className="text-sm font-bold text-gray-700 mb-1">Notes</p>
            <p className="text-base text-gray-800 bg-orange-50 p-3 rounded-lg border border-orange-200">
              {transaction.note || "No note provided."}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-8 w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
