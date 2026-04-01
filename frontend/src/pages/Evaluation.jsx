import React, { useState, useEffect } from "react";

const Evaluation = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skills, setSkills] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sections = ["aptitude", "logical", "verbal"];

  // 🌗 LOAD THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // 🌗 TOGGLE
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      root.classList.contains("dark") ? "dark" : "light"
    );
  };

  // QUESTIONS (5 EACH)
  const questions = {
    aptitude: [
      { q: "2+2?", options: ["3", "4", "5"], answer: "4" },
      { q: "10% of 200?", options: ["10", "20", "30"], answer: "20" },
      { q: "5*5?", options: ["20", "25", "30"], answer: "25" },
      { q: "Square of 6?", options: ["30", "36", "40"], answer: "36" },
      { q: "Half of 50?", options: ["20", "25", "30"], answer: "25" }
    ],
    logical: [
      { q: "All A are B. Some B are C?", options: ["Yes", "No"], answer: "Yes" },
      { q: "Odd one: Cat, Dog, Car", options: ["Car", "Dog"], answer: "Car" },
      { q: "Pattern: 2,4,8?", options: ["16", "12"], answer: "16" },
      { q: "Sun rises from?", options: ["East", "West"], answer: "East" },
      { q: "1,3,5?", options: ["7", "8"], answer: "7" }
    ],
    verbal: [
      { q: "Synonym of fast?", options: ["Quick", "Slow"], answer: "Quick" },
      { q: "Antonym of big?", options: ["Small", "Huge"], answer: "Small" },
      { q: "Correct word?", options: ["Recieve", "Receive"], answer: "Receive" },
      { q: "Meaning of 'clear'?", options: ["Clean", "Dirty"], answer: "Clean" },
      { q: "Good means?", options: ["Bad", "Nice"], answer: "Nice" }
    ]
  };

  const currentSection = sections[sectionIndex];
  const currentQ = questions[currentSection][questionIndex];

  const selectOption = (val) => {
    setAnswers({
      ...answers,
      [`${currentSection}-${questionIndex}`]: val
    });
  };

  const next = () => {
    if (questionIndex < 4) {
      setQuestionIndex(questionIndex + 1);
    } else if (sectionIndex < 2) {
      setSectionIndex(sectionIndex + 1);
      setQuestionIndex(0);
    } else {
      setSectionIndex(3); // go to form
    }
  };

  const calculateResult = () => {
    let score = 0;
    let total = 15;

    Object.keys(questions).forEach((sec) => {
      questions[sec].forEach((q, i) => {
        if (answers[`${sec}-${i}`] === q.answer) score++;
      });
    });

    const percent = (score / total) * 100;

    let status = "";
    if (percent >= 75 && skills && company) status = "READY ✅";
    else if (percent >= 50) status = "ALMOST READY ⚠️";
    else status = "NOT READY ❌";

    return { score, percent, status };
  };

  // RESULT
  if (submitted) {
    const res = calculateResult();

    return (
      <div style={styles.page}>
        <Navbar toggleTheme={toggleTheme} />
        <div style={styles.card}>
          <h1>{res.status}</h1>
          <p>Score: {res.score}/15</p>
          <p>{res.percent.toFixed(1)}%</p>
          <p>Skills: {skills}</p>
          <p>Company: {company}</p>
        </div>
      </div>
    );
  }

  // FORM AFTER QUESTIONS
  if (sectionIndex === 3) {
    return (
      <div style={styles.page}>
        <Navbar toggleTheme={toggleTheme} />

        <div style={styles.card}>
          <h2>Final Details</h2>

          <input
            placeholder="Enter your skills"
            onChange={(e) => setSkills(e.target.value)}
            style={styles.input}
          />

          <select onChange={(e) => setCompany(e.target.value)} style={styles.input}>
            <option value="">Select Company Type</option>
            <option>Product</option>
            <option>Service</option>
            <option>Startup</option>
          </select>

          <button onClick={() => setSubmitted(true)} style={styles.btn}>
            Get Result
          </button>
        </div>
      </div>
    );
  }

  // QUESTIONS UI
  return (
    <div style={styles.page}>
      <Navbar toggleTheme={toggleTheme} />

      <div style={styles.card}>
        <h3>{currentSection.toUpperCase()}</h3>
        <p>{currentQ.q}</p>

        {currentQ.options.map((opt) => (
          <button
            key={opt}
            onClick={() => selectOption(opt)}
            style={{
              ...styles.option,
              background:
                answers[`${currentSection}-${questionIndex}`] === opt
                  ? "#2563eb"
                  : "#e5e7eb"
            }}
          >
            {opt}
          </button>
        ))}

        <button onClick={next} style={styles.btn}>
          Next
        </button>
      </div>
    </div>
  );
};

// NAVBAR
const Navbar = ({ toggleTheme }) => (
  <div style={styles.nav}>
    <h2>🚀 MyApp</h2>
    <div>
      <button onClick={toggleTheme}>🌙</button>
      <span style={styles.avatar}>M</span>
    </div>
  </div>
);

// STYLES
const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)"
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    background: "var(--card)"
  },
  card: {
    padding: "2rem",
    margin: "2rem",
    background: "var(--card)"
  },
  option: {
    display: "block",
    margin: "10px",
    padding: "10px"
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#16a34a",
    color: "#fff"
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "10px"
  },
  avatar: {
    marginLeft: "10px",
    background: "#2563eb",
    color: "#fff",
    padding: "8px",
    borderRadius: "50%"
  }
};

export default Evaluation;