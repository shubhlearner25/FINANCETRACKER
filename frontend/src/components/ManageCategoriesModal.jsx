import React from "react";

const ManageCategoriesModal = ({
  isOpen,
  onClose,
  expenseCategories = [],
  incomeCategories = [],
  onDelete,
}) => {
  // Categories that cannot be removed
  const lockedExpense = [
    "Food",
    "Shopping",
    "Bills",
    "Subscriptions",
    "Transportation",
    "Entertainment",
    "Groceries",
    "Miscellaneous",
  ];

  const lockedIncome = [
    "Salary",
    "Freelance / Side Gig",
    "Investment Returns",
    "Gifts",
    "Refunds",
  ];

  // Extract only the user's custom categories
  const customExpenses = expenseCategories.filter(
    (cat) => !lockedExpense.includes(cat)
  );
  const customIncome = incomeCategories.filter(
    (cat) => !lockedIncome.includes(cat)
  );

  const showAny = customExpenses.length || customIncome.length;

  if (!isOpen) return null;

  /** Component for listing categories */
  const CategoryBlock = ({ label, list }) => (
    <section className="mb-6">
      <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1">
        {label}
      </h4>

      {list.length > 0 ? (
        <ul className="divide-y divide-gray-200 mt-2">
          {list.map((cat) => (
            <li
              key={cat}
              className="flex items-center justify-between py-2 text-gray-900"
            >
              <span>{cat}</span>

              <button
                onClick={() => onDelete(cat)}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm italic text-gray-500">
          No custom categories added.
        </p>
      )}
    </section>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-900 dark:text-gray-100">
        <h2 className="mb-6 border-b pb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Manage Custom Categories
        </h2>

        {/* Category Lists */}
        {showAny ? (
          <div className="max-h-96 space-y-6 overflow-y-auto pr-2">
            <CategoryBlock label="Expense Categories" list={customExpenses} />
            <CategoryBlock label="Income Categories" list={customIncome} />
          </div>
        ) : (
          <p className="py-8 text-center text-gray-500 dark:text-gray-400">
            You haven’t created any custom categories yet.
          </p>
        )}

        {/* Bottom Actions */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-sm hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCategoriesModal;
