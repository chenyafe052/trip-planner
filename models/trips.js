const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    userId: { type: String, required: true },
    tripDateOfCreation: { type: Date, required: true },
    tripType: { type: String, required: true },
    tripId: { type: String, required: true },
    // places:
});

const tripsModel = mongoose.model('Trips', tripSchema);
module.exports = tripsModel;