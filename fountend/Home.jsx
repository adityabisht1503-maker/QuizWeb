import { BookOpen, Trophy, Brain, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector} from "react-redux" 

const Home = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector(state=>state.auth)
  const handleStartQuiz = () => {
   {isLoggedIn ? navigate('/quizlist') : navigate('/login') }
  };

  const features = [
    {
      icon: Brain,
      title: "Multiple Categories",
      description: "Test your knowledge across various topics"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback on your answers"
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Monitor your improvement over time"
    }
  ];

  const gradientStyle = {
    background: 'linear-gradient(135deg, #f3e7f9 0%, #e3f2fd 50%, #e8eaf6 100%)',
    minHeight: '100vh'
  };

  const heroIconStyle = {
    background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
    borderRadius: '50%',
    padding: '1rem',
    display: 'inline-block'
  };

  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const featureIconStyle = {
    background: 'linear-gradient(135deg, #f3e7f9 0%, #e3f2fd 100%)',
    width: '56px',
    height: '56px',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const ctaStyle = {
    background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
    borderRadius: '1rem',
    padding: '3rem',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
  };

  return (
    <div style={gradientStyle}>
      <div className="container py-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <div className="d-flex justify-content-center mb-4">
            <div style={heroIconStyle}>
              <BookOpen size={64} color="white" />
            </div>
          </div>
          <h1 className="display-3 fw-bold mb-3" style={{color: '#1f2937'}}>
            Welcome to <span style={gradientTextStyle}>QuizMaster</span>
          </h1>
          <p className="lead mb-4 mx-auto" style={{maxWidth: '800px', color: '#4b5563'}}>
            Challenge yourself with engaging quizzes and expand your knowledge across multiple subjects
          </p>
         <button
            onClick={handleStartQuiz}
            className="btn btn-primary text-white"
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Start Quiz Now
          </button> 
        </div>

        {/* Features Section */}
        <div className="row g-4 mb-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm" style={{transition: 'box-shadow 0.3s'}}
                     onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'}
                     onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.1)'}>
                  <div className="card-body p-4">
                    <div style={featureIconStyle} className="mb-3">
                      <Icon size={28} color="#9333ea" />
                    </div>
                    <h3 className="h5 fw-semibold mb-2" style={{color: '#1f2937'}}>
                      {feature.title}
                    </h3>
                    <p className="mb-0" style={{color: '#6b7280'}}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className="card border-0 shadow-lg mb-5">
          <div className="card-body p-5">
            <h2 className="text-center display-6 fw-bold mb-5" style={{color: '#1f2937'}}>
              How It Works
            </h2>
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 rounded-circle" 
                     style={{width: '64px', height: '64px', backgroundColor: '#f3e7f9'}}>
                  <span className="h2 fw-bold mb-0" style={{color: '#9333ea'}}>1</span>
                </div>
                <h3 className="h5 fw-semibold mb-2" style={{color: '#1f2937'}}>Choose a Quiz</h3>
                <p style={{color: '#6b7280'}}>Select from various categories and difficulty levels</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 rounded-circle" 
                     style={{width: '64px', height: '64px', backgroundColor: '#dbeafe'}}>
                  <span className="h2 fw-bold mb-0" style={{color: '#2563eb'}}>2</span>
                </div>
                <h3 className="h5 fw-semibold mb-2" style={{color: '#1f2937'}}>Answer Questions</h3>
                <p style={{color: '#6b7280'}}>Test your knowledge with carefully crafted questions</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 rounded-circle" 
                     style={{width: '64px', height: '64px', backgroundColor: '#e0e7ff'}}>
                  <span className="h2 fw-bold mb-0" style={{color: '#4f46e5'}}>3</span>
                </div>
                <h3 className="h5 fw-semibold mb-2" style={{color: '#1f2937'}}>View Results</h3>
                <p style={{color: '#6b7280'}}>Get instant feedback and track your progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-white" style={ctaStyle}>
          <div className="text-center">
            <h2 className="display-6 fw-bold mb-3">Ready to Test Your Knowledge?</h2>
            <p className="lead mb-4" style={{opacity: '0.9'}}>
              Join thousands of learners improving their skills every day
            </p>
          <Link to="http://localhost:5173/login">  <button
              onClick={handleStartQuiz}
              className="btn btn-light fw-semibold"
              style={{padding: '0.75rem 2rem', fontSize: '1.1rem', color: '#9333ea', transition: 'all 0.2s'}}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = 'white';
              }}
            >
              Get Started
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;