const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    userId: { type: Number, index: 1, required: true },
    tripDateOfCreation: { type: String, required: true },
    tripType: { type: String, required: true },
    places: [String],
    cancellationHistory: [String]
});

const tripsModel = mongoose.model('trip', tripSchema);

module.exports = tripsModel;