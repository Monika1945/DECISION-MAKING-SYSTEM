import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";
import ProjectLogo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});

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
    light: { bg: "#f8fafc", card: "#fff", text: "#111", primary: "#4f46e5" },
    dark: { bg: "#020617", card: "#1e293b", text: "#fff", primary: "#6366f1" }
  };

  const t = darkMode ? theme.dark : theme.light;

  const sections = ["Aptitude", "Logical", "Verbal", "Technical"];

  // 🔥 BIG SCENARIO QUESTIONS
  const questionBank = {
    Aptitude: [
      {
        q: "A startup produces 150 units/day. Due to system failure, productivity drops by 30% for 2 days and increases by 20% on the third day. What is total production?",
        options: ["351", "360", "375", "390"],
        ans: "351"
      },
      {
        q: "A company invests ₹50,000 at 10% annual simple interest. What is the total amount after 3 years?",
        options: ["65000", "66000", "64000", "68000"],
        ans: "65000"
      },
      {
        q: "A train covers 120 km in 2 hours. If speed increases by 25%, how long to cover 150 km?",
        options: ["2 hr", "2.5 hr", "3 hr", "1.5 hr"],
        ans: "2 hr"
      },
      {
        q: "A person buys a laptop for 40,000 and sells it at 20% profit. Selling price?",
        options: ["48000", "46000", "50000", "44000"],
        ans: "48000"
      },
      {
        q: "A worker completes a task in 10 days. Another in 5 days. Together?",
        options: ["3.33", "4", "2", "5"],
        ans: "3.33"
      }
    ],

    Logical: [
      {
        q: "All engineers are problem solvers. Some problem solvers are leaders. Which is correct?",
        options: [
          "All engineers are leaders",
          "Some engineers may be leaders",
          "No engineer is a leader",
          "All leaders are engineers"
        ],
        ans: "Some engineers may be leaders"
      },
      {
        q: "If coding is faster than testing and testing is faster than debugging, then?",
        options: ["Coding > Debugging", "Debugging > Coding", "Same", "None"],
        ans: "Coding > Debugging"
      },
      {
        q: "Find odd: CPU, RAM, SSD, Keyboard",
        options: ["Keyboard", "CPU", "RAM", "SSD"],
        ans: "Keyboard"
      },
      {
        q: "Series: 3, 9, 27, ?",
        options: ["81", "72", "90", "60"],
        ans: "81"
      },
      {
        q: "Mirror of CODE?",
        options: ["EDOC", "CODE", "OCED", "None"],
        ans: "EDOC"
      }
    ],

    Verbal: [
      {
        q: "‘Robust system’ means?",
        options: ["Strong", "Weak", "Slow", "Broken"],
        ans: "Strong"
      },
      {
        q: "Synonym of ‘Enhance’?",
        options: ["Improve", "Reduce", "Stop", "Break"],
        ans: "Improve"
      },
      {
        q: "Choose correct: He ___ working yesterday.",
        options: ["was", "is", "are", "were"],
        ans: "was"
      },
      {
        q: "Opposite of ‘Flexible’?",
        options: ["Rigid", "Soft", "Elastic", "Loose"],
        ans: "Rigid"
      },
      {
        q: "‘Deploy’ means?",
        options: ["Release", "Stop", "Delete", "Break"],
        ans: "Release"
      }
    ],

    Technical: [
      {
        q: "Which data structure uses FIFO?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        ans: "Queue"
      },
      {
        q: "Which OS concept allows multitasking?",
        options: ["Process Scheduling", "Paging", "Segmentation", "Deadlock"],
        ans: "Process Scheduling"
      },
      {
        q: "Java supports?",
        options: ["OOP", "Procedural", "None", "Only scripting"],
        ans: "OOP"
      },
      {
        q: "Which protocol is used for web?",
        options: ["HTTP", "FTP", "SMTP", "TCP"],
        ans: "HTTP"
      },
      {
        q: "Which memory is fastest?",
        options: ["Cache", "RAM", "ROM", "Disk"],
        ans: "Cache"
      }
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

    const updatedScores = { ...scores, [sec]: score };
    setScores(updatedScores);

    // 👉 FINAL REDIRECT
    if (activeSectionIndex === sections.length - 1) {
      const total = Object.values(updatedScores).reduce((a, b) => a + b, 0);
      const percent = (total / (sections.length * 5)) * 100;

      let status = "";
      if (percent >= 75) status = "READY";
      else if (percent >= 50) status = "ALMOST READY";
      else status = "NOT READY";

      navigate("/result", {
        state: { total, percent, status }
      });

    } else {
      startTest(activeSectionIndex + 1);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem 2rem" }}>
        <ProjectLogo />
        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={toggleTheme}>{darkMode ? "🌞" : "🌙"}</button>
          <SidebarMenu color={t.text} />
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>

        {/* QUESTIONS */}
        {activeSectionIndex !== null ? (
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
                      padding: "6px"
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}

            <button onClick={submitSection}>
              {activeSectionIndex === sections.length - 1
                ? "Final Submit 🚀"
                : "Submit & Next →"}
            </button>
          </>
        ) : (
          <>
            <h1>Assessment</h1>

            {sections.map((sec, i) => (
              <div key={i} style={{
                padding: "20px",
                marginBottom: "15px",
                background: t.card,
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