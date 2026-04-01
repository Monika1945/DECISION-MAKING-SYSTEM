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

  const sections = ["Aptitude", "Logical", "Verbal", "Technical"];

  // 🌙 LOAD THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // 🌗 TOGGLE THEME
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // 👤 GET USER INITIAL
  const getUserInitial = () => {
    const email = localStorage.getItem("email");
    if (email && email.length > 0) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const theme = {
    light: {
      bg: "#f1f5f9",
      card: "#ffffff",
      text: "#0f172a",
      border: "#e2e8f0",
      primary: "#4f46e5"
    },
    dark: {
      bg: "#020617",
      card: "#1e293b",
      text: "#f1f5f9",
      border: "#334155",
      primary: "#6366f1"
    }
  };

  const t = darkMode ? theme.dark : theme.light;

  // 🧠 QUESTION BANK
  const questionBank = {
    Aptitude: [
      {
        q: "A company reduces 500 units by 20%. New production?",
        options: ["400", "420", "450", "380"],
        ans: "400"
      },
      {
        q: "Delivery travels 60km/hr for 3 hrs. Distance?",
        options: ["180", "150", "120", "200"],
        ans: "180"
      },
      {
        q: "Profit ₹200 on ₹800. Profit %?",
        options: ["25%", "20%", "30%", "40%"],
        ans: "25%"
      },
      {
        q: "SI on ₹1000 @10% for 2 yrs?",
        options: ["200", "100", "300", "400"],
        ans: "200"
      },
      {
        q: "If x=2, x²+2x?",
        options: ["8", "6", "10", "12"],
        ans: "8"
      }
    ],

    Logical: [
      {
        q: "All devs are testers. Some testers managers?",
        options: [
          "Some devs may be managers",
          "All devs managers",
          "None",
          "All testers devs"
        ],
        ans: "Some devs may be managers"
      },
      { q: "2,4,8,16,?", options: ["32", "24", "20", "18"], ans: "32" },
      {
        q: "Odd one: Apple, Mango, Carrot",
        options: ["Carrot", "Apple", "Mango", "None"],
        ans: "Carrot"
      },
      { q: "Mirror LEFT?", options: ["TFEL", "LEFT", "FLET", "None"], ans: "TFEL" },
      { q: "A>B, B>C?", options: ["A>C", "C>A", "A=B", "None"], ans: "A>C" }
    ],

    Verbal: [
      {
        q: "Seamlessly means?",
        options: ["Without problems", "Slow", "Bad", "Incomplete"],
        ans: "Without problems"
      },
      {
        q: "Opposite of Strong?",
        options: ["Weak", "Hard", "Big", "Solid"],
        ans: "Weak"
      },
      { q: "She ___ going.", options: ["is", "are", "am", "be"], ans: "is" },
      { q: "Rapid means?", options: ["Fast", "Slow", "Late", "Stop"], ans: "Fast" },
      { q: "Execute?", options: ["Perform", "Stop", "Cancel", "Break"], ans: "Perform" }
    ],

    Technical: [
      {
        q: "System programming language?",
        options: ["C", "HTML", "CSS", "SQL"],
        ans: "C"
      },
      {
        q: "Java is?",
        options: ["OOP", "Procedural", "Markup", "Functional"],
        ans: "OOP"
      },
      {
        q: "OS manages?",
        options: ["Hardware", "Memory", "Process", "All"],
        ans: "All"
      },
      {
        q: "TCP layer?",
        options: ["Transport", "Network", "DL", "Physical"],
        ans: "Transport"
      },
      {
        q: "RAM?",
        options: ["Temporary", "Permanent", "External", "None"],
        ans: "Temporary"
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
    const percent = (total / 20) * 100;

    navigate("/result", {
      state: { scores, total, percent, interest, company }
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>

      {/* 🔝 NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: `1px solid ${t.border}`
      }}>
        <ProjectLogo />

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          
          <button onClick={toggleTheme}>
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* 👤 AVATAR */}
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "700"
          }}>
            {getUserInitial()}
          </div>

          <SidebarMenu color={t.text} />
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "auto", padding: "2rem" }}>

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
                <p>{q.q}</p>

                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [i]: opt })}
                    style={{
                      display: "block",
                      width: "100%",
                      margin: "5px 0",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "none",
                      background: answers[i] === opt ? t.primary : t.border,
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
                width: "100%",
                borderRadius: "8px"
              }}
            >
              Submit Section ✅
            </button>
          </>
        )}

        {/* MAIN */}
        {!activeSection && (
          <>
            <h1>Assessment</h1>

            {sections.map(sec => (
              <div key={sec} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                background: t.card,
                margin: "10px 0",
                borderRadius: "10px"
              }}>
                <h3>{sec}</h3>

                <button
                  onClick={() => startTest(sec)}
                  style={{
                    background: completed[sec] ? "green" : "red",
                    color: "#fff",
                    padding: "8px 14px",
                    borderRadius: "8px"
                  }}
                >
                  {completed[sec] ? "Completed" : "Take Test"}
                </button>
              </div>
            ))}

            {/* INPUT FIXED */}
            <input
              placeholder="Enter your interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "8px",
                border: `1px solid ${t.border}`,
                background: t.card,
                color: t.text
              }}
            />

            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                borderRadius: "8px",
                border: `1px solid ${t.border}`,
                background: t.card,
                color: t.text
              }}
            >
              <option value="">Select Company</option>
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
                borderRadius: "10px"
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