let mongoose = require("mongoose")

const quizschema = mongoose.Schema({
  Quizname: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 4;
        },
        message: 'Each question must have exactly 4 options'
      }
    },
    correctAnswer: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

let Custommodel = mongoose.model("customquiz", quizschema)

module.exports = {Custommodel}