var mongoose = require("mongoose");

var bloodSchema = new mongoose.Schema({
    bagNumber: Number,
    donorId: String,
    seekerId: String,
    type: String
});

module.exports = mongoose.model("blood",bloodSchema);