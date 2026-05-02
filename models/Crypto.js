const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    symbol: {
        type: String,
        required: [true, 'Please add a symbol'],
        uppercase: true,
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image URL'],
    },
    '24hChange': {
        type: Number,
        required: [true, 'Please add the 24h percentage change'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Crypto', cryptoSchema);
