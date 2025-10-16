const { quizmodel } = require("../model/quiz.model")



let insertquiz=(req,res)=>{
 let   {question,option,correctAnswer}= req.body
 let quiz = new quizmodel({
  question,
  option,
  correctAnswer
 })
 quiz.save()
 res.send({status:1,message:"completed"})
}

let quizlist = async(req,res)=>{

  let  quiz =await quizmodel.find()
  res.send({status:1,message:"quiz list",quiz})




}


module.exports={insertquiz,quizlist} 