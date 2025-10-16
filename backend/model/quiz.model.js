let mongoose = require("mongoose")

const quizschema = mongoose.Schema({
  question:{
    type:String,
    required:true
},
 option:{
     type:[String],
     required:true,
 },
 correctAnswer:{
type:String,
required:true
 }
})

let quizmodel = mongoose.model("question",quizschema)


module.exports={quizmodel}