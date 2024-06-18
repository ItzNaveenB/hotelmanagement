const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateUser, checkAdminRole } = require('../middleware/authMiddleware');

router.post('/expenses', authenticateUser, checkAdminRole, expenseController.uploadReceipt, expenseController.createExpense);
router.get('/expenses', authenticateUser, expenseController.getExpenses);
router.get('/expenses/:id', authenticateUser, expenseController.getExpenseById);
router.put('/expenses/:id', authenticateUser, checkAdminRole, expenseController.uploadReceipt, expenseController.updateExpense);
router.delete('/expenses/:id', authenticateUser, checkAdminRole, expenseController.deleteExpense);
router.get('/expenses/:id/pdf', authenticateUser, checkAdminRole, expenseController.generateExpensePDF);

module.exports = router;
