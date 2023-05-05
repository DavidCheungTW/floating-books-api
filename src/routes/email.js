const express = require('express');
const router = express.Router();
const { sendAck } = require('../controllers/sendAck');

router.route('/api/email').post(sendAck);

module.exports = router;
