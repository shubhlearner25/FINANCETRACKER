const express = require('express');
const router = express.Router();
const { createBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController.js');
const { protect } = require('../middleware/authMiddleware');
// Routes for managing user budgets, including creating a budget,
// retrieving monthly budgets with spending summaries, and deleting budgets.
// All routes require authentication to access user-specific data.


router.post('/', protect, createBudget);
router.get('/', protect, getBudgets);
router.delete('/:id', protect, deleteBudget);

module.exports = router;
