const mongoose = require("mongoose");

const secretSchema = mongoose.Schema({
    name: { type: String, required: true },
    secretText: { type: String, required: true},
});

module.exports = mongoose.model("Secret", secretSchema);