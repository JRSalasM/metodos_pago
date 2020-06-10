const express = require('express');
const router = express.Router();

const payment = require('../controllers/payment.controller');

router.post('/payment', payment.payment);

router.post('/session_niubiz', payment.getSessionNiubiz);
router.post('/payment_niubiz', payment.paymentNiubiz);
router.get('/getPayment_niubiz/:id', payment.getPaymentNiubiz);

module.exports = router;