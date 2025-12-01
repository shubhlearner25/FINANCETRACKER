const mongoose = require("mongoose");
// -----------------------------------------------------------------------------
// Model: Budget
// Represents a user's planned spending limit for a specific category, month,
// and year. Used to track budgeted amounts, calculate spending progress, and
// compute remaining balance for each budgeting period.
// -----------------------------------------------------------------------------

const budgetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
