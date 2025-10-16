import React, { useState } from 'react';
import Swal from 'sweetalert2';

const QuizRules = ({ onAccept }) => {
  const [agreed, setAgreed] = useState(false);

  const handleStart = () => {
    Swal.fire({
      title: 'Ready to start?',
      text: 'Please make sure you understand and agree to all the quiz rules.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Start Quiz',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
    }).then(result => {
      if (result.isConfirmed) onAccept();
    });
  };

  return (
    <main style={styles.container}>
      <article style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Terms & Conditions for Quiz</h1>
          <p style={styles.subtitle}>
            Kindly read the rules carefully before you proceed with the quiz.
          </p>
        </header>

        <section style={styles.rulesSection}>
          <h2 style={styles.sectionTitle}>1. General Instructions</h2>
          <ul style={styles.list}>
            <li>Do not switch tabs, open other applications, or leave the quiz window during the exam.</li>
            <li>Complete the quiz in a single uninterrupted session; no pausing or resuming later.</li>
            <li>Use only your own knowledge. Any assistance from others, books, or digital tools is prohibited.</li>
            <li>The quiz will enter full screen mode upon start and exiting full screen may lead to disqualification.</li>
            <li>Monitoring tools will track your activity to ensure compliance with these rules.</li>
          </ul>
        </section>

        <section style={styles.rulesSection}>
          <h2 style={styles.sectionTitle}>2. Technical Requirements</h2>
          <ul style={styles.list}>
            <li>Use a compatible modern web browser like Chrome, Firefox, Safari, or Edge.</li>
            <li>Ensure a stable internet connection for the entire duration of the quiz.</li>
            <li>JavaScript and cookies must be enabled in your browser settings.</li>
            <li>A screen resolution of at least 1024x768 pixels is recommended.</li>
          </ul>
        </section>

        <section style={styles.rulesSection}>
          <h2 style={styles.sectionTitle}>3. Consequences of Violations</h2>
          <p>
            Failure to adhere to any of the above terms may result in immediate termination of your quiz attempt, invalidation of your scores, or further disciplinary actions.
          </p>
        </section>

        <footer style={styles.footer}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={styles.checkbox}
            />
            I have read, understood, and agree to abide by the rules and conditions stated above.
          </label>

          <button
            onClick={handleStart}
            disabled={!agreed}
            style={{
              ...styles.button,
              backgroundColor: agreed ? '#004aad' : '#bbb',
              cursor: agreed ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.3s ease',
            }}
            aria-disabled={!agreed}
          >
            Proceed to Quiz
          </button>
        </footer>
      </article>
    </main>
  );
};

const styles = {
  container: {
    width: '70vw',       // 70% of viewport width
    maxWidth: 700,       // max width to keep it readable
    minWidth: 320,       // for smaller screens
    margin: '3rem auto',
    fontFamily: '"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#222',
    lineHeight: 1.75,
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: 6,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    padding: '2rem 2.5rem',
  },
  header: {
    marginBottom: '2rem',
    borderBottom: '2px solid #004aad',
    paddingBottom: '0.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '0.25rem',
    color: '#004aad',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    fontWeight: 500,
  },
  rulesSection: {
    marginBottom: '1.8rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#004aad',
    marginBottom: '0.75rem',
  },
  list: {
    paddingLeft: '1.2rem',
    color: '#333',
    fontSize: '1rem',
  },
  footer: {
    borderTop: '1px solid #ccc',
    paddingTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  checkboxLabel: {
    fontSize: '1rem',
    color: '#222',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  checkbox: {
    width: 20,
    height: 20,
    cursor: 'pointer',
  },
  button: {
    fontSize: '1.15rem',
    padding: '0.85rem',
    borderRadius: 5,
    border: 'none',
    color: 'white',
    fontWeight: 700,
    userSelect: 'none',
  },
};

export default QuizRules;
