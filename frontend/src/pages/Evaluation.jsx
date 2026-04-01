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
  const [userInitial, setUserInitial] = useState("U");

  const sections = ["Aptitude", "Logical", "Verbal", "Technical"];

  // 🌙 Load Theme + User
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    // 👤 Get email first letter
    const email = localStorage.getItem("email");
    if (email) {
      setUserInitial(email.charAt(0).toUpperCase());
    }
  }, []);

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

  // 🧠 QUESTION BANK (same as yours)
  const questionBank = { /* keep your existing */ };

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

      {/* NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: `1px solid ${t.border}`
      }}>
        <ProjectLogo />

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          
          {/* 🌙 THEME */}
          <button onClick={toggleTheme}>
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* 👤 AVATAR */}
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: t.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold"
          }}>
            {userInitial}
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
                borderRadius: "8px",
                width: "100%"
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

            {/* 🔥 INTEREST FIXED */}
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

            {/* 🔥 COMPANY FIXED */}
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