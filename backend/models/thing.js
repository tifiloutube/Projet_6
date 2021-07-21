const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    userId: {type: String, require: true},
    name: {type: String, require: true},
    description: {type: String, require: true},
    manufacturer: {type: String, require: true},
    mainPepper: { type: String, required: true},
    imageUrl: {type: String, require: true},
    heat: {type: Number, require: true},
    likes: {type: Number, require: true},
    dislikes: {type: Number, require: true},
    userLikes: {type : [String], require: true},
    userDislikes: {type: [String], require: true}
})

module.exports = mongoose.model('Thing', thingSchema);
