const { HTMLmodel } = require("../model/HTMLmodel")




let insertHMTL=(req,res)=>{
 let   {question,option,correctAnswer}= req.body
 let quiz = new HTMLmodel({
  question,
  option,
  correctAnswer
 })
 quiz.save()
 res.send({status:1,message:"completed"})
}

let HTMLlist = async(req,res)=>{

  let  quiz =await HTMLmodel.find()
  res.send({status:1,message:"quiz list",quiz})




}


module.exports={insertHMTL,HTMLlist}