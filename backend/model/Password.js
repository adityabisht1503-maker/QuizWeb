const mongoose = require("mongoose")

const passwordschema = mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // No duplicate emails
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Passwordmodel = mongoose.model("Login",passwordschema)

module.exports={Passwordmodel}
