const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  details: {
    type: String
  },
  images: [
    {
      type: String
    }
  ]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
