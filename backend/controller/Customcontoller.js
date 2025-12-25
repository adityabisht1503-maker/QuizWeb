const { Custommodel } = require("../model/Custommodel");



// Save quiz
let customadd = async (req, res) => {
  try {
    const { quizName, questions } = req.body;
    
    const newQuiz = new Custommodel({
      Quizname: quizName,
      questions: questions
    });
    
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
let Customquizlist = async(req,res)=>{

  let  quiz =await Custommodel.find()
  res.send({status:1,message:"quiz list",quiz})




}
module.exports={customadd,Customquizlist}