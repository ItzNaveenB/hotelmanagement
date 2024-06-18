const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

exports.searchHotels = async (req, res) => {
  try {
    const { place, checkIn, checkOut } = req.query;

    const hotels = await Hotel.find({ address: new RegExp(place, 'i') });

    const availableHotels = await Promise.all(hotels.map(async hotel => {
      const rooms = await Room.find({ hotel: hotel._id });

      const availableRooms = await Promise.all(rooms.map(async room => {
        const bookings = await Booking.find({
          room: room._id,
          $or: [
            { checkIn: { $lt: checkOut, $gte: checkIn } },
            { checkOut: { $gt: checkIn, $lte: checkOut } }
          ]
        });

        if (bookings.length === 0) {
          return room;
        }
      }));

      return {
        hotel,
        rooms: availableRooms.filter(room => room)
      };
    }));

    res.json(availableHotels.filter(hotel => hotel.rooms.length > 0));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.bookRoom = async (req, res) => {
  try {
    const { hotelId, roomId, checkIn, checkOut } = req.body;
    const userId = req.user._id;

    const currentDate = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < currentDate || checkOutDate < currentDate) {
      return res.status(400).json({ error: 'Check-in and check-out dates must be in the future' });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ error: 'Check-out date must be after check-in date' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const existingBookings = await Booking.find({
      room: roomId,
      $or: [
        { checkIn: { $lt: checkOutDate, $gte: checkInDate } },
        { checkOut: { $gt: checkInDate, $lte: checkOutDate } }
      ]
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ error: 'Room is already booked for the selected dates' });
    }

    const booking = new Booking({
      user: userId,
      hotel: hotelId,
      room: roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      total: room.price * ((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    });

    await booking.save();

    res.status(201).json({ message: 'Room booked successfully', booking });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
