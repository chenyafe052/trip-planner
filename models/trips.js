const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    userId:             { type: String, required: true },
    tripDateOfCreation: { type: String, required: true },
    tripType: { type: String, required: true },
    tripId: { type: Number, required: true },
    places: [String],
    cancellationHistory: [String]
    // places:
});

const tripsModel = mongoose.model('trip', tripSchema, 'trip');

module.exports = tripsModel;