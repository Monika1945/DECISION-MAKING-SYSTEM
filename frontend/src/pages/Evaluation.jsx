import React, { useState } from "react";

const Evaluation = () => {

  // TECH SKILLS
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [level, setLevel] = useState("Basic");

  // QUIZ STATES
  const [answers, setAnswers] = useState({});

  // CAREER
  const [career, setCareer] = useState({
    companyPreference: "Product Based",
    interestedSkill: ""
  });

  // QUESTIONS
  const aptitudeQ = [
    { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
    { q: "5 * 3 = ?", options: ["10", "15", "20"], answer: "15" },
  ];

  const logicalQ = [
    { q: "Next: 2,4,6, ?", options: ["7", "8", "9"], answer: "8" },
  ];

  const verbalQ = [
    { q: "Synonym of FAST?", options: ["Quick", "Slow", "Late"], answer: "Quick" },
  ];

  // ADD SKILL
  const addSkill = () => {
    if (!skillInput) return;
    setSkills([...skills, { skill: skillInput, level }]);
    setSkillInput("");
  };

  // HANDLE ANSWERS
  const handleAnswer = (section, index, value) => {
    setAnswers({
      ...answers,
      [`${section}-${index}`]: value
    });
  };

  // CALCULATE SCORE
  const calculateScore = () => {
    let score = 0;
    let total = 0;

    const check = (questions, section) => {
      questions.forEach((q, i) => {
        total++;
        if (answers[`${section}-${i}`] === q.answer) score++;
      });
    };

    check(aptitudeQ, "aptitude");
    check(logicalQ, "logical");
    check(verbalQ, "verbal");

    return { score, total };
  };

  // FINAL RESULT
  const getResult = () => {
    const { score, total } = calculateScore();
    const percent = (score / total) * 100;

    if (percent >= 75) return "READY ✅";
    if (percent >= 50) return "ALMOST READY ⚠️";
    return "NOT READY ❌";
  };

  return (
    <div style={{ padding: "2rem" }}>

      <h1>Placement Readiness Evaluation</h1>

      {/* TECH SKILLS */}
      <h2>Technical Skills</h2>

      <input
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        placeholder="Enter skill"
      />

      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option>Basic</option>
        <option>Moderate</option>
        <option>Advanced</option>
      </select>

      <button onClick={addSkill}>Add</button>

      <ul>
        {skills.map((s, i) => (
          <li key={i}>{s.skill} - {s.level}</li>
        ))}
      </ul>

      {/* QUIZ RENDER */}
      {[["aptitude", aptitudeQ], ["logical", logicalQ], ["verbal", verbalQ]].map(([section, questions]) => (
        <div key={section}>
          <h2>{section.toUpperCase()} TEST</h2>

          {questions.map((q, i) => (
            <div key={i}>
              <p>{q.q}</p>
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(section, i, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* CAREER */}
      <h2>Career Aspiration</h2>

      <select
        value={career.companyPreference}
        onChange={(e) =>
          setCareer({ ...career, companyPreference: e.target.value })
        }
      >
        <option>Product Based</option>
        <option>Service Based</option>
        <option>Startup</option>
      </select>

      <input
        placeholder="Interested Skill"
        value={career.interestedSkill}
        onChange={(e) =>
          setCareer({ ...career, interestedSkill: e.target.value })
        }
      />

      {/* RESULT */}
      <h2>Final Result</h2>

      <p>
        Score: {calculateScore().score} / {calculateScore().total}
      </p>

      <h3>{getResult()}</h3>

    </div>
  );
};

export default Evaluation;