const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomsController");
const {
  authenticateUser,
  checkAdminRole,
} = require("../middleware/authMiddleware");

router.post(
  "/room",
  authenticateUser,
  checkAdminRole,
  roomController.createRoom
);
router.get("/rooms", roomController.getRooms);
router.get("/room/:id", roomController.getRoomById);
router.put(
  "/room/:id",
  authenticateUser,
  checkAdminRole,
  roomController.updateRoom
);
router.delete(
  "/room/:id",
  authenticateUser,
  checkAdminRole,
  roomController.deleteRoom
);

module.exports = router;
