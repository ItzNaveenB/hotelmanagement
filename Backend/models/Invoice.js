const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true,
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomTypes",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  SGST: {
    type: Number,
    required: true,
  },
  CGST: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  leaseFrom: {
    type: Date,
    required: true,
  },
  leaseTo: {
    type: Date,
    required: true,
  },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
