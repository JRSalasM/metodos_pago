const express = require('express');
const router = express.Router();

const product = require('../controllers/product.controller');

router.get('/allProducts', product.allProducts);

module.exports = router;