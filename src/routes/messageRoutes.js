const express = require('express')
const router = express.Router()
const {
   scheduleMessage
} = require('../controller/messageController');

router.post('/scheduleMessage', scheduleMessage);

module.exports = router;