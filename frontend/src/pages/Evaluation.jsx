import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";
import ProjectLogo from "../components/Logo";

const Evaluation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [showResult, setShowResult] = useState(false);

  // 🌙 THEME LOAD
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
      bg: "#f8fafc",
      card: "#ffffff",
      text: "#0f172a",
      sub: "#64748b",
      primary: "#4f46e5"
    },
    dark: {
      bg: "#020617",
      card: "#1e293b",
      text: "#f1f5f9",
      sub: "#94a3b8",
      primary: "#6366f1"
    }
  };

  const t = darkMode ? theme.dark : theme.light;

  // 🧠 SECTIONS ORDER
  const sections = ["Aptitude", "Logical", "Verbal", "Technical"];

  // 📚 QUESTION BANK
  const questionBank = {
    Aptitude: [
      { q: "Cost reduced by 20% from 500?", options: ["400","450","420","380"], ans: "400" },
      { q: "5 units double daily. Day3?", options: ["20","15","10","25"], ans: "20" },
      { q: "60km/hr for 3 hrs?", options: ["180","150","120","200"], ans: "180" },
      { q: "Profit 200 on 800?", options: ["25%","20%","30%","40%"], ans: "25%" },
      { q: "SI on 1000 @10% 2yr?", options: ["200","100","300","400"], ans: "200" }
    ],
    Logical: [
      { q: "All devs testers. Some testers mgrs?", options: ["All","Some may","None","All mgr"], ans: "Some may" },
      { q: "A>B, B>C?", options: ["A>C","C>A","A=B","None"], ans: "A>C" },
      { q: "Odd one?", options: ["Carrot","Apple","Mango","Banana"], ans: "Carrot" },
      { q: "2,4,8,16?", options: ["32","24","20","18"], ans: "32" },
      { q: "Mirror LEFT?", options: ["TFEL","LEFT","EF","None"], ans: "TFEL" }
    ],
    Verbal: [
      { q: "Efficient?", options: ["Productive","Lazy","Slow","Weak"], ans: "Productive" },
      { q: "Rapid?", options: ["Fast","Slow","Late","Stop"], ans: "Fast" },
      { q: "Correct sentence?", options: ["She go","She goes","She going","She gone"], ans: "She goes" },
      { q: "Opposite strong?", options: ["Weak","Hard","Big","Solid"], ans: "Weak" },
      { q: "Execute?", options: ["Perform","Stop","Break","Cancel"], ans: "Perform" }
    ],
    Technical: [
      { q: "C is?", options: ["Procedural","OOP","Script","Markup"], ans: "Procedural" },
      { q: "OS manages?", options: ["HW","Programs","Memory","All"], ans: "All" },
      { q: "TCP layer?", options: ["Transport","Network","DL","Physical"], ans: "Transport" },
      { q: "Java is?", options: ["OOP","Procedural","None","Func"], ans: "OOP" },
      { q: "RAM?", options: ["Temporary","Permanent","External","None"], ans: "Temporary" }
    ]
  };

  // 🎲 RANDOM QUESTIONS
  const getRandom = (sec) => {
    return [...questionBank[sec]].sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  // ▶ START TEST
  const startTest = (index) => {
    const sec = sections[index];
    setActiveSectionIndex(index);
    setQuestions(getRandom(sec));
    setAnswers({});
  };

  // ✅ SUBMIT SECTION
  const submitSection = () => {
    const sec = sections[activeSectionIndex];
    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.ans) score++;
    });

    setScores(prev => ({ ...prev, [sec]: score }));

    // 👉 NEXT SECTION
    if (activeSectionIndex < sections.length - 1) {
      startTest(activeSectionIndex + 1);
    } else {
      setShowResult(true);
      setActiveSectionIndex(null);
    }
  };

  // 🎯 FINAL RESULT
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const percent = (totalScore / (sections.length * 5)) * 100;

  let status = "";
  if (percent >= 75) status = "READY ✅";
  else if (percent >= 50) status = "ALMOST READY ⚠️";
  else status = "NOT READY ❌";

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>

      {/* NAVBAR */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem 2rem" }}>
        <ProjectLogo />
        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={toggleTheme}>{darkMode ? "🌞" : "🌙"}</button>
          <SidebarMenu color={t.text} />
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>

        {/* 🎯 RESULT */}
        {showResult && (
          <div style={{ padding: "2rem", background: t.card, borderRadius: "12px" }}>
            <h2>Final Result</h2>
            <h1>{status}</h1>
            <p>Score: {totalScore}</p>
            <p>{percent.toFixed(1)}%</p>
          </div>
        )}

        {/* 🧠 QUESTIONS */}
        {activeSectionIndex !== null && !showResult && (
          <>
            <h2>{sections[activeSectionIndex]} Test</h2>

            {questions.map((q, i) => (
              <div key={i} style={{ margin: "1rem 0", padding: "1rem", background: t.card }}>
                <p>{q.q}</p>

                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [i]: opt })}
                    style={{
                      display: "block",
                      margin: "5px 0",
                      background: answers[i] === opt ? t.primary : "#ddd",
                      color: answers[i] === opt ? "#fff" : "#000",
                      padding: "6px",
                      border: "none"
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}

            <button onClick={submitSection}>Submit & Next →</button>
          </>
        )}

        {/* 📦 MAIN UI (UNCHANGED) */}
        {activeSectionIndex === null && !showResult && (
          <>
            <h1>Assessment</h1>

            {sections.map((sec, i) => (
              <div key={i} style={{
                padding: "20px",
                marginBottom: "15px",
                background: t.card,
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <h3>{sec}</h3>
                <button onClick={() => startTest(i)}>Take Assessment →</button>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default Evaluation;