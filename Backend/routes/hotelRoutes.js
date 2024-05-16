const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { checkAdminRole } = require('../middleware/authMiddleware');

router.post('/hotels', checkAdminRole, hotelController.createHotel);
router.get('/hotels', checkAdminRole, hotelController.getHotels);
router.get('/hotels/:id', checkAdminRole, hotelController.getHotelById);
router.put('/hotels/:id', checkAdminRole, hotelController.updateHotel);
router.delete('/hotels/:id', checkAdminRole, hotelController.deleteHotel);

module.exports = router;
