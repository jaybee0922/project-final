const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" }, // Store the image path
}, { timestamps: true }); //-------------Date creation

module.exports = mongoose.model('User', userSchema);
