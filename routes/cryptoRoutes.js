const express = require('express');
const {
    getAllCryptos,
    getGainers,
    getNewListings,
    addCrypto
} = require('../controllers/cryptoController');

const router = express.Router();

router.get('/', getAllCryptos);
router.get('/gainers', getGainers);
router.get('/new', getNewListings);
router.post('/', addCrypto);

module.exports = router;
