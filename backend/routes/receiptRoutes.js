const express = require('express');
const router = express.Router();
const { uploadReceipt, saveTransactionFromReceipt } = require('../controllers/receiptController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
// Routes for uploading receipt images, extracting data using AI,
// and converting confirmed receipt data into a transaction.
// Requires file upload middleware and user authentication.

router.post('/upload', protect, upload, uploadReceipt);
router.post('/save-transaction', protect, saveTransactionFromReceipt);

module.exports = router;