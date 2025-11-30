import React, { useState, useEffect, useCallback, useMemo } from "react";

const BudgetModal = ({ isOpen, onClose, onSubmit, budget, categories = [] }) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Initial form structure
  const defaultForm = useMemo(
    () => ({
      category: categories[0] || "",
      amount: "",
      month: currentMonth,
      year: currentYear,
    }),
    [categories]
  );

  const [formData, setFormData] = useState(defaultForm);

  // Populate form when editing
  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category,
        amount: budget.amount,
        month: budget.month,
        year: budget.year,
      });
    } else {
      setFormData(defaultForm);
    }
  }, [budget, defaultForm]);

  // Handle input changes with validation
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    // Month boundaries
    if (name === "month") {
      const monthValue = Math.max(1, Math.min(12, Number(value)));
      return setFormData((prev) => ({ ...prev, month: monthValue }));
    }

    // Other fields
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, budget?._id);
  };

  // Modal closed → do not render component
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-semibold">
          {budget ? "Edit Budget" : "Add Budget"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Category Selector */}
          <div className="mb-4">
            <label className="mb-1 block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="mb-1 block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {/* Month Input */}
          <div className="mb-4">
            <label className="mb-1 block text-gray-700">Month</label>
            <input
              type="number"
              name="month"
              value={formData.month}
              onChange={handleChange}
              min="1"
              max="12"
              required
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {/* Year Input */}
          <div className="mb-4">
            <label className="mb-1 block text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="2000"
              max="2100"
              required
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {budget ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;
