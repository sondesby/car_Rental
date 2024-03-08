const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
  configname: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required :true
  },
  auth: {
    user : {
        type: String,
        required :true
    },
    password : {
        type: String,
        required :true
    }
  },
  name: {
    type: String,
    required : true
  }
});

module.exports = mongoose.model("Config", ConfigSchema);
