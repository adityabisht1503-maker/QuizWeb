const { Custommodel } = require("../model/Custommodel");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.KEY);

const Aiadd = async (req, res) => {
  try {
    const { Name ,quizName, questions } = req.body;

    // ✅ Correct validation
    if (!Name || !quizName || !questions) {
      return res.status(400).json({
        success: false,
        error: "Quiz name and question count are required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });

    const prompt = `
You are an expert quiz generator.

Create a quiz in STRICT JSON format that can be directly saved into a MongoDB database.

Rules:
- Quizname must be based on the provided topic.
- Generate EXACTLY the number of questions specified.
- Each question must have 4 options.
- Only ONE option must be the correctAnswer.
- correctAnswer MUST exactly match one of the options.
- Do NOT include explanations.
- Do NOT include markdown.
- Do NOT include extra text outside JSON.

JSON FORMAT (must match exactly):

{
  "quizname": "<quiz topic>",
  "questions": [
    {
      "question": "<question text>",
      "options": [
        "<option 1>",
        "<option 2>",
        "<option 3>",
        "<option 4>"
      ],
      "correctAnswer": "<one of the options>"
    }
  ]
}

Quiz Topic: "${quizName}"
Number of Questions: ${questions}
`;

    // ✅ Generate AI content
    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    let quizData;

    // ✅ Safe JSON parsing
    try {
      quizData = JSON.parse(aiText);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "AI returned invalid JSON format",
      });
    }

    // ✅ Save AI quiz to DB
    const newQuiz = await Custommodel.create({
      Name:Name,
      Quizname: quizData.quizname,
      questions: quizData.questions,

    });
     req.user.analysisCount += 1;
    await req.user.save();

    return res.json({
      status: 1,
      data: newQuiz,
    });

  } catch (error) {
    console.error("AI Quiz Error:", error);
    res.status(500).json({
      status: 0,
      error: "Failed to generate AI quiz",
    });
  }
};

module.exports = { Aiadd };
