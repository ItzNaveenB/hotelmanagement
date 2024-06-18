const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.get('/search', bookingController.searchHotels);
router.post('/book', authenticateUser, bookingController.bookRoom);

module.exports = router;
