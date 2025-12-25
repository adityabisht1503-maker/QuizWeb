import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Customquiz = () => {
  const [step, setStep] = useState('quizName'); // 'quizName', 'addQuestions', 'complete'
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate()
  const [error, setError] = useState('');
  const [createdQuizId, setCreatedQuizId] = useState(null);

  const handleQuizNameSubmit = () => {
    if (quizName.trim()) {
      setStep('addQuestions');
      setError('');
    } else {
      setError('Please enter a quiz name');
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.question.trim()) {
      setError('Please enter a question');
      return;
    }
    if (currentQuestion.options.some(opt => !opt.trim())) {
      setError('Please fill all options');
      return;
    }
    if (!currentQuestion.correctAnswer.trim()) {
      setError('Please select a correct answer');
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    });
    setError('');
  };

  const handleSubmitQuiz = async () => {
    if (questions.length === 0) {
      setError('Please add at least one question');
      return;
    }

    setLoading(true);
    setError('');

    // Format data for backend
    const quizData = {
      quizName: quizName,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer
      }))
    };

    try {
      const response = await fetch('http://localhost:3000/ct/customadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
      
      const data = await response.json();
      console.log('Quiz submitted successfully:', data);
      
      // Store the quiz ID from response
      if (data.quiz && data.quiz._id) {
        setCreatedQuizId(data.quiz._id);
      }
      
      setStep('complete');
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Error submitting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('quizName');
    setQuizName('');
    setQuestions([]);
    setCurrentQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    });
    setError('');
    setCreatedQuizId(null);
  };

  return (
    <div className="custom-quiz-container">
      {/* Quiz Name Step */}
      {step === 'quizName' && (
        <div className="quiz-step">
          <div className="step-header">
            <h2>🎨 Create Your Custom Quiz</h2>
            <p>Let's start by naming your quiz</p>
          </div>
          <div className="quiz-form">
            <div className="form-group">
              <label htmlFor="quizName">Quiz Name</label>
              <input
                type="text"
                id="quizName"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="e.g., Advanced JavaScript Quiz"
                className="form-input"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button onClick={handleQuizNameSubmit} className="btn-primary">
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Add Questions Step */}
      {step === 'addQuestions' && (
        <div className="quiz-step">
          <div className="step-header">
            <h2>📝 {quizName}</h2>
            <p>Questions added: {questions.length}</p>
          </div>

          <div className="question-form">
            <div className="form-group">
              <label htmlFor="question">Question</label>
              <textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                placeholder="Enter your question here"
                className="form-textarea"
                rows="3"
              />
            </div>

            <div className="options-grid">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={`option${index}`}>Option {index + 1}</label>
                  <input
                    type="text"
                    id={`option${index}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${index + 1}`}
                    className="form-input"
                  />
                </div>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor="correctAnswer">Correct Answer</label>
              <select
                id="correctAnswer"
                value={currentQuestion.correctAnswer}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                className="form-select"
              >
                <option value="">Select correct answer</option>
                {currentQuestion.options.map((option, index) => (
                  option && <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="button-group">
              <button onClick={handleAddQuestion} className="btn-secondary">
                ➕ Add Question
              </button>
              {questions.length > 0 && (
                <button onClick={handleSubmitQuiz} className="btn-primary" disabled={loading}>
                  {loading ? '⏳ Submitting...' : '✅ Submit Quiz'}
                </button>
              )}
            </div>
          </div>

          {/* Questions List */}
          {questions.length > 0 && (
            <div className="questions-list">
              <h3>Added Questions:</h3>
              {questions.map((q, index) => (
                <div key={index} className="question-item">
                  <h4>Q{index + 1}: {q.question}</h4>
                  <ul className="options-list">
                    {q.options.map((opt, i) => (
                      <li key={i} className={opt === q.correctAnswer ? 'correct' : ''}>
                        {opt} {opt === q.correctAnswer && '✓'}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Complete Step */}
      {step === 'complete' && (
        <div className="quiz-step complete-step">
          <div className="success-icon">🎉</div>
          <h2>Quiz Created Successfully!</h2>
          <p>Your quiz "{quizName}" has been submitted with {questions.length} questions.</p>
          
          <div className="button-group">
            {createdQuizId && (
              <button 
                onClick={() => navigate(`/Custom/${createdQuizId}`)} 
                className="btn-primary chhh"
              >
                🚀 Start Quiz
              </button>
            )}
            <button onClick={handleReset} className="btn btn-success ch">
  <span className="plus-icon">➕</span> Create Another Quiz
</button>

            <button 
              onClick={() => navigate('/quizlist')}
              className="btn-secondary chhh"
            >
              📚 More Quizzes
            </button>
          </div>
        </div>
      )}

      <style>{`


.chhhh {
        width: 233px;
        }

        .custom-quiz-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
 
        .quiz-step {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .step-header {
          text-align: center;
          margin-bottom: 30px;
        }
          .ch {
  color: white; /* makes text + emoji white */
}

.plus-icon {
  font-size: 1.3rem;
  margin-right: 6px;
}
        .step-header h2 {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #333;
        }

        .step-header p {
          color: #666;
          font-size: 1rem;
        }

        .quiz-form {
          max-width: 500px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-textarea {
          resize: vertical;
        }

        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 20px 0;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 35px;
          margin-top: 30px;
        }

        .btn-primary,
        .btn-secondary {
          flex: 1;
          padding: 14px 28px;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #f5f5f5;
          color: #333;
        }

        .btn-secondary:hover {
          background: #e0e0e0;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          margin: 15px 0;
          border-left: 4px solid #c33;
        }

        .questions-list {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid #e0e0e0;
        }

        .questions-list h3 {
          margin-bottom: 20px;
          color: #333;
        }

        .question-item {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 15px;
        }

        .question-item h4 {
          margin-bottom: 12px;
          color: #333;
        }

        .options-list {
          list-style: none;
          padding: 0;
        }

        .options-list li {
          padding: 8px 12px;
          margin: 5px 0;
          background: white;
          border-radius: 6px;
          border-left: 3px solid #ddd;
        }

        .options-list li.correct {
          border-left-color: #4caf50;
          background: #f1f8f4;
          font-weight: 600;
        }

        .complete-step {
          text-align: center;
          padding: 60px 40px;
        }

        .success-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .complete-step h2 {
          color: #4caf50;
          margin-bottom: 15px;
        }

        .complete-step p {
          color: #666;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .custom-quiz-container {
            padding: 10px;
          }

          .quiz-step {
            padding: 20px;
          }

          .options-grid {
            grid-template-columns: 1fr;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Customquiz;