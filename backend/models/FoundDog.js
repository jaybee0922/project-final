const mongoose = require("mongoose");

const foundDogSchema = new mongoose.Schema({
  petId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  breed: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String },
  imagePath: { type: String }, // Store the path to the image file
  createdAt: { type: Date, default: Date.now },
  isNew: { type: Boolean, default: true },
  postType: { type: String, default: 'found' } // New field for notification
});

const FoundDog = mongoose.model("FoundDog", foundDogSchema);
module.exports = FoundDog;
