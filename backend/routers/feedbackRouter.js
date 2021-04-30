const express = require('express');
const router = express.Router();

router.get('/feedback', (req, res) => {
    console.log('feedback customer')
})

module.exports = router;