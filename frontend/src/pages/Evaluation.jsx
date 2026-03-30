import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const API_BASE = "https://decision-backend-pl2m.onrender.com";

const Evaluation = () => {
    const [scores, setScores] = useState({
        technicalScore: 0,
        aptitudeScore: 0,
        communicationScore: 0,
        logicalScore: 0,
        leadershipScore: 0,
        companyPreference: 'Product Based',
        interestedSkill: ''
    });

    const [technicalSkills, setTechnicalSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({ skill: '', rating: 0 });
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const theme = darkMode ? dark : light;

    /* HANDLE CHANGE */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setScores({ ...scores, [name]: Number(value) || value });
    };

    /* ADD SKILL */
    const addSkill = () => {
        if (!newSkill.skill || newSkill.rating === 0) return;

        const updated = [...technicalSkills, newSkill];
        setTechnicalSkills(updated);

        const total = updated.reduce((sum, s) => sum + s.rating, 0);
        setScores({ ...scores, technicalScore: Math.min(total, 50) });

        setNewSkill({ skill: '', rating: 0 });
    };

    /* REMOVE SKILL */
    const removeSkill = (index) => {
        const updated = technicalSkills.filter((_, i) => i !== index);
        setTechnicalSkills(updated);

        const total = updated.reduce((sum, s) => sum + s.rating, 0);
        setScores({ ...scores, technicalScore: Math.min(total, 50) });
    };

    /* SUBMIT */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');

        try {
            await axios.post(`${API_BASE}/api/evaluation`, {
                ...scores,
                technicalSkills
            }, {
                headers: { 'x-auth-token': token }
            });

            setTimeout(() => navigate('/result'), 1000);

        } catch {
            alert("Submission failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ ...styles.page, background: theme.bg, color: theme.text }}>

            {/* NAVBAR */}
            <nav style={{ ...styles.nav, borderBottom: theme.border }}>
                <Link to="/dashboard"><ProjectLogo /></Link>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => setDarkMode(!darkMode)} style={styles.toggle}>
                        {darkMode ? "🌙" : "☀️"}
                    </button>
                    <SidebarMenu />
                </div>
            </nav>

            <div style={styles.container}>
                <div style={{ ...styles.card, background: theme.card, border: theme.border }}>

                    <h2 style={styles.title}>Placement Readiness 🚀</h2>

                    <form onSubmit={handleSubmit}>

                        {/* TECH SKILLS */}
                        <h3>Technical Skills 💻</h3>

                        <div style={styles.skillRow}>
                            <input
                                placeholder="Skill name"
                                value={newSkill.skill}
                                onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
                                style={{ ...styles.input, background: theme.inputBg, color: theme.text }}
                            />

                            <input
                                type="number"
                                placeholder="Rating (1-10)"
                                value={newSkill.rating}
                                onChange={(e) => setNewSkill({ ...newSkill, rating: Number(e.target.value) })}
                                style={{ ...styles.input, width: "120px", background: theme.inputBg, color: theme.text }}
                            />

                            <button type="button" onClick={addSkill} style={styles.addBtn}>
                                Add +
                            </button>
                        </div>

                        {/* SKILL LIST */}
                        {technicalSkills.map((s, i) => (
                            <div key={i} style={styles.skillItem}>
                                {s.skill} ({s.rating})
                                <button onClick={() => removeSkill(i)} style={styles.removeBtn}>✕</button>
                            </div>
                        ))}

                        {/* OTHER SCORES */}
                        <div style={styles.grid}>
                            {[
                                { name: "aptitudeScore", max: 30 },
                                { name: "communicationScore", max: 30 },
                                { name: "logicalScore", max: 25 },
                                { name: "leadershipScore", max: 15 }
                            ].map((item) => (
                                <input
                                    key={item.name}
                                    type="number"
                                    name={item.name}
                                    placeholder={item.name}
                                    max={item.max}
                                    value={scores[item.name]}
                                    onChange={handleChange}
                                    style={{ ...styles.input, background: theme.inputBg, color: theme.text }}
                                />
                            ))}
                        </div>

                        {/* DROPDOWN */}
                        <select
                            name="companyPreference"
                            value={scores.companyPreference}
                            onChange={handleChange}
                            style={{ ...styles.input, marginTop: "15px", background: theme.inputBg }}
                        >
                            <option>Product Based</option>
                            <option>Service Based</option>
                            <option>Startup</option>
                        </select>

                        <input
                            name="interestedSkill"
                            placeholder="Interested Domain"
                            value={scores.interestedSkill}
                            onChange={handleChange}
                            style={{ ...styles.input, marginTop: "10px", background: theme.inputBg }}
                        />

                        <button type="submit" style={styles.submitBtn}>
                            {loading ? "Processing..." : "Submit 🚀"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

/* STYLES */
const styles = {
    page: { minHeight: "100vh" },

    nav: {
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between"
    },

    toggle: {
        padding: "6px 10px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
    },

    container: {
        maxWidth: "900px",
        margin: "40px auto"
    },

    card: {
        padding: "30px",
        borderRadius: "20px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
    },

    title: {
        textAlign: "center",
        marginBottom: "20px"
    },

    input: {
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        marginTop: "10px",
        border: "1px solid #ccc"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        marginTop: "20px"
    },

    skillRow: {
        display: "flex",
        gap: "10px",
        marginBottom: "10px"
    },

    skillItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "10px",
        marginTop: "5px"
    },

    addBtn: {
        background: "#6366f1",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "8px"
    },

    removeBtn: {
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "5px"
    },

    submitBtn: {
        marginTop: "20px",
        width: "100%",
        padding: "15px",
        borderRadius: "10px",
        border: "none",
        background: "linear-gradient(135deg,#6366f1,#ec4899)",
        color: "white",
        fontWeight: "bold"
    }
};

/* THEMES */
const light = {
    bg: "#f8fafc",
    text: "#111",
    card: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(0,0,0,0.08)",
    inputBg: "#fff"
};

const dark = {
    bg: "#020617",
    text: "#e5e7eb",
    card: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    inputBg: "rgba(255,255,255,0.05)"
};

export default Evaluation;