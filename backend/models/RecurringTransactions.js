
const mongoose = require('mongoose');
// -----------------------------------------------------------------------------
// Model: RecurringTransaction
// Defines financial transactions that repeat automatically (daily, weekly,
// monthly, yearly). Stores the base transaction details and calculates the next
// due date for upcoming occurrences.
// -----------------------------------------------------------------------------

const recurringTransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    isIncome: { type: Boolean, required: true },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'annually'], required: true },
    startDate: { type: Date, required: true },
    nextDueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('RecurringTransaction', recurringTransactionSchema);
