const express = require('express')
const router = express.Router()
const feedbackController = require('../controllers/feedbackController')

router.post('/feedbacks', feedbackController.createFeedback);
router.get('/feedbacks', feedbackController.getFeedbacks);

module.exports = router
