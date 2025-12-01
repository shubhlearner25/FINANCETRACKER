import React, { useState, useEffect, useCallback, useMemo } from "react";

const BudgetModal = ({ isOpen, onClose, onSubmit, budget, categories = [] }) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "month") {
      const monthValue = Math.max(1, Math.min(12, Number(value)));
      return setFormData((prev) => ({ ...prev, month: monthValue }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, budget?._id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

        <h2 className="mb-4 text-2xl font-semibold text-black">
          {budget ? "Edit Budget" : "Add Budget"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Category */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-black">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded border border-black/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-black">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded border border-black/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
            />
          </div>

          {/* Month */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-black">Month</label>
            <input
              type="number"
              name="month"
              value={formData.month}
              onChange={handleChange}
              min="1"
              max="12"
              required
              className="w-full rounded border border-black/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
            />
          </div>

          {/* Year */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-black">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="2000"
              max="2100"
              required
              className="w-full rounded border border-black/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-black px-4 py-2 font-medium hover:bg-black hover:text-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded border border-black bg-black px-4 py-2 font-medium text-white hover:bg-white hover:text-black transition"
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
