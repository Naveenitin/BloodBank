var mongoose = require("mongoose");

var bloodSchema = new mongoose.Schema({
    bagNumber: Number,
    donorId: String,
    seekerId: String,
    location: String,
    date: {type: Date, default: Date.now},
    type: String
});

module.exports = mongoose.model("blood",bloodSchema);