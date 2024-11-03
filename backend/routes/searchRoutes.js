const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchControler');

router.get('/', searchProducts);

module.exports = router;
