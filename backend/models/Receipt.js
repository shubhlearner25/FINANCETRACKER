const mongoose = require('mongoose');
// -----------------------------------------------------------------------------
// Model: Receipt
// Holds uploaded receipt data along with AI-extracted details such as merchant,
// date, amount, and category. Linked to a user and optionally connected to a
// finalized transaction. Supports receipt storage and automated data extraction.
// -----------------------------------------------------------------------------

const receiptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  fileUrl: {
    type: String,
    required: true,
  },
  extractedData: {
    amount: Number,
    category: String,
    date: Date,
    merchant: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Receipt', receiptSchema);