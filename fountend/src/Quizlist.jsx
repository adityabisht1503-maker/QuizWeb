import { useEffect, useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Quizlist = ()=>{

  const navigate = useNavigate()
  
  const [quiz, setquiz] = useState([])

  const handleclick=()=>{
   navigate('/osquiz')
  }
  const handleclick1=()=>{
        navigate('/dbquiz')
  }
  const handleclick2=()=>{
    navigate('/htmlquiz')
  }
  const handleclick3=()=>{
        navigate('/cssquiz')
  }
  
  return (
    <>
      <style>{`
        /* Remove default body margin */
        body {
          margin: 0;
          padding: 0;
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
            <img src="/CSS.png" className="card-img-top" alt="JavaScript" />
            <div className="quiz-card-img-overlay">
              <div className="overlay-icon">⚡</div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">Javascript</h5>
            <p className="card-text">
              🧠 Test Your JS Knowledge: 10 Quick Questions!
            </p>
            <button onClick={handleclick3} className="quiz-btn">🚀 Let's Go</button>
          </div>
        </div>
      </main>
    </>
  );
}
export default Quizlist