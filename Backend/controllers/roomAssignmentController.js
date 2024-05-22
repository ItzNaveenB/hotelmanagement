const Guest = require("../models/Guest");
const RoomAssignment = require("../models/RoomAssignment");
const Rooms = require("../models/Rooms");
const RoomTypes = require("../models/RoomTypes");

exports.createRoomAssignment = async (req, res) => {
  try {
    const {
      guest,
      roomType,
      room,
      basePrice,
      SGST,
      CGST,
      total,
      paid,
      balance,
      leaseFrom,
      leaseTo,
    } = req.body;

    const RoomType = await RoomTypes.findOne({ _id: roomType });
    const Room = await Rooms.findOne({ _id: room });
    const dbGuest = await Guest.findOne({ _id: guest });

    if (RoomType.availableRooms < 1) {
      return res.status(500).json({ error: "Room not available." });
    }

    const newRoomAssignment = new RoomAssignment({
      guest,
      roomType,
      room,
      basePrice,
      SGST,
      CGST,
      total,
      paid,
      balance,
      leaseFrom,
      leaseTo,
    });

    await newRoomAssignment.save();

    await RoomType.updateOne({ $inc: { availableRooms: -1 } });
    await Room.updateOne({ status: "occupied" });
    await dbGuest.updateOne({ room, roomType });
    res.status(201).json(newRoomAssignment);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllRoomAssignments = async (req, res) => {
  try {
    const roomAssignments = await RoomAssignment.find().populate("guest room");
    res.status(200).json(roomAssignments);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRoomAssignmentById = async (req, res) => {
  try {
    const roomAssignment = await RoomAssignment.findById(
      req.params.id
    ).populate("guest room");
    if (!roomAssignment) {
      return res.status(404).json({ error: "Room assignment not found" });
    }
    res.status(200).json(roomAssignment);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateRoomAssignment = async (req, res) => {
  try {
    const {
      guest,
      room,
      bed,
      basePrice,
      SGST,
      CGST,
      total,
      paid,
      balance,
      leaseFrom,
      leaseTo,
    } = req.body;

    const updatedRoomAssignment = await RoomAssignment.findByIdAndUpdate(
      req.params.id,
      {
        guest,
        room,
        bed,
        basePrice,
        SGST,
        CGST,
        total,
        paid,
        balance,
        leaseFrom,
        leaseTo,
      },
      { new: true }
    );

    if (!updatedRoomAssignment) {
      return res.status(404).json({ error: "Room assignment not found" });
    }
    res.status(200).json(updatedRoomAssignment);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteRoomAssignment = async (req, res) => {
  try {
    const deletedRoomAssignment = await RoomAssignment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRoomAssignment) {
      return res.status(404).json({ error: "Room assignment not found" });
    }
    res.status(200).json({ message: "Room assignment deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.RetractRoom = async (req, res) => {
  try {
    const {
      guest,
      roomType,
      room,
    } = req.body;

    console.log(roomType,room,guest)

    const RoomType = await RoomTypes.findOne({ _id: roomType });
    const Room = await Rooms.findOne({ _id: room });
    const dbGuest = await Guest.findOne({ _id: guest });
    
    await RoomType.updateOne({ $inc: { availableRooms: 1 } });
    await Room.updateOne({ status: "vacant" });
    // await dbGuest.updateOne({ room:, roomType:'' });

    res.status(200).json({ message: "Room assignment deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
