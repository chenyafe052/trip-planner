const mongoose = require('mongoose')

const schema = {
    name:   { type: String, required: true},
    id:     { type: String, required: true},
    email:  { type: String, required: true},
    age:    { type: Number, required: true}
}

const user_schema = new mongoose.Schema(schema);
module.exports = mongoose.model('User', user_schema);