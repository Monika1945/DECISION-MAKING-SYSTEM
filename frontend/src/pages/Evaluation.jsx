import React, { useState } from "react";
import axios from "axios";
import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";
import { getRandomQuestions } from "../utils/questions";

const Evaluation = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState(null);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [completed, setCompleted] = useState({});
  const [scores, setScores] = useState({});
  const [interest, setInterest] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sections = ["Aptitude", "Logical", "Verbal", "Technical"];

  const startTest = (section) => {
    setActiveSection(section);
    setQuestions(getRandomQuestions(section, 5));
    setAnswers({});
  };

  const submitSection = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.ans) score++;
    });

    setScores((prev) => ({ ...prev, [activeSection]: score }));
    setCompleted((prev) => ({ ...prev, [activeSection]: true }));
    setActiveSection(null);
  };

  const finalSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (sections.some((section) => !completed[section])) {
      alert("Please complete all sections before final submit.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        aptitudeScore: scores.Aptitude || 0,
        logicalScore: scores.Logical || 0,
        communicationScore: scores.Verbal || 0,
        technicalScore: scores.Technical || 0,
        companyPreference: company,
        interestedSkill: interest,
        technicalSkills: []
      };

      const res = await axios.post(`${API_BASE}/api/evaluation`, payload, {
        headers: { "x-auth-token": token }
      });

      navigate(`/result?id=${res.data._id}`, {
        state: { evaluation: res.data }
      });
    } catch (err) {
      console.error("Evaluation submit error:", err);
      const errorMsg =
        err.response?.data?.msg ||
        (err.request ? "Cannot reach backend." : "Failed to save evaluation.");
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: 'var(--bg)', color: 'var(--text)', transition: 'all 0.4s ease' }}>
      <TopNav />

      <div style={{ maxWidth: "800px", margin: "auto", padding: "4rem 2rem" }}>
        {activeSection && (
          <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>{activeSection} Test</h2>

            {questions.map((q, i) => (
              <div
                key={i}
                style={{
                  margin: "1.5rem 0",
                  padding: "1.5rem",
                  background: 'var(--bg)',
                  borderRadius: "10px",
                  border: '1px solid var(--border)'
                }}
              >
                <p style={{ fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>{i + 1}. {q.q}</p>

                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [i]: opt })}
                    style={{
                      display: "block",
                      width: "100%",
                      margin: "8px 0",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: `1px solid ${answers[i] === opt ? 'var(--primary)' : 'var(--border)'}`,
                      background: answers[i] === opt ? 'var(--primary)' : 'var(--card)',
                      color: answers[i] === opt ? "#fff" : 'var(--text)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
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
                background: "#10b981",
                color: "#fff",
                padding: "14px",
                width: "100%",
                borderRadius: "12px",
                marginTop: "1rem",
                border: "none",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer"
              }}
            >
              Submit Section
            </button>
          </div>
        )}

        {!activeSection && (
          <div style={{ background: 'var(--card)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--border)', boxShadow: '0 10px 40px var(--border)' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '2rem' }}>Assessment Modules</h1>

            {sections.map((sec) => (
              <div
                key={sec}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  background: 'var(--bg)',
                  margin: "12px 0",
                  borderRadius: "12px",
                  border: '1px solid var(--border)'
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{sec}</h3>

                <button
                  onClick={() => startTest(sec)}
                  disabled={completed[sec]}
                  style={{
                    background: completed[sec] ? "#10b981" : "var(--primary)",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: "bold",
                    cursor: completed[sec] ? "default" : "pointer"
                  }}
                >
                  {completed[sec] ? "✓ Completed" : "Take Test"}
                </button>
              </div>
            ))}

            <div style={{ marginTop: '2rem' }}>
                <label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Key Interest Area</label>
                <input
                placeholder="E.g., Web Development"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                }}
                />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Company Preference</label>
                <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                }}
                >
                <option value="">Select Company</option>
                <option>Product Based</option>
                <option>Service Based</option>
                <option>Startup</option>
                </select>
            </div>

            <button
              onClick={finalSubmit}
              disabled={submitting}
              style={{
                marginTop: "2.5rem",
                width: "100%",
                background: 'var(--primary)',
                color: "#fff",
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "bold",
                fontSize: "1.1rem",
                opacity: submitting ? 0.7 : 1,
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)'
              }}
            >
              {submitting ? "Processing results..." : "Generate Final Report ->"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Evaluation;
