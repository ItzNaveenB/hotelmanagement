const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  invoice: {
    type: String,
    required: true,
    unique: true
  },
  total: {
    type: Number,
    required: true
  },
  paid: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  paying: {
    type: Number,
  },
  method: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
