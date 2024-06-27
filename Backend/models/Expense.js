const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: true
  },
  expenseCategory: {
    type: String,
    enum: ['Electricity invoice', 'Water tax invoice', 'Land tax invoice'],
    required: true
  },
  expenseAmount: {
    type: Number,
    required: true
  },
  expenseDetails: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash'],
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
