const mongoose = require('mongoose');

const extraServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  branch: {
    type: String,
    enum: ['head branch', 'subbranch'],
    required: true
  },
  details: {
    type: String,
    required: true
  }
});

const ExtraService = mongoose.model('ExtraService', extraServiceSchema);

module.exports = ExtraService;
