const Guest = require('../models/Guest');

// Create a new guest
exports.createGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all guests
exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find({hotel:req.query.hotelId}).populate(['hotel','room','roomType']);
    res.status(200).json(guests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a guest by ID
exports.getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id).populate('hotel');
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    res.status(200).json(guest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a guest
exports.updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    res.status(200).json(guest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a guest
exports.deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    res.status(200).json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
