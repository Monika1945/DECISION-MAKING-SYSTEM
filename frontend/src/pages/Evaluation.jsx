import React, { useState } from "react";

const Evaluation = () => {

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // SCENARIO BASED QUESTIONS
  const questions = [
    {
      section: "Aptitude",
      q: "A company produces 120 units per day. Due to maintenance, production decreases by 20% for 3 days. What is total production for these 3 days?",
      options: ["288", "300", "320", "360"],
      answer: "288"
    },
    {
      section: "Logical",
      q: "All developers are testers. Some testers are managers. Which statement is true?",
      options: [
        "All developers are managers",
        "Some developers may be managers",
        "No developer is a manager",
        "All managers are developers"
      ],
      answer: "Some developers may be managers"
    },
    {
      section: "Verbal",
      q: "Choose the correct meaning: 'The project was executed seamlessly.'",
      options: [
        "With difficulty",
        "Without problems",
        "Very slowly",
        "Incomplete"
      ],
      answer: "Without problems"
    }
  ];

  // HANDLE ANSWER
  const selectOption = (value) => {
    setAnswers({ ...answers, [step]: value });
  };

  // NEXT QUESTION
  const next = () => {
    if (step < questions.length - 1) setStep(step + 1);
  };

  // PREV QUESTION
  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  // SUBMIT
  const handleSubmit = () => {
    setSubmitted(true);
  };

  // CALCULATE RESULT
  const getResult = () => {
    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    const percent = (score / questions.length) * 100;

    let status = "";
    if (percent >= 75) status = "READY ✅";
    else if (percent >= 50) status = "ALMOST READY ⚠️";
    else status = "NOT READY ❌";

    return { score, percent, status };
  };

  // RESULT SCREEN
  if (submitted) {
    const res = getResult();

    return (
      <div style={styles.page}>
        <div style={styles.resultCard}>
          <h1>🎯 Evaluation Result</h1>

          <h2>{res.status}</h2>
          <p>Score: {res.score} / {questions.length}</p>
          <p>Percentage: {res.percent.toFixed(1)}%</p>

          <button onClick={() => window.location.reload()} style={styles.btn}>
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  const current = questions[step];

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h3>{current.section} Assessment</h3>

        <div style={styles.progress}>
          Question {step + 1} / {questions.length}
        </div>

        <p style={styles.question}>{current.q}</p>

        <div style={styles.options}>
          {current.options.map(opt => (
            <button
              key={opt}
              onClick={() => selectOption(opt)}
              style={{
                ...styles.optionBtn,
                background: answers[step] === opt ? "#2563eb" : "#f1f5f9",
                color: answers[step] === opt ? "#fff" : "#111"
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <div style={styles.nav}>
          <button onClick={prev} disabled={step === 0}>Prev</button>

          {step === questions.length - 1 ? (
            <button onClick={handleSubmit} style={styles.submit}>
              Submit Test
            </button>
          ) : (
            <button onClick={next}>Next</button>
          )}
        </div>

      </div>

    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
    fontFamily: "Inter"
  },

  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "1.5rem",
    width: "500px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  question: {
    marginTop: "1rem",
    fontSize: "1.1rem",
    fontWeight: "600"
  },

  options: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },

  optionBtn: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer"
  },

  nav: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between"
  },

  submit: {
    background: "#16a34a",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.5rem"
  },

  resultCard: {
    background: "#111",
    color: "#fff",
    padding: "3rem",
    borderRadius: "2rem",
    textAlign: "center"
  },

  btn: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "1rem",
    background: "#2563eb",
    color: "#fff"
  },

  progress: {
    fontSize: "0.8rem",
    color: "#6b7280"
  }
};

export default Evaluation;