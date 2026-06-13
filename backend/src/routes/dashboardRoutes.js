const express = require('express');
const router = express.Router();
const c = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

router.get('/stats', authenticate, c.getStats);

module.exports = router;
