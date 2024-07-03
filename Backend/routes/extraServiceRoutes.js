const express = require('express');
const router = express.Router();
const extraServiceController = require('../controllers/extraServiceController');
const { authenticateUser, checkAdminRole } = require('../middleware/authMiddleware');

router.post('/extra-services', authenticateUser, checkAdminRole, extraServiceController.createExtraService);
router.get('/extra-services', authenticateUser, extraServiceController.getExtraServices);
router.get('/extra-services/:id', authenticateUser, extraServiceController.getExtraService);
router.put('/extra-services/:id', authenticateUser, checkAdminRole, extraServiceController.updateExtraService);
router.delete('/extra-services/:id', authenticateUser, checkAdminRole, extraServiceController.deleteExtraService);

module.exports = router;
