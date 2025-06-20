const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { submitCode, getUserSubmissions } = require('../controllers/submission.controller');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/', authenticate, rateLimiter, submitCode);
router.get('/user/:userId', authenticate, getUserSubmissions);

module.exports = router;
