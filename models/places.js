const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    placeGoogleId: { type: String, required: true },
    amountOfSelection: { type: Number, required: true }
});

const placesModel = mongoose.model('Places', placesSchema);
module.exports = placesModel;