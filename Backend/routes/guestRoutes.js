const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const { authenticateUser, checkAdminRole } = require('../middleware/authMiddleware');

router.post('/guests', authenticateUser, checkAdminRole, guestController.createGuest);
router.get('/guests', authenticateUser, checkAdminRole, guestController.getAllGuests);
router.get('/guests/:id', authenticateUser, checkAdminRole, guestController.getGuestById);
router.put('/guests/:id', authenticateUser, checkAdminRole, guestController.updateGuest);
router.delete('/guests/:id', authenticateUser, checkAdminRole, guestController.deleteGuest);

module.exports = router;
