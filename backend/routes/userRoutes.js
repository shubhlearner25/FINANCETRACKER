const express = require('express');
const router = express.Router();
const { deleteAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
// Routes for general user-related operations, such as fetching personal
// account details or profile updates. Authentication enforced where needed.

router.delete('/account', protect, deleteAccount);

module.exports = router;