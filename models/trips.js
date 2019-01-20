const mongoose = require('mongoose')

const schema = {
    userId:              { type: String, required: true},
    tripDateOfCreation:  { type: Date, required: true},
    tripType:            { type: String, required: true},
    tripId:              { type: String, required: true},
    // places:
}

const trip_schema = new mongoose.Schema(schema);
module.exports = mongoose.model('Trips', trip_schema);