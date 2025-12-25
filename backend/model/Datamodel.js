const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  Quizname: {
    type: String,
    required: true
    
    
  },
  Name: {
    type: String,
    required: true,
    trim: true

  },
  Score: {
    type: Number,
    required: true,
    min: 0
  },
  
});
dataSchema.index({ Name: 1, Quizname: 1 }, { unique: true });

const DataModel = mongoose.model("Data", dataSchema);

module.exports = {DataModel};
