const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripSchema = new Schema({
<<<<<<< HEAD
    userId: { type: Number, required: true },
    tripId: { type: Number,  index: 1, required: true },
=======
    userId: { type: String, required: true },
>>>>>>> b1262c018857c737e136899904037f402d50d28b
    tripDateOfCreation: { type: String, required: true },
    tripType: { type: String, required: true },
    places: [String],
    cancellationHistory: [String]
});

const tripsModel = mongoose.model('trip', tripSchema);

module.exports = tripsModel;