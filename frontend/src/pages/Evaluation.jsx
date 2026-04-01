import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";
import ProjectLogo from "../components/Logo";

const Evaluation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

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

  // 🎯 QUESTION BANK (SCENARIO BASED)
  const questionBank = {
    Aptitude: [
      {
        q: "A company reduces cost by 20%. Original cost = 500. New cost?",
        options: ["400", "450", "420", "380"]
      },
      {
        q: "Production doubles every day. Day1=5 units. Day3?",
        options: ["20", "15", "10", "25"]
      },
      {
        q: "A train travels 60km in 1 hour. Distance in 3 hours?",
        options: ["180", "120", "200", "150"]
      },
      {
        q: "Profit = 200, cost = 800. Profit %?",
        options: ["25%", "20%", "30%", "40%"]
      },
      {
        q: "Simple interest on 1000 at 10% for 2 years?",
        options: ["200", "100", "300", "400"]
      }
    ],

    Logical: [
      {
        q: "All cats are animals. Some animals are black. Conclusion?",
        options: [
          "All cats are black",
          "Some cats may be black",
          "No cats are black",
          "All animals are cats"
        ]
      },
      {
        q: "If A>B and B>C, then?",
        options: ["A>C", "C>A", "A=B", "None"]
      },
      {
        q: "Odd one out: Apple, Mango, Carrot, Banana",
        options: ["Carrot", "Apple", "Mango", "Banana"]
      },
      {
        q: "Find next: 2,4,8,16,...",
        options: ["32", "24", "20", "18"]
      },
      {
        q: "Mirror of LEFT?",
        options: ["TFEL", "LEFT", "EF TL", "None"]
      }
    ],

    Verbal: [
      {
        q: "‘Efficient’ means?",
        options: ["Productive", "Lazy", "Slow", "Weak"]
      },
      {
        q: "Synonym of ‘Rapid’?",
        options: ["Fast", "Slow", "Late", "Stop"]
      },
      {
        q: "Correct sentence?",
        options: [
          "She go to school",
          "She goes to school",
          "She going school",
          "She gone school"
        ]
      },
      {
        q: "Opposite of ‘Strong’?",
        options: ["Weak", "Hard", "Solid", "Big"]
      },
      {
        q: "‘Execute’ means?",
        options: ["Perform", "Stop", "Break", "Cancel"]
      }
    ],

    Technical: [
      {
        q: "C language is?",
        options: ["Procedural", "Object oriented", "Scripting", "Markup"]
      },
      {
        q: "OS manages?",
        options: ["Hardware", "Programs", "Memory", "All"]
      },
      {
        q: "TCP belongs to?",
        options: ["Transport", "Network", "Data Link", "Physical"]
      },
      {
        q: "Java is?",
        options: ["OOP", "Procedural", "Functional", "None"]
      },
      {
        q: "RAM is?",
        options: ["Temporary", "Permanent", "External", "None"]
      }
    ]
  };

  // 🎲 RANDOM QUESTIONS
  const getRandomQuestions = (section) => {
    const shuffled = [...questionBank[section]].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5); // show 5 random
  };

  // ▶️ START TEST
  const startTest = (section) => {
    setActiveSection(section);
    setQuestions(getRandomQuestions(section));
    setAnswers({});
  };

  // ❌ BACK
  const goBack = () => {
    setActiveSection(null);
  };

  // ANSWER SELECT
  const selectAnswer = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>

      {/* 🔝 NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ccc"
      }}>
        <ProjectLogo />

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={toggleTheme}>
            {darkMode ? "🌞" : "🌙"}
          </button>
          <SidebarMenu color={t.text} />
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>

        {/* 🧠 QUESTION SCREEN */}
        {activeSection ? (
          <>
            <button onClick={goBack}>⬅ Back</button>

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
                    onClick={() => selectAnswer(i, opt)}
                    style={{
                      display: "block",
                      margin: "5px 0",
                      background: answers[i] === opt ? t.primary : "#ddd",
                      color: answers[i] === opt ? "#fff" : "#000",
                      padding: "6px",
                      borderRadius: "6px",
                      border: "none"
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}
          </>
        ) : (
          <>
            <h1>Assessment</h1>

            {Object.keys(questionBank).map((sec) => (
              <div key={sec} style={{
                padding: "20px",
                marginBottom: "15px",
                background: t.card,
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <h3>{sec}</h3>

                <button onClick={() => startTest(sec)}>
                  Take Assessment →
                </button>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default Evaluation;