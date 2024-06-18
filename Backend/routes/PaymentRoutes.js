const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');
const { authenticateUser, checkAdminRole } = require('../middleware/authMiddleware');

// Create a new payment
router.post('/payments', authenticateUser, checkAdminRole, paymentController.createPayment);

// Read all payments
router.get('/payments', authenticateUser, checkAdminRole, paymentController.getAllPayments);

// Read a payment by ID
router.get('/payments/:id', authenticateUser, checkAdminRole, paymentController.getPaymentById);

router.get('/payments/:id/pdf', authenticateUser, checkAdminRole, paymentController.generatePaymentPDF);

// // Update a payment
// router.put('/payments/:id', authenticateUser, checkAdminRole, paymentController.updatePayment);

// // Delete a payment
// router.delete('/payments/:id', authenticateUser, checkAdminRole, paymentController.deletePayment);

module.exports = router;
