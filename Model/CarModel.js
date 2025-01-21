const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    img: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: String, required: true },
    range: { type: String, required: true },
    acceleration: { type: String, required: true },
    topSpeed: { type: String, required: true },
    description: { type: String, required: true },
    label: { type: String, required: true },
    path: { type: String, required: true },
    dark: { type: String, required: true },
    name: { type: String, required: true },
    startingPrice: { type: String, required: true },
    colors: {
        red: { type: String, required: true },
        blue: { type: String, required: true },
        white: { type: String, required: true },
        black: { type: String, required: true },
    },
    features: [{ type: String, required: true }],
    variants: [
        {
            variant: { type: String, required: true },
            range: { type: String, required: true },
            acceleration: { type: String, required: true },
            topSpeed: { type: String, required: true }
        }
    ],
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
