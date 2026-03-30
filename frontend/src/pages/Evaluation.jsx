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
    const [newTechSkill, setNewTechSkill] = useState({ skill: '', rating: 0 });
    const [loading, setLoading] = useState(false);
    const [hoveredElement, setHoveredElement] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        setScores({ ...scores, [name]: val });
    };

    // ✅ TECH SCORE MAX = 10
    const handleAddTechSkill = () => {
        if (!newTechSkill.skill.trim()) return;

        const updatedSkills = [...technicalSkills, {
            ...newTechSkill,
            rating: Number(newTechSkill.rating)
        }];

        setTechnicalSkills(updatedSkills);

        const totalTech = updatedSkills.reduce((sum, s) => sum + s.rating, 0);

        // 🔥 CHANGE HERE
        setScores({ ...scores, technicalScore: Math.min(totalTech, 10) });

        setNewTechSkill({ skill: '', rating: 0 });
    };

    const handleRemoveTechSkill = (index) => {
        const updatedSkills = technicalSkills.filter((_, i) => i !== index);
        setTechnicalSkills(updatedSkills);

        const totalTech = updatedSkills.reduce((sum, s) => sum + s.rating, 0);

        // 🔥 CHANGE HERE
        setScores({ ...scores, technicalScore: Math.min(totalTech, 10) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');

        try {
            const dataToSubmit = {
                ...scores,
                technicalSkills
            };

            await axios.post(`${API_BASE}/api/evaluation`, dataToSubmit, {
                headers: { 'x-auth-token': token }
            });

            setTimeout(() => {
                setLoading(false);
                navigate('/result');
            }, 1200);

        } catch (err) {
            setLoading(false);
            alert('Evaluation failed. Please try again.');
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.ambience}></div>

            <nav style={styles.navbar}>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <ProjectLogo style={styles.navLogo} />
                </Link>
                <SidebarMenu />
            </nav>

            <div style={styles.contentContainer}>
                <div style={styles.header}>
                    <h1 style={styles.title}>
                        Placement <span style={styles.italicTitle}>Readiness</span> Assessment
                    </h1>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* TECH SECTION */}
                    <div style={styles.formSection}>
                        <h2>Technical Skills</h2>

                        <input
                            type="text"
                            placeholder="Skill"
                            value={newTechSkill.skill}
                            onChange={(e) =>
                                setNewTechSkill({ ...newTechSkill, skill: e.target.value })
                            }
                        />

                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={newTechSkill.rating}
                            onChange={(e) =>
                                setNewTechSkill({ ...newTechSkill, rating: e.target.value })
                            }
                        />

                        <button type="button" onClick={handleAddTechSkill}>
                            Add Skill
                        </button>

                        {technicalSkills.map((s, i) => (
                            <div key={i}>
                                {s.skill} - {s.rating}
                                <button onClick={() => handleRemoveTechSkill(i)}>X</button>
                            </div>
                        ))}

                        <h3>
                            Technical Score: {scores.technicalScore} / 10
                        </h3>

                        {/* ✅ PROGRESS BAR FIX */}
                        <div style={{ background: "#eee", height: "10px" }}>
                            <div
                                style={{
                                    height: "10px",
                                    width: `${(scores.technicalScore / 10) * 100}%`,
                                    background: "blue"
                                }}
                            />
                        </div>
                    </div>

                    {/* OTHER SCORES */}
                    {[
                        { name: 'aptitudeScore', label: 'Aptitude', max: 30 },
                        { name: 'communicationScore', label: 'Communication', max: 20 },
                        { name: 'logicalScore', label: 'Logical', max: 30 },
                        { name: 'leadershipScore', label: 'Leadership', max: 20 }
                    ].map(field => (
                        <div key={field.name}>
                            <label>{field.label}</label>
                            <input
                                type="number"
                                name={field.name}
                                max={field.max}
                                value={scores[field.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* PREFERENCES */}
                    <select
                        name="companyPreference"
                        value={scores.companyPreference}
                        onChange={handleChange}
                    >
                        <option value="Product Based">Product Based</option>
                        <option value="Service Based">Service Based</option>
                        <option value="Startup">Startup</option>
                    </select>

                    <input
                        type="text"
                        name="interestedSkill"
                        placeholder="Interest"
                        value={scores.interestedSkill}
                        onChange={handleChange}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>

                </form>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: { padding: 20 },
    navbar: { display: 'flex', justifyContent: 'space-between' },
    contentContainer: { maxWidth: 600, margin: 'auto' },
    form: { display: 'flex', flexDirection: 'column', gap: 10 },
    formSection: { border: '1px solid #ddd', padding: 20 }
};

export default Evaluation;