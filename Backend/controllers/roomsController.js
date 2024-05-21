const Rooms = require('../models/Rooms');

exports.createRoom = async (req, res) => {

  try {
    const { name, details,roomType,hotel } = req.body;
    const createdBy = req.user._id;
    const room = new Rooms({
      name,
      details,
      roomType,
      hotel,
      status:'vacant',
      createdBy
    });
    await room.save();
    res.json({ message: 'Room created successfully', room });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({hotel:req.query.hotelId}).populate('roomType');
    res.json(rooms);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const hotel = await Rooms.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const hotel = await Rooms.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json({ message: 'Hotel updated successfully', hotel });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const hotel = await Rooms.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
