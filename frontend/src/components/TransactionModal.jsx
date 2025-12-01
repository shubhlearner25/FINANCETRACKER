import React, { useState, useEffect } from "react";

const VIEW = {
  EXPENSE: "expense",
  INCOME: "income",
};

const createInitialData = (categories) => ({
  name: "",
  category: categories[0] || "",
  cost: "",
  addedOn: new Date().toISOString().split("T")[0],
  isIncome: false,
  note: "",
});

const TransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  expenseCategories = [],
  incomeCategories = [],
  onNewCategory,
  currentBalance = 0,
}) => {
  const [view, setView] = useState(VIEW.EXPENSE);
  const [forceSubmit, setForceSubmit] = useState(false);
  const [formData, setFormData] = useState(createInitialData(expenseCategories));

  useEffect(() => {
    if (!isOpen) return;

    if (transaction) {
      setFormData({
        name: transaction.name,
        category: transaction.category,
        cost: transaction.cost,
        addedOn: new Date(transaction.addedOn).toISOString().split("T")[0],
        isIncome: transaction.isIncome,
        note: transaction.note ?? "",
      });

      setView(transaction.isIncome ? VIEW.INCOME : VIEW.EXPENSE);
      return;
    }

    setFormData(
      createInitialData(view === VIEW.EXPENSE ? expenseCategories : incomeCategories)
    );
  }, [isOpen, transaction, view]);

  const handleField = (e) => {
    const { name, value } = e.target;

    // Add new category
    if (name === "category" && value === "__add_new__") {
      const newCat = window.prompt("Enter new category:");
      if (newCat) {
        const isIncome = view === VIEW.INCOME;
        onNewCategory(newCat, isIncome);
        setFormData((prev) => ({ ...prev, category: newCat }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const switchToIncome = (e) => {
    e.preventDefault();
    setView(VIEW.INCOME);
    setFormData(createInitialData(incomeCategories));
  };

  const switchToExpense = (e) => {
    e.preventDefault();
    setView(VIEW.EXPENSE);
    setFormData(createInitialData(expenseCategories));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(formData.cost);
    const isIncomeTx = view === VIEW.INCOME;

    // Expense validation
    if (!isIncomeTx && !transaction && amount > currentBalance && !forceSubmit) {
      const confirm = window.confirm(
        `This expense (${amount}) exceeds your balance (${currentBalance}). Submit anyway?`
      );

      if (confirm) {
        setForceSubmit(true);
        setTimeout(() => {
          e.target.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }, 0);
      }
      return;
    }

    setForceSubmit(false);

    const finalName =
      isIncomeTx && !formData.name.trim()
        ? `${formData.category || "General"} Income`
        : formData.name.trim();

    const result = {
      ...formData,
      name: finalName,
      isIncome: isIncomeTx,
    };

    onSubmit(result, transaction?._id);
  };

  if (!isOpen) return null;

  const isExpense = view === VIEW.EXPENSE;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl">

        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          {transaction ? "Edit" : "Add"} {isExpense ? "Expense" : "Income"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Name Field (Expense Only) */}
          {isExpense && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleField}
                className="w-full px-3 py-2 border rounded focus:outline-orange-500"
                required
              />
            </div>
          )}

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleField}
              className="w-full px-3 py-2 border rounded focus:outline-orange-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>

              {(isExpense ? expenseCategories : incomeCategories).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}

              <option value="__add_new__" className="font-semibold text-orange-600">
                ➕ Add New Category
              </option>
            </select>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Amount {isExpense ? "(Expense)" : "(Income)"}
            </label>
            <input
              type="number"
              min="0"
              name="cost"
              value={formData.cost}
              onChange={handleField}
              className="w-full px-3 py-2 border rounded focus:outline-orange-500"
              required
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="addedOn"
              value={formData.addedOn}
              onChange={handleField}
              className="w-full px-3 py-2 border rounded focus:outline-orange-500"
              required
            />
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="block text-gray-700">Notes (Optional)</label>
            <textarea
              name="note"
              rows="3"
              value={formData.note}
              onChange={handleField}
              className="w-full px-3 py-2 border rounded resize-y focus:outline-orange-500"
            />
          </div>

          {/* Switch View */}
          <button
            className="text-orange-600 underline"
            onClick={isExpense ? switchToIncome : switchToExpense}
          >
            {isExpense ? "Switch to Income" : "Switch to Expense"}
          </button>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
