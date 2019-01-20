const mongoose = require('mongoose')


const schema = {
    id:         { type: String, required: true},
    // groupName:  { type: String, required: true},
    // status:     { type: String, required: true},
    // cancellationReason:   { type: String, required: false},
    // players:    [player]
}

const user_schema = new mongoose.Schema(schema);
module.exports = mongoose.model('User', user_schema);