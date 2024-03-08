require('dotenv').config();
const mongoose = require('mongoose');

exports.mongooseConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
    
        console.log("Connected successfully");
      } catch (error) {
        console.error("Connection error:", error);
      }
}
