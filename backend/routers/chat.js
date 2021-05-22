const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController')
router.post('/chat',chatController.chatFile);
router.post('/post/search',chatController.searchChat);
module.exports = router;