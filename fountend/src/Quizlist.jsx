import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

const Quizlist = () => {
  const navigate = useNavigate();
  const [customQuizzes, setCustomQuizzes] = useState([]);
  const [proPeriod, setproPeriod] = useState(null)
       
   const {plan}= useSelector((state)=>state.auth)
  const getRemainingDays = (proPeriod) => {
  if (!proPeriod) return null;

  const start = new Date(proPeriod);
  const today = new Date();

  start.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);

  const daysUsed =
    (today.getTime() - start.getTime()) /
    (1000 * 60 * 60 * 24);

  const remaining = 30 - Math.floor(daysUsed);

  return remaining > 0 ? remaining : 0;
};

  const handleclick = () => {
    navigate('/osquiz');
  };
  const handleclick1 = () => {
    navigate('/dbquiz');
  };
  const handleclick2 = () => {
    navigate('/htmlquiz');
  };
  const handleclick3 = () => {
    navigate('/cssquiz');
  };
  const Custom = () => {
    navigate('/Customquiz');
  };
  const Aiquiz = () => {
    navigate('/Aiquiz');
  };


const expirydate = async () => {
  try {
    const res = await api.get(
      "/api/expiry",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setproPeriod(res.data.Properiod);

  } catch (error) {
    console.error("Error fetching expiry date:", error);
  }
};
  // Fetch all custom quizzes with full data
  const fetchquiz = () => {
    api
      .get("/ct/list")
      .then((res) => {
        setCustomQuizzes(res.data.quiz); // ✅ Store full quiz objects
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchquiz();
    expirydate();
  }, []);

  const handleUpgrade=()=>{
    navigate("/premium")
  }

const handledelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You really want to delete this quiz?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await api.post("/ct/customdelete", { id });
        console.log(id);
        

        Swal.fire({
          text: "Delete Successfully",
          icon: "success",
        });

        
        setCustomQuizzes((prev) =>
          prev.filter((quiz) => quiz._id !== id)
        );
      } catch (err) {
        Swal.fire({
          text: "Failed to delete quiz",
          icon: "error",
        });
      }
    }
  });
};



  return (
    <>
      <style>{`
        /* Remove default body margin */
        body {
          margin: 0;
          padding: 0;
        }
          .quiz-card {
  animation: float 3s ease-in-out infinite;
}

.quiz-card:nth-child(even) {
  animation-delay: 0.6s;
}

.quiz-card:nth-child(odd) {
  animation-delay: 1.2s;
}

.quiz-card:hover {
  animation: none;
}


        .mar {
          min-height: 100vh;
          padding: 3rem 1rem;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .quiz-card {
          width: 18rem;
          border: none;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: white;
          position: relative;
        }

        .quiz-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .quiz-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .quiz-card:hover::before {
          transform: scaleX(1);
        }

        .quiz-card-img-wrapper {
          position: relative;
          overflow: hidden;
          height: 200px;
        }

        .quiz-card .card-img-top {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .quiz-card:hover .card-img-top {
          transform: scale(1.15) rotate(2deg);
        }

        .quiz-card-img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quiz-card:hover .quiz-card-img-overlay {
          opacity: 1;
        }

        .overlay-icon {
          font-size: 3rem;
          color: white;
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .quiz-card:hover .overlay-icon {
          transform: scale(1);
        }

        .quiz-card .card-body {
          padding: 1.5rem;
        }

        .quiz-card .card-title {
          font-weight: 700;
          font-size: 1.5rem;
          color: #2d3748;
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }

        .quiz-card:hover .card-title {
          color: #667eea;
        }

        .quiz-card .card-text {
          color: #718096;
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }

        .quiz-btn {
          width: 100%;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .quiz-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .quiz-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .quiz-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .quiz-btn:active {
          transform: translateY(0);
        }

        .custom-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(245, 87, 108, 0.3);
          z-index: 10;
        }

        .coming-soon-ribbon {
          position: absolute;
          top: 15px;
          right: -10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          z-index: 10;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .quiz-card:nth-child(1) {
          animation: float 3s ease-in-out infinite;
        }

        .quiz-card:nth-child(2) {
          animation: float 3s ease-in-out infinite 0.5s;
        }

        .quiz-card:nth-child(3) {
          animation: float 3s ease-in-out infinite 1s;
        }

        .quiz-card:nth-child(4) {
          animation: float 3s ease-in-out infinite 1.5s;
        }

        .quiz-card:hover {
          animation: none;
        }

        @media (max-width: 768px) {
          .mar {
            flex-direction: column;
          }
          
          .quiz-card {
            width: 100%;
            max-width: 350px;
          }
            
        }
      `}</style>

      <main className='d-flex gap-4 justify-content-center align-items-center mar flex-wrap'>
        {/* Pre-built quizzes */}
{proPeriod && (
  <div className="w-100 d-flex justify-content-center mb-3">
    <p className="pro-gradient shadow-sm px-4 py-2">
      ⏳ Plan expires in {getRemainingDays(proPeriod)} days
    </p>
  </div>
)}
         
        <div className="card quiz-card">
          <div className="quiz-card-img-wrapper">
            <img src="/1.jpg" className="card-img-top" alt="Operating System" />
            <div className="quiz-card-img-overlay">
              <div className="overlay-icon">💻</div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">Operating System</h5>
            <p className="card-text">
              🧠 Test Your OS Knowledge: 5 Quick Questions!
            </p>
            <button onClick={handleclick} className="quiz-btn">🚀 Let's Go</button>
          </div>
        </div>

        <div className="card quiz-card">
          <div className="quiz-card-img-wrapper">
            <img src="/dbms.jpeg" className="card-img-top" alt="DBMS" />
            <div className="quiz-card-img-overlay">
              <div className="overlay-icon">🗄️</div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">DBMS</h5>
            <p className="card-text">
              💻 Boot Up Your Brain: OS Quiz Time!
            </p>
            <button onClick={handleclick1} className="quiz-btn">🚀 Let's Go</button>
          </div>
        </div>

        <div className="card quiz-card">
          <div className="quiz-card-img-wrapper">
            <img src="/HTML.png" className="card-img-top" alt="HTML" />
            <div className="quiz-card-img-overlay">
              <div className="overlay-icon">🌐</div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">HTML</h5>
            <p className="card-text">
              🧠 Test Your HTML Knowledge: 10 Quick Questions!
            </p>
            <button onClick={handleclick2} className="quiz-btn">🚀 Let's Go</button>
          </div>
        </div>

        <div className="card quiz-card">
          <div className="quiz-card-img-wrapper">
            <img src="/CSS.png" className="card-img-top" alt="CSS" />
            <div className="quiz-card-img-overlay">
              <div className="overlay-icon">⚡</div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">CSS</h5>
            <p className="card-text">
              🧠 Test Your CSS Knowledge: 10 Quick Questions!
            </p>
            <button onClick={handleclick3} className="quiz-btn">🚀 Let's Go</button>
          </div>
        </div>

        {/* Custom quizzes - dynamically render each with unique ID */}
        {customQuizzes.map(quiz => (
          <div className="card quiz-card" key={quiz._id}>
            

            <div className="quiz-card-img-wrapper">
              <img
  src={
    quiz.Name === "AI"
      ? "/bittu.webp"
      : quiz.Name === "CUSTOM"
      ? "/custom1.png"
      : "/quiz-cover.webp"
  }
  className="card-img-top"
  alt={quiz.Quizname}
/>

              <div className="quiz-card-img-overlay">
                <div className="overlay-icon">🎯</div>
              </div>
    <button
  className="close-btn"
onClick={() => handledelete(quiz._id)}  style={{ color: "red" }}
>
  ✖
</button>
              <div className="custom-badge">{quiz.Name==="AI"?"Ai":"Custom"}</div>
              
            </div>
            <div className="card-body">
              <h5 className="card-title">{quiz.Quizname}</h5>
              <p className="card-text">
                🧠 {quiz.questions.length} Questions • Test your knowledge!
              </p>
              <button 
                onClick={() => navigate(`/Custom/${quiz._id}`)} 
                className="quiz-btn"
              >
                🚀 Let's Go
              </button>
            </div>
          </div>
        ))}

        {/* Create Custom Quiz Card */}
        <div className="card quiz-card">
          <div className="quiz-card-img-wrapper">
            <img src="/custom.webp" className="card-img-top" alt="Custom Quiz" />
            <div className="quiz-card-img-overlay">
              <div className="overlay-icon">✨</div>
            </div>
            <div className="custom-badge">Your Creation</div>
          </div>
          <div className="card-body">
            <h5 className="card-title">🎨 Custom Quiz</h5>
            <p className="card-text">
              Design your own quiz with personalized questions and topics!
            </p>
            <button onClick={Custom} className="quiz-btn">
              <span>🚀</span>
              <span>Create Now</span>
              <span>→</span>
            </button>
          </div>
        </div>
{/* Create Ai Quiz  */}
        <div className="card quiz-card">
  <div className="quiz-card-img-wrapper">
    <img
      src="/aii.webp"
      className="card-img-top"
      alt="AI Powered Quiz Builder"
    />

    <div className="quiz-card-img-overlay">
      <div className="overlay-icon">🤖</div>
    </div>

    <div className="custom-badge">AI Powered</div>
  </div>

  <div className="card-body">
    <h5 className="card-title">🧠 AI Quiz Builder</h5>

    <p className="card-text">
      Create smart, personalized quizzes instantly using AI.
      Choose topics, difficulty, and let Quizmaster  work.
    </p>

    <button onClick={Aiquiz} className="quiz-btn">
      <span>✨</span>
<span>Build Quiz</span>      <span>→</span>
    </button>
  </div>
</div>

{plan === "Free" ? (
  <div className="card quiz-card premium pro-card">
    <div className="quiz-card-img-wrapper pro-card-img-wrapper">
      <div className="overlay-icon">👑</div>
      <div className="pro-badge">✦ Pro</div>
    </div>

    <div className="card-body text-center">
      <h5 className="card-title">
        Go <span>Pro</span>
      </h5>
      <p className="card-text">Unlock your full potential</p>

      <button
        className="btn-upgrade"
        onClick={handleUpgrade}
      >
        ✦ Upgrade Now
      </button>
    </div>
  </div>
) : null}


        {/* Coming Soon Card */}
        <div className="card quiz-card">
          <div className="quiz-card-img-wrapper">
            <img src="/comingsoon.png" className="card-img-top" alt="Coming Soon" />
            <div className="quiz-card-img-overlay">
              <div className="overlay-icon">✨</div>
            </div>
            <div className="coming-soon-ribbon">Coming Soon</div>
          </div>
          <div className="card-body">
            <h5 className="card-title">More Quizzes On The Way!</h5>
            <p className="card-text">
              🚀 New topics and challenges are being crafted just for you. Stay tuned!
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Quizlist;