const { quizmodel2 } = require("../model/DBmodel")




let insertDB=(req,res)=>{
 let   {question,option,correctAnswer}= req.body
 let quiz = new quizmodel2({
  question,
  option,
  correctAnswer
 })
 quiz.save()
 res.send({status:1,message:"completed"})
}

let quizDb = async(req,res)=>{

  let  quiz =await quizmodel2.find()
  res.send({status:1,message:"quiz list",quiz})




}


module.exports={insertDB,quizDb}