const express = require('express')
const router = express.Router()
const feedbackController = require('../controllers/feedbackController')
const seemore = require('../utils/seemore');
const feedback = require('../models/feedbackCustomer');

router.post('/feedbacks', feedbackController.createFeedback);
router.get('/feedbacks/:id', feedbackController.getFeedbacks);

router.get('/feedback', seemore(feedback), feedbackController.getFeedbacks)
module.exports = router
