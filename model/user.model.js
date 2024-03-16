const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    score: { type: Number, default: 0 }
})

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel