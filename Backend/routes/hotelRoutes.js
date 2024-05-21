const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const {
  checkAdminRole,
  authenticateUser,
} = require("../middleware/authMiddleware");

router.post(
  "/hotels",
  authenticateUser,
  checkAdminRole,
  hotelController.createHotel
);
router.get(
  "/hotels",
  authenticateUser,
  checkAdminRole,
  hotelController.getHotels
);
router.get(
  "/hotels/:id",
  authenticateUser,
  checkAdminRole,
  hotelController.getHotelById
);
router.put(
  "/hotels/:id",
  authenticateUser,
  checkAdminRole,
  hotelController.updateHotel
);
router.delete(
  "/hotels/:id",
  authenticateUser,
  checkAdminRole,
  hotelController.deleteHotel
);

module.exports = router;
