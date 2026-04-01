import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://decision-backend-pl2m.onrender.com";

const Evaluation = () => {

  const navigate = useNavigate();

  // SKILLS
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("Basic");

  // QUIZ ANSWERS
  const [answers, setAnswers] = useState({});

  // LOADING
  const [loading, setLoading] = useState(false);

  // QUESTIONS
  const aptitude = [
    { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
    { q: "10 / 2 = ?", options: ["2", "5", "10"], answer: "5" }
  ];

  const logical = [
    { q: "2,4,6, ?", options: ["7", "8", "9"], answer: "8" }
  ];

  const verbal = [
    { q: "Synonym of FAST?", options: ["Quick", "Slow", "Late"], answer: "Quick" }
  ];

  // ADD SKILL
  const addSkill = () => {
    if (!skill.trim()) return;
    setSkills([...skills, { skill, level }]);
    setSkill("");
  };

  // HANDLE ANSWERS
  const handleAnswer = (section, index, value) => {
    setAnswers({
      ...answers,
      [`${section}-${index}`]: value
    });
  };

  // SKILL SCORE
  const calcSkillScore = () => {
    let score = 0;
    skills.forEach(s => {
      if (s.level === "Basic") score += 2;
      if (s.level === "Moderate") score += 4;
      if (s.level === "Advanced") score += 6;
    });
    return Math.min(score, 40);
  };

  // QUIZ SCORE
  const calcQuizScore = () => {
    let score = 0;
    let total = 0;

    const check = (arr, sec) => {
      arr.forEach((q, i) => {
        total++;
        if (answers[`${sec}-${i}`] === q.answer) score++;
      });
    };

    check(aptitude, "aptitude");
    check(logical, "logical");
    check(verbal, "verbal");

    return (score / total) * 60 || 0;
  };

  // FINAL RESULT
  const getFinalResult = () => {
    const totalScore = calcSkillScore() + calcQuizScore();

    if (totalScore >= 75) return "READY";
    if (totalScore >= 50) return "ALMOST READY";
    return "NOT READY";
  };

  // SUBMIT
  const handleSubmit = async () => {

    setLoading(true);

    const payload = {
      skills,
      answers,
      skillScore: calcSkillScore(),
      quizScore: calcQuizScore(),
      totalScore: calcSkillScore() + calcQuizScore(),
      result: getFinalResult()
    };

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API_BASE}/api/evaluation`, payload, {
        headers: { "x-auth-token": token }
      });

      navigate("/result", { state: payload });

    } catch (err) {
      alert("Submission failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>Placement Readiness</h1>

      {/* SKILLS */}
      <div style={styles.card}>
        <h2>💻 Technical Skills</h2>

        <div style={styles.row}>
          <input
            placeholder="Enter skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            style={styles.input}
          />

          <select value={level} onChange={(e) => setLevel(e.target.value)} style={styles.select}>
            <option>Basic</option>
            <option>Moderate</option>
            <option>Advanced</option>
          </select>

          <button onClick={addSkill} style={styles.addBtn}>Add</button>
        </div>

        <div style={styles.skillList}>
          {skills.map((s, i) => (
            <div key={i} style={styles.skillChip}>
              {s.skill} • {s.level}
            </div>
          ))}
        </div>
      </div>

      {/* QUIZ */}
      {[["aptitude", aptitude], ["logical", logical], ["verbal", verbal]].map(([sec, qs]) => (
        <div key={sec} style={styles.card}>
          <h2>{sec.toUpperCase()}</h2>

          {qs.map((q, i) => (
            <div key={i}>
              <p>{q.q}</p>
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(sec, i, opt)}
                  style={{
                    ...styles.optBtn,
                    background: answers[`${sec}-${i}`] === opt ? "#2563eb" : "#eee",
                    color: answers[`${sec}-${i}`] === opt ? "#fff" : "#000"
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* RESULT */}
      <div style={styles.result}>
        <p>Skill Score: {calcSkillScore()} / 40</p>
        <p>Quiz Score: {calcQuizScore().toFixed(2)} / 60</p>
        <h2>{getFinalResult()}</h2>
      </div>

      <button onClick={handleSubmit} style={styles.submit}>
        {loading ? "Submitting..." : "Submit Evaluation"}
      </button>

    </div>
  );
};

const styles = {
  page: { padding: "2rem", fontFamily: "Inter" },
  title: { fontSize: "2rem", fontWeight: "900" },

  card: {
    background: "#fff",
    padding: "1.5rem",
    marginTop: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
  },

  row: { display: "flex", gap: "1rem" },

  input: { padding: "0.5rem", borderRadius: "0.5rem" },
  select: { padding: "0.5rem" },

  addBtn: {
    background: "#111",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none"
  },

  skillList: { marginTop: "1rem", display: "flex", gap: "0.5rem" },

  skillChip: {
    background: "#eef2ff",
    padding: "0.5rem 1rem",
    borderRadius: "999px"
  },

  optBtn: {
    margin: "0.3rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.5rem"
  },

  result: {
    marginTop: "2rem",
    padding: "1rem",
    background: "#111",
    color: "#fff",
    borderRadius: "1rem"
  },

  submit: {
    marginTop: "1rem",
    padding: "1rem",
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "1rem"
  }
};

export default Evaluation;