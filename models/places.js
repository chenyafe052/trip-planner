const mongoose = require('mongoose')

const schema = {
    // Location:        { type: Number, required: true},
    userReviewRate:     { type: Number, required: true},
    placeType:          { type: String, required: true},
    placeGoogleId:      { type: String, required: true},
    placeName:          { type: String, required: true},
    amountOfSelection:  { type: Number, required: true}
}

const place_schema = new mongoose.Schema(schema);
module.exports = mongoose.model('Places', place_schema);