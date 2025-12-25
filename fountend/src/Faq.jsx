// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { useEffect } from "react";

const Faq = () => {
  useEffect(() => {
    document.title = "FAQ | Quiz App"; // Optional page title
  }, []);

  return (
    <main className="d-flex justify-content-center align-items-start py-5 bg-light min-vh-100">
      <div
        className="accordion accordion-flush shadow-sm bg-white rounded-4 p-4 border border-2"
        id="accordionFlushExample"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>

        <div className="accordion-item mb-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              1. What is this quiz app about?
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Our quiz app allows users to test their knowledge on various topics
              like science, math, history, general knowledge, and more. It’s
              designed for both fun and learning.
            </div>
          </div>
        </div>

        <div className="accordion-item mb-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              2. Do I need an account to play quizzes?
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              It depends on the app configuration: <br />
              ✅ Yes, if you want to track your progress, scores, and
              achievements. <br />
              ❌ No, if you're just playing as a guest (but your results won't be
              saved).
            </div>
          </div>
        </div>

        <div className="accordion-item mb-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              3. How are the quiz questions selected?
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Questions are either:
              <ul>
                <li>Randomly selected from a large question bank</li>
                <li>Sorted by category or difficulty</li>
                <li>Custom-generated for special events or challenges</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item mb-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
            >
              4. Can I create my own quizzes?
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              (If your app supports it) <br />
              Yes! Registered users can create and share custom quizzes with
              others.
            </div>
          </div>
        </div>

        <div className="accordion-item mb-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseFive"
            >
              5. How is the score calculated?
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Scoring is typically based on:
              <ul>
                <li>Correct answers</li>
                <li>Speed/time taken</li>
                <li>Bonus points for streaks or difficulty levels</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item mb-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSix"
              aria-expanded="false"
              aria-controls="flush-collapseSix"
            >
              6. Is there a time limit for each question?
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Yes, most quizzes have a time limit per question (e.g. 30 seconds)
              to keep it challenging. Some practice modes may not have a time
              limit.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Faq;
