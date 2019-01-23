const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    placeType:          { type: String, required: true},
    placeGoogleId:      { type: String, required: true },
    amountOfSelections:  { type: Number, required: true }
});

const placesModel = mongoose.model('place', placesSchema);
module.exports = placesModel;