const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    // Location:        { type: Number, required: true},
    userReviewRate: { type: Number, required: true },
    placeType: { type: String, required: true },
    placeGoogleId: { type: String, required: true },
    placeName: { type: String, required: true },
    amountOfSelection: { type: Number, required: true }
});

const placesModel = mongoose.model('Places', placesSchema);
module.exports = placesModel;