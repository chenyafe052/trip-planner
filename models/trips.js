const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    userId:             { type: String, required: true },
    tripDateOfCreation: { type: Date, required: true },
<<<<<<< HEAD
    tripType: { type: String, required: true },
    tripId: { type: Number, required: true },
    places: [String],
    cancellationHistory: [String]
    // places:
=======
    tripType:           { type: String, required: true },
    tripId:             { type: String, required: true },
    places:          [],
    cancellationHistory:[]
>>>>>>> 8160a09cc1ddf180b8a4faf9c854c8bd44057065
});

const tripsModel = mongoose.model('Trips', tripSchema);
module.exports = tripsModel;