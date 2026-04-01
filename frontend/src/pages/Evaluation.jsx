import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";
import ProjectLogo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [completed, setCompleted] = useState({});
  const [scores, setScores] = useState({});
  const [interest, setInterest] = useState("");
  const [company, setCompany] = useState("");

  // 🌙 Load Theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // 🌗 Toggle Theme
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const theme = {
    light: {
      bg: "#f1f5f9",
      card: "#ffffff",
      text: "#0f172a",
      sub: "#64748b",
      border: "#e2e8f0",
      primary: "#4f46e5"
    },
    dark: {
      bg: "#020617",
      card: "#1e293b",
      text: "#f1f5f9",
      sub: "#94a3b8",
      border: "#334155",
      primary: "#6366f1"
    }
  };

  const t = darkMode ? theme.dark : theme.light;

  const sections = ["Aptitude", "Logical", "Verbal", "Technical"];

  // 🧠 Question Bank (Scenario-based improved)
  const questionBank = {
    Aptitude: [
      {
        q: "A company reduces its daily production of 500 units by 20% due to maintenance. What is the new production?",
        options: ["400", "420", "450", "380"],
        ans: "400"
      },
      {
        q: "A delivery van travels 60 km/hr for 3 hours. How far does it go?",
        options: ["180", "150", "200", "120"],
        ans: "180"
      },
      {
        q: "You invest ₹800 and earn ₹200 profit. What is your profit percentage?",
        options: ["25%", "20%", "30%", "40%"],
        ans: "25%"
      },
      {
        q: "A loan of ₹1000 at 10% simple interest for 2 years gives how much interest?",
        options: ["200", "100", "300", "400"],
        ans: "200"
      },
      {
        q: "If x = 2, what is x² + 2x?",
        options: ["8", "6", "10", "12"],
        ans: "8"
      }
    ],

    Logical: [
      {
        q: "All developers are testers. Some testers are managers. Which is correct?",
        options: ["Some developers may be managers", "All developers are managers", "None", "All testers are developers"],
        ans: "Some developers may be managers"
      },
      {
        q: "Find next number: 2, 4, 8, 16, ?",
        options: ["32", "24", "20", "18"],
        ans: "32"
      },
      {
        q: "Odd one out: Apple, Mango, Carrot",
        options: ["Carrot", "Apple", "Mango", "None"],
        ans: "Carrot"
      },
      {
        q: "Mirror image of LEFT?",
        options: ["TFEL", "LEFT", "FLET", "None"],
        ans: "TFEL"
      },
      {
        q: "If A > B and B > C, then?",
        options: ["A > C", "C > A", "A = B", "None"],
        ans: "A > C"
      }
    ],

    Verbal: [
      {
        q: "The project was executed seamlessly. What does 'seamlessly' mean?",
        options: ["Without problems", "Slowly", "Poorly", "Incomplete"],
        ans: "Without problems"
      },
      {
        q: "Opposite of 'Strong'?",
        options: ["Weak", "Hard", "Solid", "Big"],
        ans: "Weak"
      },
      {
        q: "Choose correct: She ___ going to office.",
        options: ["is", "are", "am", "be"],
        ans: "is"
      },
      {
        q: "Meaning of Rapid?",
        options: ["Fast", "Slow", "Late", "Stop"],
        ans: "Fast"
      },
      {
        q: "Execute means?",
        options: ["Perform", "Stop", "Cancel", "Break"],
        ans: "Perform"
      }
    ],

    Technical: [
      {
        q: "You are writing a system program. Which language is most suitable?",
        options: ["C", "HTML", "CSS", "SQL"],
        ans: "C"
      },
      {
        q: "Which concept does Java follow?",
        options: ["OOP", "Procedural", "Markup", "Functional"],
        ans: "OOP"
      },
      {
        q: "Operating system manages?",
        options: ["Hardware", "Memory", "Processes", "All"],
        ans: "All"
      },
      {
        q: "TCP belongs to which layer?",
        options: ["Transport", "Network", "Physical", "Data Link"],
        ans: "Transport"
      },
      {
        q: "RAM is?",
        options: ["Temporary memory", "Permanent memory", "External", "None"],
        ans: "Temporary memory"
      }
    ]
  };

  const startTest = (section) => {
    setActiveSection(section);
    setQuestions(questionBank[section]);
    setAnswers({});
  };

  const submitSection = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.ans) score++;
    });

    setScores(prev => ({ ...prev, [activeSection]: score }));
    setCompleted(prev => ({ ...prev, [activeSection]: true }));
    setActiveSection(null);
  };

  const finalSubmit = () => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const percent = (total / (sections.length * 5)) * 100;

    let status =
      percent >= 75 ? "READY ✅" :
      percent >= 50 ? "ALMOST READY ⚠️" :
      "NOT READY ❌";

    navigate("/result", {
      state: {
        totalScore: total,
        aptitudeScore: scores.Aptitude || 0,
        logicalScore: scores.Logical || 0,
        communicationScore: scores.Verbal || 0,
        technicalScore: scores.Technical || 0,
        status,
        interest,
        companyPreference: company
      }
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>

      {/* NAVBAR */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem 2rem" }}>
        <ProjectLogo />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={toggleTheme}>
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
          <SidebarMenu color={t.text} />
        </div>
      </nav>

      <div style={{
        maxWidth: "900px",
        width: "100%",
        margin: "auto",
        padding: "2rem"
      }}>

        {/* QUESTIONS */}
        {activeSection && (
          <>
            <h2>{activeSection} Test</h2>

            {questions.map((q, i) => (
              <div key={i} style={{
                margin: "1rem 0",
                padding: "1rem",
                background: t.card,
                borderRadius: "10px"
              }}>
                <p style={{
                  lineHeight: "1.5",
                  wordBreak: "break-word"
                }}>{q.q}</p>

                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [i]: opt })}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      margin: "6px 0",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "none",
                      background:
                        answers[i] === opt
                          ? t.primary
                          : (darkMode ? "#334155" : "#e2e8f0"),
                      color: answers[i] === opt ? "#fff" : t.text
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}

            <button
              onClick={submitSection}
              style={{
                background: "green",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                width: "100%"
              }}
            >
              Submit Section ✅
            </button>
          </>
        )}

        {/* MAIN UI */}
        {!activeSection && (
          <>
            <h1>Assessment</h1>

            {sections.map(sec => (
              <div key={sec} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                margin: "10px 0",
                background: t.card,
                borderRadius: "10px"
              }}>
                <h3>{sec}</h3>

                <button
                  onClick={() => startTest(sec)}
                  style={{
                    background: completed[sec] ? "green" : "red",
                    color: "#fff",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px"
                  }}
                >
                  {completed[sec] ? "Completed ✅" : "Take Test"}
                </button>
              </div>
            ))}

            {/* INTEREST */}
            <input
              placeholder="Enter your interest (ML, Web Dev...)"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "20px",
                borderRadius: "8px",
                border: `1px solid ${t.border}`,
                background: t.card,
                color: t.text
              }}
            />

            {/* COMPANY */}
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "8px",
                border: `1px solid ${t.border}`,
                background: t.card,
                color: t.text
              }}
            >
              <option value="">Select Company Type</option>
              <option>Product</option>
              <option>Service</option>
              <option>Startup</option>
            </select>

            <button
              onClick={finalSubmit}
              style={{
                marginTop: "20px",
                width: "100%",
                background: t.primary,
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                border: "none"
              }}
            >
              Final Submit →
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Evaluation;