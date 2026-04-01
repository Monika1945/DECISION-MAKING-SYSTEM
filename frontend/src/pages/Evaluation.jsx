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

  // 🌙 Load theme
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

  const sections = ["Aptitude", "Logical", "Verbal", "Technical"];

  // 📚 BIG SCENARIO QUESTIONS
  const questionBank = {
    Aptitude: [
      { q: "A company reduces cost by 20% from ₹500. New cost?", options: ["400","450","420","380"], ans: "400" },
      { q: "Salary increases 10% yearly. After 2 yrs ₹10000?", options: ["12100","11000","12000","12200"], ans: "12100" },
      { q: "Train 60km/hr for 3 hrs distance?", options: ["180","150","200","210"], ans: "180" },
      { q: "Profit ₹200 on ₹800 investment?", options: ["25%","20%","30%","40%"], ans: "25%" },
      { q: "Simple Interest ₹1000 @10% 2 yrs?", options: ["200","100","300","400"], ans: "200" },
      { q: "Ratio 2:3 total 100?", options: ["40,60","50,50","30,70","20,80"], ans: "40,60" }
    ],

    Logical: [
      { q: "All devs testers. Some testers managers?", options: ["All","Some may","None","All mgr"], ans: "Some may" },
      { q: "A > B, B > C. Relation?", options: ["A > C","C > A","Equal","None"], ans: "A > C" },
      { q: "Odd one: Apple, Mango, Carrot, Banana", options: ["Carrot","Apple","Mango","Banana"], ans: "Carrot" },
      { q: "Series: 2,4,8,16 ?", options: ["32","24","20","18"], ans: "32" },
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
    const sec = sections[index];
    setActiveSectionIndex(index);
    setQuestions(getRandom(sec));
    setAnswers({});
  };

  const submitSection = () => {
    const sec = sections[activeSectionIndex];
    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.ans) score++;
    });

    setScores(prev => ({ ...prev, [sec]: score }));

    if (activeSectionIndex < sections.length - 1) {
      startTest(activeSectionIndex + 1);
    } else {
      setActiveSectionIndex(null);
    }
  };

  const generateRecommendations = () => {
    let rec = [];

    if ((scores.Aptitude || 0) < 3) rec.push("Improve aptitude skills");
    if ((scores.Logical || 0) < 3) rec.push("Practice logical reasoning");
    if ((scores.Verbal || 0) < 3) rec.push("Improve communication");
    if ((scores.Technical || 0) < 3) rec.push("Focus on core subjects");

    return rec;
  };

  const handleFinalSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const percent = (totalScore / 20) * 100;

    let status = "";
    if (percent >= 75) status = "READY";
    else if (percent >= 50) status = "ALMOST READY";
    else status = "NOT READY";

    try {
      const res = await axios.post(
        `${API_BASE}/api/evaluation`,
        {
          aptitudeScore: scores.Aptitude || 0,
          logicalScore: scores.Logical || 0,
          communicationScore: scores.Verbal || 0,
          technicalScore: scores.Technical || 0,
          leadershipScore: 0,
          totalScore,
          status,
          companyPreference: selectedCompany,
          interest,
          recommendations: generateRecommendations()
        },
        { headers: { "x-auth-token": token } }
      );

      navigate(`/result?id=${res.data._id}`);

    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>

      {/* NAVBAR */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem 2rem" }}>
        <ProjectLogo />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={toggleTheme}>
            {darkMode ? "🌞" : "🌙"}
          </button>
          <SidebarMenu color={t.text} />
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>

        {/* QUESTIONS */}
        {activeSectionIndex !== null && (
          <>
            <h2>{sections[activeSectionIndex]}</h2>

            {questions.map((q, i) => (
              <div key={i}>
                <p>{q.q}</p>
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [i]: opt })}
                    style={{
                      display: "block",
                      margin: "5px 0",
                      background: answers[i] === opt ? t.primary : "#ccc",
                      color: "#fff"
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

        {/* MAIN */}
        {activeSectionIndex === null && (
          <>
            <h1>Assessment</h1>

            {sections.map((sec, i) => (
              <div key={i}>
                <h3>{sec}</h3>
                <button onClick={() => startTest(i)}>Take Assessment</button>
              </div>
            ))}

            {/* INTEREST */}
            <h3>Select Interest</h3>
            <select onChange={(e) => setInterest(e.target.value)}>
              <option>ML</option>
              <option>Web</option>
              <option>AI</option>
            </select>

            {/* COMPANY */}
            <h3>Company Preference</h3>
            <select onChange={(e) => setSelectedCompany(e.target.value)}>
              <option>Product</option>
              <option>Service</option>
              <option>Startup</option>
            </select>

            <button onClick={handleFinalSubmit}>
              Final Submit →
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Evaluation;