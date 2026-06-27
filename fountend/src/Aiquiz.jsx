import { useState } from "react";
import { toast } from "react-toastify";
import api from "./api";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Aiquiz = () => {
  const [form, setForm] = useState({
    quizName: "",
    questionCount: "",
  });

  const [loading, setLoading] = useState(false);
const [quiz, setquiz] = useState(false)
  const { quizName, questionCount } = form;
    const [createdQuizId, setCreatedQuizId] = useState(null);
const navigate = useNavigate()

const{plan} = useSelector((state)=>state.auth )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const Name = "AI"
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quizName.trim()) {
      toast.error("Please enter a quiz name");
      return;
    }

    if (!questionCount || questionCount <= 0) {
      toast.error("Please enter a valid number of questions");
      return;
    }

    setLoading(true);

    try {
     const res = await api.post(
  "/ct/Aiadd",
  {
    Name: Name,
    quizName: quizName,
    questions: Number(questionCount),
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  }
);

          
           
      if (res.data?.status === 1) {
        toast.success("🎉 AI Quiz created successfully!");
        
      setCreatedQuizId(res.data.data._id);
      // Store the quiz ID from response
      
        setForm({ quizName: "", questionCount: "" });
        setquiz(true)
      } else {
        toast.error(res.data?.message || "Failed to create quiz");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
       console.log(Name,quizName,questionCount);
    } finally {
      setLoading(false);
    }
  };

  return (


   <>  
   
         
    {!quiz?(<><div className="container d-flex justify-content-center align-items-center mt-5">
     
      <div className="card shadow p-4" style={{ maxWidth: "720px", width: "100%" }}>
       {plan=="Free"?( <p className="text-muted text-center mb-5">
         1 free quiz daily
        </p>):( <p className="text-muted text-center mb-5">
         5  quiz daily
        </p>)} 
        <h4 className="text-center mb-3">🧠 AI Quiz Generator</h4>

        <p className="text-muted text-center mb-4">
          Create an AI-powered quiz by choosing a topic and number of questions.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Quiz Topic / Name</label>
            <input
              type="text"
              className="form-control"
              name="quizName"
              value={quizName}
              onChange={handleChange}
              placeholder="e.g. JavaScript Basics"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Questions</label>
            <input
              type="number"
              className="form-control"
              name="questionCount"
              value={questionCount}
              onChange={handleChange}
              placeholder="1-10"
              min="1"
              max="10"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Generating Quiz..." : "🚀 Generate Quiz"}
          </button>
          {loading && <Loader />}
        </form>
      </div>
    </div>
    </>):(<>   <center><div className="quiz-step complete-step m-5">
          <div className="success-icon">🎉</div>
          <h2>Quiz Created Successfully!</h2>
          <p>Your quiz "{quizName}" has been submitted with {questionCount.length} questions.</p>
          
          <div className="button-group">
            {createdQuizId && (
              <button 
                onClick={() => navigate(`/Custom/${createdQuizId}`)} 
                className="btn-primary chhh"
              >
                🚀 Start Quiz
              </button>
            )}
            <button onClick={()=>setquiz(false)} className="btn btn-success ch">
  <span className="plus-icon">➕</span> Create Another Quiz
</button>

            <button 
              onClick={() => navigate('/quizlist')}
              className="btn-secondary chhh"
            >
              📚 More Quizzes
            </button>
          </div>
        </div></center></>)}
    
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
    
</>   );


};

export default Aiquiz;
