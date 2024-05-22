const express = require('express');
const router = express.Router();
const roomAssignmentController = require('../controllers/roomAssignmentController');
const { authenticateUser, checkAdminRole } = require('../middleware/authMiddleware');
router.post('/room-assignments', authenticateUser, checkAdminRole, roomAssignmentController.createRoomAssignment);
router.get('/room-assignments', authenticateUser, roomAssignmentController.getAllRoomAssignments);
router.get('/room-assignments/:id', authenticateUser, roomAssignmentController.getRoomAssignmentById);
router.put('/room-assignments/:id', authenticateUser, checkAdminRole, roomAssignmentController.updateRoomAssignment);
router.delete('/room-assignments/:id', authenticateUser, checkAdminRole, roomAssignmentController.deleteRoomAssignment);
router.post('/retractRoom', authenticateUser, checkAdminRole, roomAssignmentController.RetractRoom);

module.exports = router;