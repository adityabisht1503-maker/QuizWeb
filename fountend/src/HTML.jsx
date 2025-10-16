import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAntiCheat from "./Anticheat";
import Swal from "sweetalert2";
import Tabswitch from "./Tabswitch";
import QuizRules from "./Quizrules";

const HTML = () => {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
 const navigate = useNavigate()
     const [hasStarted, setHasStarted] = useState(false);

const cheat = ()=>{
  Swal.fire({
  title: "⚠️ Suspicious Activity Detected",
  text: "Your quiz will automatically submit",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "OK, Submit Quiz"
}).then((result) => {
  if (result.isConfirmed) {
      setShowResult(true); // show results immediately
    Swal.fire({
      title: "Quiz Submitted",
      text: "Your answers have been submitted due to a violation of quiz rules.",
      icon: "success"
    });
  }
});
}
Tabswitch(() => {
  Swal.fire({
    title: "Quiz Automatically Submitted",
   
    icon: "warning",
    confirmButtonText: "View Results",
    allowOutsideClick: false,
    allowEscapeKey: false
  }).then(() => {
    setShowResult(true);
  });
});

 useAntiCheat(() => {
    
  cheat()
});
    useEffect(() => {
    const fetchQuiz = () => {
      axios.get(`http://localhost:3000/html/list`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data.quiz);
          setQuiz(data.quiz);
        })
        .catch((error) => {
          console.error("Error fetching quiz:", error);
        });
    };
    fetchQuiz();
  }, []);
  const handlehome=()=>{
  navigate("/quizlist")
  }
  

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    // Store the answer
    const isCorrect = selectedAnswer === quiz[currentQuestion].correctAnswer;
    setAnswers([...answers, {
      question: quiz[currentQuestion].question,
      selected: selectedAnswer,
      correct: quiz[currentQuestion].correctAnswer,
      isCorrect: isCorrect
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

    if (!hasStarted) {
  return <QuizRules onAccept={() => setHasStarted(true)} />;
}
  if (quiz.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = ((score / quiz.length) * 100).toFixed(1);
    
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5 text-center">
                <h2 className="display-4 fw-bold mb-4">Quiz Completed! 🎉</h2>
                <div className="mb-4">
                  <h3 className="display-1 fw-bold" style={{color: percentage >= 70 ? '#198754' : percentage >= 50 ? '#ffc107' : '#dc3545'}}>
                    {percentage}%
                  </h3>
                  <p className="lead">
                    You scored {score} out of {quiz.length}
                  </p>
                </div>

                {/* Review Answers */}
                <div className="text-start mt-5">
                  <h4 className="fw-bold mb-4">Review Your Answers:</h4>
                  {answers.map((answer, index) => (
                    <div key={index} className={`card mb-3 border-${answer.isCorrect ? 'success' : 'danger'}`}>
                      <div className="card-body">
                        <h6 className="fw-bold mb-2">Q{index + 1}: {answer.question}</h6>
                        <p className="mb-1">
                          <span className="badge bg-secondary me-2">Your Answer:</span>
                          <span className={answer.isCorrect ? 'text-success' : 'text-danger'}>
                            {answer.selected || "Not answered"}
                          </span>
                        </p>
                        {!answer.isCorrect && (
                          <p className="mb-0">
                            <span className="badge bg-success me-2">Correct Answer:</span>
                            <span className="text-success">{answer.correct}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleRestart}
                  className="btn btn-primary btn-lg mt-4 px-5"
                >
                  Restart Quiz
                </button>
                 <div>
                <button 
                  onClick={handlehome}
                  className="btn btn-success btn-lg mt-4 px-5"
                >
                  More Quizs
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuiz = quiz[currentQuestion];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Question {currentQuestion + 1} of {quiz.length}</span>
              <span className="text-muted">Score: {score}/{quiz.length}</span>
            </div>
            <div className="progress" style={{height: '8px'}}>
              <div 
                className="progress-bar bg-primary" 
                role="progressbar" 
                style={{width: `${((currentQuestion + 1) / quiz.length) * 100}%`}}
                aria-valuenow={(currentQuestion + 1) / quiz.length * 100} 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h3 className="fw-bold mb-4" style={{color: '#1f2937'}}>
                {currentQuiz.question}
              </h3>

              {/* Options */}
              <div className="d-grid gap-3">
                {currentQuiz.option.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`btn btn-outline-primary text-start p-3 ${
                      selectedAnswer === option ? 'active' : ''
                    }`}
                    style={{
                      fontSize: '1.05rem',
                      transition: 'all 0.2s',
                      borderWidth: '2px'
                    }}
                  >
                    <span className="fw-semibold me-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <div className="mt-4 text-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="btn btn-primary btn-lg px-5"
                >
                  {currentQuestion + 1 === quiz.length ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HTML