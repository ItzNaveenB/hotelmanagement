const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExpenseCategory',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  referenceNumber: {
    type: String,
    required: true
  },
  expenseDate: {
    type: Date,
    required: true
  },
  expenseReceipt: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
