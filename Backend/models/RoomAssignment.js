const mongoose = require('mongoose');

const roomAssignmentSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  bed: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  SGST: {
    type: Number,
    required: true
  },
  CGST: {
    type: Number,
    required: true
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
  leaseFrom: {
    type: Date,
    required: true
  },
  leaseTo: {
    type: Date,
    required: true
  }
});

const RoomAssignment = mongoose.model('RoomAssignment', roomAssignmentSchema);

module.exports = RoomAssignment;
