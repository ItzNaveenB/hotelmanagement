const express = require('express');
const router = express.Router();
const expenseCategoryController = require('../controllers/expenseCategoryController');
const { authenticateUser, checkAdminRole } = require('../middleware/authMiddleware');

// Create a new expense category
router.post('/expense-categories', authenticateUser, checkAdminRole, expenseCategoryController.createExpenseCategory);

// Read all expense categories
router.get('/expense-categories', authenticateUser, checkAdminRole, expenseCategoryController.getAllExpenseCategories);

// Read an expense category by ID
router.get('/expense-categories/:id', authenticateUser, checkAdminRole, expenseCategoryController.getExpenseCategoryById);

// Update an expense category
router.put('/expense-categories/:id', authenticateUser, checkAdminRole, expenseCategoryController.updateExpenseCategory);

// Delete an expense category
router.delete('/expense-categories/:id', authenticateUser, checkAdminRole, expenseCategoryController.deleteExpenseCategory);

module.exports = router;
