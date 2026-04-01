import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import ProjectLogo from "../components/Logo";

const API_BASE = "https://decision-backend-pl2m.onrender.com";

const Evaluation = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [selectedCompany, setSelectedCompany] = useState("");
  const [interest, setInterest] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
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
      bg: "linear-gradient(135deg,#f8fafc,#eef2ff)",
      card: "rgba(255,255,255,0.7)",
      text: "#0f172a",
      sub: "#64748b",
      border: "#e2e8f0",
      primary: "#4f46e5"
    },
    dark: {
      bg: "linear-gradient(135deg,#020617,#0f172a)",
      card: "rgba(30,41,59,0.6)",
      text: "#f1f5f9",
      sub: "#94a3b8",
      border: "#334155",
      primary: "#6366f1"
    }
  };

  const t = darkMode ? theme.dark : theme.light;

  const sections = ["Aptitude", "Logical", "Verbal", "Technical"];

  const questionBank = {
    Aptitude: [
      { q: "A company reduces cost by 20% from ₹500. New cost?", options: ["400","450","420","380"], ans: "400" },
      { q: "Salary increases 10% yearly. After 2 yrs ₹10000?", options: ["12100","11000","12000","12200"], ans: "12100" },
      { q: "Train 60km/hr for 3 hrs distance?", options: ["180","150","200","210"], ans: "180" },
      { q: "Profit ₹200 on ₹800 investment?", options: ["25%","20%","30%","40%"], ans: "25%" },
      { q: "SI ₹1000 @10% 2 yrs?", options: ["200","100","300","400"], ans: "200" }
    ],
    Logical: [
      { q: "All devs testers. Some testers managers?", options: ["All","Some may","None","All mgr"], ans: "Some may" },
      { q: "A > B, B > C?", options: ["A > C","C > A","Equal","None"], ans: "A > C" },
      { q: "Odd one: Apple, Mango, Carrot?", options: ["Carrot","Apple","Mango","Banana"], ans: "Carrot" },
      { q: "Series 2,4,8,16?", options: ["32","24","20","18"], ans: "32" },
      { q: "Mirror LEFT?", options: ["TFEL","LEFT","EF","None"], ans: "TFEL" }
    ],
    Verbal: [
      { q: "Efficient means?", options: ["Productive","Lazy","Slow","Weak"], ans: "Productive" },
      { q: "Rapid means?", options: ["Fast","Slow","Late","Stop"], ans: "Fast" },
      { q: "Correct: She ___ going", options: ["is","are","was","be"], ans: "is" },
      { q: "Opposite of strong?", options: ["Weak","Hard","Big","Solid"], ans: "Weak" },
      { q: "Execute means?", options: ["Perform","Stop","Break","Cancel"], ans: "Perform" }
    ],
    Technical: [
      { q: "C language type?", options: ["Procedural","OOP","Script","Markup"], ans: "Procedural" },
      { q: "OS manages?", options: ["HW","Programs","Memory","All"], ans: "All" },
      { q: "TCP layer?", options: ["Transport","Network","DL","Physical"], ans: "Transport" },
      { q: "Java is?", options: ["OOP","Procedural","None","Func"], ans: "OOP" },
      { q: "RAM type?", options: ["Temporary","Permanent","External","None"], ans: "Temporary" }
    ]
  };

  const getRandom = (sec) => {
    return [...questionBank[sec]].sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  const startTest = (index) => {
    setActiveSectionIndex(index);
    setQuestions(getRandom(sections[index]));
    setAnswers({});
  };

  const submitSection = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.ans) score++;
    });

    setScores(prev => ({ ...prev, [sections[activeSectionIndex]]: score }));

    if (activeSectionIndex < sections.length - 1) {
      startTest(activeSectionIndex + 1);
    } else {
      setActiveSectionIndex(null);
    }
  };

  const handleFinalSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    try {
      const res = await axios.post(`${API_BASE}/api/evaluation`, {
        totalScore,
        status: totalScore > 12 ? "READY" : "NOT READY",
        companyPreference: selectedCompany,
        interest
      }, { headers: { "x-auth-token": token } });

      navigate(`/result?id=${res.data._id}`);
    } catch (err) {
      alert("Error submitting");
    }
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
        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={toggleTheme}>
            {darkMode ? "🌞" : "🌙"}
          </button>
          <SidebarMenu color={t.text} />
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "auto", padding: "2rem" }}>

        <h1 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "2rem" }}>
          Assessment 🚀
        </h1>

        {/* QUESTIONS */}
        {activeSectionIndex !== null && (
          <div style={{
            padding: "2rem",
            borderRadius: "20px",
            background: t.card,
            backdropFilter: "blur(20px)"
          }}>
            <h2>{sections[activeSectionIndex]}</h2>

            {questions.map((q, i) => (
              <div key={i} style={{ marginTop: "1rem" }}>
                <p>{q.q}</p>
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [i]: opt })}
                    style={{
                      display: "block",
                      margin: "6px 0",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "none",
                      background: answers[i] === opt ? t.primary : "#e2e8f0",
                      color: answers[i] === opt ? "#fff" : "#000"
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}

            <button onClick={submitSection} style={{ marginTop: "20px" }}>
              Submit & Next →
            </button>
          </div>
        )}

        {/* MAIN CARDS */}
        {activeSectionIndex === null && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {sections.map((sec, i) => (
              <div key={i} style={{
                padding: "20px",
                borderRadius: "20px",
                background: t.card,
                display: "flex",
                justifyContent: "space-between"
              }}>
                <div>
                  <h3>{sec}</h3>
                  <p style={{ color: t.sub }}>Test your {sec} skills</p>
                </div>
                <button onClick={() => startTest(i)}>Take Test →</button>
              </div>
            ))}

            <select onChange={(e) => setInterest(e.target.value)}>
              <option>ML</option>
              <option>Web</option>
            </select>

            <select onChange={(e) => setSelectedCompany(e.target.value)}>
              <option>Product</option>
              <option>Service</option>
              <option>Startup</option>
            </select>

            <button onClick={handleFinalSubmit}>
              Final Submit 🚀
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Evaluation;