import React, { useState, useEffect } from "react";

const Evaluation = () => {
  const [theme, setTheme] = useState("light");
  const [section, setSection] = useState("home");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // 🌗 THEME LOAD
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  // 🌗 TOGGLE
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");

    const newTheme = root.classList.contains("dark") ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // QUESTIONS
  const data = {
    aptitude: [
      {
        q: "A worker completes a job in 10 days. How many days for 2 workers?",
        options: ["5", "10", "20", "8"],
        answer: "5"
      }
    ],
    logical: [
      {
        q: "If all cats are animals, some animals are black, then:",
        options: [
          "All cats are black",
          "Some cats may be black",
          "No cats are black",
          "All animals are cats"
        ],
        answer: "Some cats may be black"
      }
    ],
    verbal: [
      {
        q: "Choose correct meaning: 'Efficient system'",
        options: ["Slow", "Working well", "Broken", "Old"],
        answer: "Working well"
      }
    ]
  };

  const currentQ = data[section]?.[step];

  const selectOption = (val) => {
    setAnswers({ ...answers, [section + step]: val });
  };

  const next = () => {
    if (step < data[section].length - 1) setStep(step + 1);
    else setSection("home");
  };

  const calculateResult = () => {
    let score = 0;
    let total = 0;

    Object.keys(data).forEach(sec => {
      data[sec].forEach((q, i) => {
        total++;
        if (answers[sec + i] === q.answer) score++;
      });
    });

    let percent = (score / total) * 100;

    let status = "";
    if (percent >= 75 && company && interest) status = "READY ✅";
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

        <div style={styles.result}>
          <h1>{res.status}</h1>
          <p>Score: {res.score}</p>
          <p>{res.percent.toFixed(1)}%</p>
          <p>Company: {company}</p>
          <p>Interest: {interest}</p>

          <button onClick={() => window.location.reload()}>
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  // TEST SCREEN
  if (section !== "home") {
    return (
      <div style={styles.page}>
        <Navbar toggleTheme={toggleTheme} />

        <div style={styles.card}>
          <h2>{section.toUpperCase()} Test</h2>

          <p>{currentQ.q}</p>

          {currentQ.options.map(opt => (
            <button
              key={opt}
              onClick={() => selectOption(opt)}
              style={{
                ...styles.option,
                background:
                  answers[section + step] === opt ? "#2563eb" : "#e5e7eb"
              }}
            >
              {opt}
            </button>
          ))}

          <button onClick={next}>Next</button>
        </div>
      </div>
    );
  }

  // HOME SCREEN
  return (
    <div style={styles.page}>
      <Navbar toggleTheme={toggleTheme} />

      <div style={styles.container}>
        <h1>Placement Assessment</h1>

        {/* Sections */}
        <div style={styles.grid}>
          {["aptitude", "logical", "verbal"].map(sec => (
            <div key={sec} style={styles.box}>
              <h3>{sec.toUpperCase()}</h3>
              <button onClick={() => { setSection(sec); setStep(0); }}>
                Take Test
              </button>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div style={styles.pref}>
          <h3>Company Preference</h3>
          <select onChange={(e) => setCompany(e.target.value)}>
            <option>Product</option>
            <option>Service</option>
            <option>Startup</option>
          </select>

          <h3>Interest / Skill</h3>
          <input
            placeholder="e.g AI / Web Dev"
            onChange={(e) => setInterest(e.target.value)}
          />
        </div>

        <button style={styles.submit} onClick={() => setSubmitted(true)}>
          Get Result
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
    padding: "1rem 2rem",
    background: "var(--card)"
  },

  avatar: {
    marginLeft: "10px",
    background: "#2563eb",
    color: "#fff",
    padding: "8px",
    borderRadius: "50%"
  },

  container: {
    padding: "2rem",
    textAlign: "center"
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem"
  },

  box: {
    padding: "1rem",
    background: "var(--card)",
    borderRadius: "10px"
  },

  card: {
    padding: "2rem",
    background: "var(--card)",
    margin: "2rem"
  },

  option: {
    display: "block",
    margin: "10px",
    padding: "10px"
  },

  pref: {
    marginTop: "2rem"
  },

  submit: {
    marginTop: "1rem",
    padding: "10px",
    background: "#16a34a",
    color: "#fff"
  },

  result: {
    textAlign: "center",
    marginTop: "3rem"
  }
};

export default Evaluation;