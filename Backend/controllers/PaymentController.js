const Payment = require('../models/Payment');
const { generatePaymentPDF } = require('../utils/pdfUtils');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { invoice, total, paid, balance, paying, method, transactionId, notes } = req.body;

    const newPayment = new Payment({
      invoice,
      total,
      paid,
      balance,
      paying,
      method,
      transactionId,
      notes
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.generatePaymentPDF = async (req, res) => {
  try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) {
          return res.status(404).json({ error: 'Payment not found' });
      }

      generatePaymentPDF(payment, res);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a payment
// exports.updatePayment = async (req, res) => {
//   try {
//     const { invoice, total, paid, balance, paying, method, transactionId, notes } = req.body;

//     const updatedPayment = await Payment.findByIdAndUpdate(
//       req.params.id,
//       { invoice, total, paid, balance, paying, method, transactionId, notes },
//       { new: true }
//     );

//     if (!updatedPayment) {
//       return res.status(404).json({ error: 'Payment not found' });
//     }
//     res.status(200).json(updatedPayment);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Delete a payment
// exports.deletePayment = async (req, res) => {
//   try {
//     const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
//     if (!deletedPayment) {
//       return res.status(404).json({ error: 'Payment not found' });
//     }
//     res.status(200).json({ message: 'Payment deleted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
