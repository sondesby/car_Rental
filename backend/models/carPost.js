const mongoose = require("mongoose");

const carPostSchema = new mongoose.Schema({
  photos: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  km: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },
  addedat: {
    type: Date,
    default: Date.now,
  },
  dispo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("carPost", carPostSchema);
