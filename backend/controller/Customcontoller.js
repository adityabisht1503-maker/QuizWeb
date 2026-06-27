const { Custommodel } = require("../model/Custommodel");



// Save quiz
let customadd = async (req, res) => {
  try {
    const { Name,quizName, questions } = req.body;
    
    const newQuiz = new Custommodel({
      Name:Name,
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

let deletequiz = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Quiz ID is required" });
    }

    const quiz = await Custommodel.findByIdAndDelete(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({
      message: "Quiz deleted successfully",
     
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting quiz",
      error: error.message
    });
  }
};
module.exports={customadd,Customquizlist,deletequiz}