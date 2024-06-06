const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateUser, checkAdminRole } = require('../middleware/authMiddleware');

// Create a new expense
router.post('/expenses', authenticateUser, checkAdminRole, expenseController.createExpense);

// Read all expenses
router.get('/expenses', authenticateUser, checkAdminRole, expenseController.getAllExpenses);

// Read an expense by ID
router.get('/expenses/:id', authenticateUser, checkAdminRole, expenseController.getExpenseById);

// Update an expense
router.put('/expenses/:id', authenticateUser, checkAdminRole, expenseController.updateExpense);

// Delete an expense
router.delete('/expenses/:id', authenticateUser, checkAdminRole, expenseController.deleteExpense);

module.exports = router;
