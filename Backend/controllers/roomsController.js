const Rooms = require('../models/Rooms');
const RoomTypes = require("../models/RoomTypes");

exports.createRoom = async (req, res) => {
  try {
    const { name, details, roomType, hotel } = req.body;
    const createdBy = req.user._id;
    const room = new Rooms({
      name,
      details,
      roomType,
      hotel,
      status: "vacant",
      createdBy,
    });
    await room.save();

    await RoomTypes.findByIdAndUpdate(roomType, {
      $inc: { totalRooms: 1, availableRooms: 1 },
    });
    // await RoomTypes.findByIdAndUpdate(roomType,{$inc:{availableRooms:1}})

    res.json({ message: "Room created successfully", room });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({ hotel: req.query.hotelId }).populate(
      "roomType"
    );
    res.json(rooms);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getRoomsByType = async (req, res) => {
  try {
    const availRooms = []
    const rooms = await Rooms.find({
      hotel: req.query.hotelId,
      roomType: req.params.type,
    }).populate("roomType");

    if(rooms.length>0){
     rooms?.forEach((room)=>{
        if(room.status == 'vacant') availRooms.push(room)
      })
    }

    res.json(availRooms);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const hotel = await Rooms.findById(req.params.id).populate([
      "hotel",
      "roomType",
    ]);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const hotel = await Rooms.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json({ message: "Hotel updated successfully", hotel });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const hotel = await Rooms.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    await RoomTypes.findByIdAndUpdate(roomType, {
      $inc: { totalRooms: -1, availableRooms: -1 },
    });

    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
