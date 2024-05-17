const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

exports.createRoom = async (req, res) => {
  try {
    const { name, price, hotel, details, images } = req.body;
    const room = new Room({ name, price, hotel, details, images });
    const savedRoom = await room.save();

    const associatedHotel = await Hotel.findById(hotel);
    associatedHotel.rooms.push(savedRoom._id);
    await associatedHotel.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('hotel');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('hotel');
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { name, price, details, images } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { name, price, details, images },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const associatedHotel = await Hotel.findById(room.hotel);
    associatedHotel.rooms.pull(room._id);
    await associatedHotel.save();

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
