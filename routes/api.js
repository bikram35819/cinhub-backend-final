const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const authController = require('../controllers/authController');
const streamController = require('../controllers/streamController');
const financeController = require('../controllers/financeController');
const aiController = require('../controllers/aiController');

// AUTH ROUTES
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// CONTENT & STREAMING
router.get('/stream/:id', auth, streamController.streamVideo);
router.get('/player-config/:id', auth, streamController.getPlayerConfig);

// FINANCE ROUTES
router.post('/finance/buy-plan', auth, financeController.purchasePlan);
router.post('/finance/withdraw', auth, financeController.requestWithdrawal);

// ADMIN AI COMMANDS
router.post('/admin/command', aiController.executeCommand);

module.exports = router;
