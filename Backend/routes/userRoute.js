const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/generate', userController.generateAndStoreUser);

module.exports = router;
