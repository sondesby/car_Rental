const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cin: {
    type: String, 
    unique: true, 
    required: true,
  },
  email: {
    type: String,
    unique: true, 
    required: true,
  },
  phone: {
    type: String,
    unique: true, 
    required: true,
  },
  city: {
    type: String, 
    required: true,
  },
  avatar: {
    type: String, 
  },
  birthdate: {
    type: String, 
    required: true,
  },
  role:{
    type: String,
    default : "user"
  },
  addedat: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
