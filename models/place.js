const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    placeType: { type: String, required: true},
    placeGoogleId: { type: String, required: true },
    amountOfSelection: { type: Number, required: false }
});

const placesModel = mongoose.model('place', placesSchema);
module.exports = placesModel;