const mongoose = require("mongoose");

const roomTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  details: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
});

const RoomTypes = mongoose.model("RoomTypes", roomTypesSchema);

module.exports = RoomTypes;
