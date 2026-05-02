const Crypto = require('../models/Crypto');

// @desc    Get all cryptocurrencies
// @route   GET /api/crypto
// @access  Public
exports.getAllCryptos = async (req, res) => {
    try {
        const cryptos = await Crypto.find();
        res.status(200).json({
            success: true,
            count: cryptos.length,
            data: cryptos,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get top gainers
// @route   GET /api/crypto/gainers
// @access  Public
exports.getGainers = async (req, res) => {
    try {
        // Sort by 24hChange in descending order
        const gainers = await Crypto.find().sort({ '24hChange': -1 });
        res.status(200).json({
            success: true,
            count: gainers.length,
            data: gainers,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get new listings
// @route   GET /api/crypto/new
// @access  Public
exports.getNewListings = async (req, res) => {
    try {
        // Sort by createdAt in descending order
        const newCryptos = await Crypto.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: newCryptos.length,
            data: newCryptos,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Add a new cryptocurrency
// @route   POST /api/crypto
// @access  Public (or Private depending on requirements, assuming public for now)
exports.addCrypto = async (req, res) => {
    try {
        const { name, symbol, price, image, '24hChange': change24h } = req.body;
        
        // Let's also support twentyFourHourChange or 24hChange
        const change = change24h !== undefined ? change24h : req.body.twentyFourHourChange;

        const crypto = await Crypto.create({
            name,
            symbol,
            price,
            image,
            '24hChange': change,
        });

        res.status(201).json({
            success: true,
            data: crypto,
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
