var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
    id: String,
    password: String,
    name: String,
    email: String
});

module.exports = mongoose.model("admin",adminSchema);