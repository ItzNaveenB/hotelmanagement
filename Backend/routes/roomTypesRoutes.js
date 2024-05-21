const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomTypesController");
const {
  authenticateUser,
  checkAdminRole,
} = require("../middleware/authMiddleware");

router.post(
  "/roomtypes",
  authenticateUser,
  checkAdminRole,
  roomController.createRoom
);
router.get("/roomtypes", roomController.getRooms);
router.get("/roomtypes/:id", roomController.getRoomById);
router.put(
  "/roomtypes/:id",
  authenticateUser,
  checkAdminRole,
  roomController.updateRoom
);
router.delete(
  "/roomtypes/:id",
  authenticateUser,
  checkAdminRole,
  roomController.deleteRoom
);

module.exports = router;
