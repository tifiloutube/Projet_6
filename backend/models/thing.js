const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    userId: {type: String, require: true},
    name: {type: String, require: true},
    manufacturer: {type: String, require: true},
    mainPepper: {type: String, require: true},
    imageURL: {type: String, require: true},
    heat: {type: Number, require: true}
})

module.exports = mongoose.model('Thing', thingSchema);
