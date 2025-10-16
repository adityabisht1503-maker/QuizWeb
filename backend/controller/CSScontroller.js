const { CSSmodel } = require("../model/CSSmodel")




let insertCSS=(req,res)=>{
 let   {question,option,correctAnswer}= req.body
 let quiz = new CSSmodel({
  question,
  option,
  correctAnswer
 })
 quiz.save()
 res.send({status:1,message:"completed"})
}

let CSSlist = async(req,res)=>{

  let  quiz =await CSSmodel.find()
  res.send({status:1,message:"quiz list",quiz})




}


module.exports={insertCSS,CSSlist}