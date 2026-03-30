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

    const handleAddTechSkill = () => {
        if (!newTechSkill.skill.trim()) return;
        const updatedSkills = [...technicalSkills, { ...newTechSkill, rating: Number(newTechSkill.rating) }];
        setTechnicalSkills(updatedSkills);

        const totalTech = updatedSkills.reduce((sum, s) => sum + s.rating, 0);
        setScores({ ...scores, technicalScore: Math.min(totalTech, 50) });

        setNewTechSkill({ skill: '', rating: 0 });
    };

    const handleRemoveTechSkill = (index) => {
        const updatedSkills = technicalSkills.filter((_, i) => i !== index);
        setTechnicalSkills(updatedSkills);
        const totalTech = updatedSkills.reduce((sum, s) => sum + s.rating, 0);
        setScores({ ...scores, technicalScore: Math.min(totalTech, 50) });
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
            {/* Background Ambience */}
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
                    <p style={styles.subTitle}>
                        Analyze your strengths across 5 core domains and get a strategic career roadmap.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Section 1: Skill Assessment */}
                    <div style={styles.formSection}>
                        <div style={styles.sectionHeader}>
                            <span style={styles.sectionIcon}>📊</span>
                            <div>
                                <h2 style={styles.sectionTitle}>Skill Competency</h2>
                                <p style={styles.sectionDesc}>Self-rate your proficiency in core placement areas.</p>
                            </div>
                        </div>

                        <div style={styles.sectionBody}>
                            {/* Technical Skills Section */}
                            <div style={styles.techSection}>
                                <div style={styles.techLabelRow}>
                                    <span style={{ fontSize: '1.5rem' }}>💻</span>
                                    <div>
                                        <label style={styles.techLabel}>Technical Expertise</label>
                                        <p style={styles.techSub}>List your technical skills and proficiency level (1-10)</p>
                                    </div>
                                </div>

                                {/* Common Skill Suggestions */}
                                <div style={styles.suggestionGrid}>
                                    {['React', 'Python', 'Java', 'SQL', 'Node.js', 'AWS', 'Docker', 'Machine Learning'].map(skill => (
                                        <button
                                            key={skill}
                                            type="button"
                                            onClick={() => setNewTechSkill({ ...newTechSkill, skill })}
                                            onMouseEnter={() => setHoveredElement(`suggest-${skill}`)}
                                            onMouseLeave={() => setHoveredElement(null)}
                                            style={{
                                                ...styles.suggestBtn,
                                                ...(newTechSkill.skill === skill ? styles.suggestBtnActive : {}),
                                                ...(hoveredElement === `suggest-${skill}` && newTechSkill.skill !== skill ? styles.suggestBtnHover : {})
                                            }}
                                        >
                                            + {skill}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewTechSkill({ skill: '', rating: 0 });
                                            document.getElementById('custom-skill-input')?.focus();
                                        }}
                                        onMouseEnter={() => setHoveredElement('suggest-other')}
                                        onMouseLeave={() => setHoveredElement(null)}
                                        style={{
                                            ...styles.otherSkillBtn,
                                            ...(hoveredElement === 'suggest-other' ? styles.otherSkillBtnHover : {})
                                        }}
                                    >
                                        + Other Skill
                                    </button>
                                </div>

                                {/* Streamlined Manual Entry Row */}
                                <div style={{
                                    ...styles.entryRow,
                                    borderColor: focusedInput === 'skill-entry' ? '#93c5fd' : '#f3f4f6',
                                    boxShadow: focusedInput === 'skill-entry' ? '0 0 0 4px #eff6ff' : 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                                }}>
                                    <div style={styles.entryFlex}>
                                        {/* Box for Skill Name */}
                                        <div style={styles.skillInputWrapper}>
                                            <div style={{
                                                ...styles.searchIcon,
                                                opacity: focusedInput === 'skill-entry' ? 1 : 0.5,
                                                filter: focusedInput === 'skill-entry' ? 'grayscale(0)' : 'grayscale(1)'
                                            }}>
                                                🔍
                                            </div>
                                            <input
                                                id="custom-skill-input"
                                                type="text"
                                                value={newTechSkill.skill}
                                                onFocus={() => setFocusedInput('skill-entry')}
                                                onBlur={() => setFocusedInput(null)}
                                                onChange={(e) => setNewTechSkill({ ...newTechSkill, skill: e.target.value })}
                                                style={styles.skillInput}
                                                placeholder="Type custom skill name here..."
                                            />
                                        </div>

                                        {/* Level Selector */}
                                        <div style={styles.levelSelector}>
                                            <span style={styles.levelLabel}>Level</span>
                                            <div style={{ display: 'flex', gap: '0.375rem' }}>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                                                    <button
                                                        key={level}
                                                        type="button"
                                                        onClick={() => setNewTechSkill({ ...newTechSkill, rating: level })}
                                                        onMouseEnter={() => setHoveredElement(`level-${level}`)}
                                                        onMouseLeave={() => setHoveredElement(null)}
                                                        style={{
                                                            ...styles.levelBtn,
                                                            ...(newTechSkill.rating === level ? styles.levelBtnActive : {}),
                                                            ...(hoveredElement === `level-${level}` && newTechSkill.rating !== level ? styles.levelBtnHover : {})
                                                        }}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Add Button */}
                                        <button
                                            type="button"
                                            onClick={handleAddTechSkill}
                                            disabled={!newTechSkill.skill || newTechSkill.rating === 0}
                                            onMouseEnter={() => setHoveredElement('add-skill')}
                                            onMouseLeave={() => setHoveredElement(null)}
                                            style={{
                                                ...styles.addSkillBtn,
                                                ...((newTechSkill.skill && newTechSkill.rating > 0) ? styles.addSkillBtnEnabled : {}),
                                                ...(hoveredElement === 'add-skill' && newTechSkill.skill && newTechSkill.rating > 0 ? styles.addSkillBtnHover : {})
                                            }}
                                        >
                                            Add Skill +
                                        </button>
                                    </div>
                                </div>

                                <div style={styles.skillList}>
                                    {technicalSkills.map((s, idx) => (
                                        <div
                                            key={idx}
                                            onMouseEnter={() => setHoveredElement(`skill-${idx}`)}
                                            onMouseLeave={() => setHoveredElement(null)}
                                            style={{
                                                ...styles.skillRow,
                                                ...(hoveredElement === `skill-${idx}` ? styles.skillRowHover : {})
                                            }}
                                        >
                                            <div style={styles.skillMain}>
                                                <div style={styles.skillRatingBox}>
                                                    {s.rating}
                                                </div>
                                                <div>
                                                    <p style={styles.skillName}>{s.skill}</p>
                                                    <div style={{ display: 'flex', gap: '2px' }}>
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(dot => (
                                                            <div
                                                                key={dot}
                                                                style={{
                                                                    ...styles.skillDot,
                                                                    backgroundColor: dot <= s.rating ? '#3b82f6' : '#f1f5f9'
                                                                }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTechSkill(idx)}
                                                style={{
                                                    ...styles.removeBtn,
                                                    opacity: hoveredElement === `skill-${idx}` ? 1 : 0
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#fef2f2';
                                                    e.target.style.color = '#ef4444';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = 'transparent';
                                                    e.target.style.color = '#d1d5db';
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <div style={styles.aggregateContainer}>
                                        <div style={styles.aggregateFlex}>
                                            <div>
                                                <span style={styles.weightageLabel}>Weightage</span>
                                                <span style={styles.aggregateLabel}>Aggregate Level</span>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={styles.aggregateValue}>{scores.technicalScore}</span>
                                                <span style={styles.aggregateMax}>/ 50</span>
                                            </div>
                                        </div>
                                        <div style={styles.aggregateBarBg}>
                                            <div
                                                style={{
                                                    ...styles.aggregateBarFill,
                                                    width: `${(scores.technicalScore / 50) * 100}%`
                                                }}
                                            >
                                                <div style={styles.barPulse}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other Categories */}
                            <div style={styles.categoriesGrid}>
                                {[
                                    { name: 'aptitudeScore', label: 'Aptitude & Math', max: 30, icon: '🔢', color: 'linear-gradient(to right, #a855f7, #4f46e5)', bg: '#faf5ff', iconColor: '#9333ea' },
                                    { name: 'communicationScore', label: 'Verbal Fluency', max: 20, icon: '🗣️', color: 'linear-gradient(to right, #22c55e, #059669)', bg: '#ecfdf5', iconColor: '#10b981' },
                                    { name: 'logicalScore', label: 'Logical Reasoning', max: 30, icon: '🧩', color: 'linear-gradient(to right, #f97316, #d97706)', bg: '#fff7ed', iconColor: '#f59e0b' },
                                    { name: 'leadershipScore', label: 'Leadership Skills', max: 20, icon: '👑', color: 'linear-gradient(to right, #ec4899, #e11d48)', bg: '#fff1f2', iconColor: '#f43f5e' }
                                ].map((field) => (
                                    <div
                                        key={field.name}
                                        onMouseEnter={() => setHoveredElement(field.name)}
                                        onMouseLeave={() => setHoveredElement(null)}
                                        style={styles.categoryItem}
                                    >
                                        <div style={styles.categoryHeader}>
                                            <div style={styles.categoryLabelFlex}>
                                                <div style={{
                                                    ...styles.categoryIcon,
                                                    backgroundColor: field.bg,
                                                    color: field.iconColor,
                                                    transform: hoveredElement === field.name ? 'scale(1.1)' : 'scale(1)'
                                                }}>
                                                    {field.icon}
                                                </div>
                                                <label style={styles.categoryLabel}>{field.label}</label>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={styles.categoryValue}>{scores[field.name]}</span>
                                                <span style={styles.categoryMax}>/ {field.max}</span>
                                            </div>
                                        </div>
                                        <div style={styles.inputWrapper}>
                                            <input
                                                type="number"
                                                name={field.name}
                                                min="0"
                                                max={field.max}
                                                value={scores[field.name]}
                                                onFocus={() => setFocusedInput(field.name)}
                                                onBlur={() => setFocusedInput(null)}
                                                onChange={handleChange}
                                                style={{
                                                    ...styles.categoryInput,
                                                    ...(focusedInput === field.name ? styles.categoryInputFocused : {})
                                                }}
                                                placeholder={`Range: 0 - ${field.max}`}
                                            />
                                            {/* Progress Bar under input */}
                                            <div style={styles.inputProgressBg}>
                                                <div
                                                    style={{
                                                        ...styles.inputProgressFill,
                                                        background: field.color,
                                                        width: `${(scores[field.name] / field.max) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Career Preferences */}
                    <div style={styles.preferencesSection}>
                        <div style={styles.preferencesHeader}>
                            <span style={{ fontSize: '2.25rem' }}>🎯</span>
                            <div>
                                <h2 style={styles.preferencesTitle}>Career Aspirations</h2>
                                <p style={styles.preferencesSub}>Tell us where you see yourself working.</p>
                            </div>
                        </div>

                        <div style={styles.preferencesGrid}>
                            <div style={styles.fieldGroup}>
                                <label style={styles.fieldLabel}>Company Preference</label>
                                <div style={styles.selectWrapper}>
                                    <select
                                        name="companyPreference"
                                        value={scores.companyPreference}
                                        onFocus={() => setFocusedInput('company')}
                                        onBlur={() => setFocusedInput(null)}
                                        onChange={handleChange}
                                        style={{
                                            ...styles.select,
                                            ...(focusedInput === 'company' ? styles.selectFocused : {})
                                        }}
                                    >
                                        <option value="Product Based">🏢 Product Based (FAANG, etc)</option>
                                        <option value="Service Based">⚙️ Service Based (TCS, etc)</option>
                                        <option value="Startup">🚀 Early Stage Startup</option>
                                    </select>
                                    <div style={styles.selectArrow}>▼</div>
                                </div>
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.fieldLabel}>Specialization Interest</label>
                                <input
                                    type="text"
                                    name="interestedSkill"
                                    value={scores.interestedSkill}
                                    onFocus={() => setFocusedInput('specialization')}
                                    onBlur={() => setFocusedInput(null)}
                                    onChange={handleChange}
                                    placeholder="e.g. AI/ML, DevOps, Cloud"
                                    style={{
                                        ...styles.textInput,
                                        ...(focusedInput === 'specialization' ? styles.textInputFocused : {})
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        onMouseEnter={() => setHoveredElement('submit')}
                        onMouseLeave={() => setHoveredElement(null)}
                        style={{
                            ...styles.submitBtn,
                            ...(loading ? styles.submitBtnDisabled : {}),
                            ...(hoveredElement === 'submit' && !loading ? styles.submitBtnHover : {})
                        }}
                    >
                        <div style={{
                            ...styles.submitGradient,
                            transform: hoveredElement === 'submit' ? 'translateX(100%)' : 'translateX(-100%)'
                        }}></div>
                        {loading ? (
                            <span style={styles.submitContent}>
                                <div style={styles.submitSpinner}></div>
                                Running AI Benchmarking...
                            </span>
                        ) : (
                            <span style={styles.submitContent}>
                                Finalize Evaluation & View Roadmap
                                <span style={{
                                    marginLeft: '0.75rem',
                                    fontSize: '1.5rem',
                                    transition: 'transform 0.2s',
                                    transform: hoveredElement === 'submit' ? 'translateX(8px)' : 'none'
                                }}>→</span>
                            </span>
                        )}
                    </button>
                    <p style={styles.disclaimer}>
                        Your data is processed by our AI engine to provide accurate benchmarks.
                    </p>
                </form>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        backgroundColor: '#fcfcfd',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: '"Inter", sans-serif',
    },
    ambience: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '500px',
        background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1), transparent)',
        pointerEvents: 'none',
    },
    navbar: {
        position: 'sticky',
        top: 0,
        zIndex: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #f3f4f6',
        padding: '0.875rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    navLogo: {
        width: '2.25rem',
        height: '2.25rem',
    },
    contentContainer: {
        maxWidth: '56rem',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        position: 'relative',
        zIndex: 10,
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '900',
        color: '#111827',
        marginBottom: '1rem',
        letterSpacing: '-0.05em',
    },
    italicTitle: {
        color: '#2563eb',
        fontStyle: 'italic',
    },
    subTitle: {
        color: '#6b7280',
        fontWeight: 'bold',
        maxWidth: '32rem',
        margin: '0 auto',
        lineHeight: 1.6,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.2em',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    formSection: {
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '2.5rem',
        border: '1px solid #f3f4f6',
        boxShadow: '0 25px 50px -12px rgba(30, 58, 138, 0.05)',
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid #f9fafb',
    },
    sectionIcon: {
        fontSize: '1.875rem',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: '900',
        color: '#111827',
    },
    sectionDesc: {
        fontSize: '0.875rem',
        fontWeight: 'bold',
        color: '#9ca3af',
    },
    sectionBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
    },
    techSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    techLabelRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem',
    },
    techLabel: {
        fontSize: '0.875rem',
        fontWeight: '900',
        color: '#1f2937',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        display: 'block',
        lineHeight: 1,
        marginBottom: '0.25rem',
    },
    techSub: {
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '-0.025em',
    },
    suggestionGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem',
    },
    suggestBtn: {
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        fontSize: '10px',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: '1px solid #f3f4f6',
    },
    suggestBtnActive: {
        backgroundColor: '#2563eb',
        color: 'white',
        borderColor: '#2563eb',
        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
    },
    suggestBtnHover: {
        borderColor: '#bfdbfe',
        color: '#3b82f6',
    },
    otherSkillBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: '#f9fafb',
        color: '#6b7280',
        borderRadius: '9999px',
        fontSize: '10px',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: '1px solid #f3f4f6',
    },
    otherSkillBtnHover: {
        backgroundColor: '#111827',
        color: 'white',
    },
    entryRow: {
        padding: '0.75rem',
        backgroundColor: '#fcfcfd',
        borderRadius: '3rem',
        border: '1px solid #f3f4f6',
        transition: 'all 0.3s',
        marginBottom: '2.5rem',
    },
    entryFlex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    skillInputWrapper: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    searchIcon: {
        position: 'absolute',
        left: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '1.125rem',
        transition: 'all 0.2s',
    },
    skillInput: {
        width: '100%',
        padding: '1.25rem 1.5rem 1.25rem 4rem',
        borderRadius: '2rem',
        backgroundColor: 'white',
        border: 'none',
        outline: 'none',
        fontWeight: '900',
        color: '#1f2937',
        fontSize: '0.875rem',
        letterSpacing: '-0.025em',
    },
    levelSelector: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        backgroundColor: 'white',
        borderRadius: '2rem',
        border: '1px solid #f9fafb',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    levelLabel: {
        fontSize: '9px',
        fontWeight: '900',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginRight: '0.5rem',
    },
    levelBtn: {
        width: '1.75rem',
        height: '1.75rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '9px',
        fontWeight: '900',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: '#f9fafb',
        color: '#d1d5db',
    },
    levelBtnActive: {
        backgroundColor: '#2563eb',
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
        transform: 'scale(1.1)',
    },
    levelBtnHover: {
        color: '#3b82f6',
        backgroundColor: '#eff6ff',
        transform: 'scale(1.25)',
    },
    addSkillBtn: {
        padding: '1.25rem 2rem',
        borderRadius: '2rem',
        fontWeight: '900',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        transition: 'all 0.2s',
        border: 'none',
        backgroundColor: '#f3f4f6',
        color: '#d1d5db',
        cursor: 'not-allowed',
    },
    addSkillBtnEnabled: {
        backgroundColor: '#2563eb',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)',
    },
    addSkillBtnHover: {
        backgroundColor: '#1d4ed8',
    },
    skillList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
    },
    skillRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        border: '1px solid #f3f4f6',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s',
        position: 'relative',
    },
    skillRowHover: {
        borderColor: '#bfdbfe',
        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.05)',
    },
    skillMain: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
    },
    skillRatingBox: {
        width: '3rem',
        height: '3rem',
        backgroundColor: '#eff6ff',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2563eb',
        fontWeight: '900',
        fontSize: '1.125rem',
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
    skillName: {
        fontWeight: '900',
        color: '#1f2937',
        fontSize: '0.875rem',
        lineHeight: 1,
        marginBottom: '0.375rem',
    },
    skillDot: {
        width: '0.625rem',
        height: '0.25rem',
        borderRadius: '9999px',
    },
    removeBtn: {
        padding: '0.75rem',
        backgroundColor: 'transparent',
        color: '#d1d5db',
        borderRadius: '0.75rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '0.875rem',
    },
    aggregateContainer: {
        gridColumn: '1 / -1',
        padding: '1rem 0.5rem 0',
    },
    aggregateFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    weightageLabel: {
        fontSize: '10px',
        fontWeight: '900',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        display: 'block',
        marginBottom: '0.25rem',
    },
    aggregateLabel: {
        fontSize: '1.5rem',
        fontWeight: '900',
        color: '#2563eb',
        letterSpacing: '-0.025em',
    },
    aggregateValue: {
        fontSize: '1.875rem',
        fontWeight: '900',
        color: '#111827',
    },
    aggregateMax: {
        fontWeight: 'bold',
        color: '#d1d5db',
        marginLeft: '0.25rem',
        fontSize: '1.125rem',
    },
    aggregateBarBg: {
        width: '100%',
        height: '0.75rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '9999px',
        marginTop: '1rem',
        padding: '0.25rem',
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden',
    },
    aggregateBarFill: {
        height: '100%',
        background: 'linear-gradient(to right, #60a5fa, #2563eb)',
        borderRadius: '9999px',
        transition: 'width 1s ease-out',
        position: 'relative',
    },
    barPulse: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        animation: 'pulse 2s infinite',
    },
    categoriesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        paddingTop: '3rem',
        borderTop: '1px solid #f3f4f6',
    },
    categoryItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    categoryHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryLabelFlex: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    categoryIcon: {
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s',
    },
    categoryLabel: {
        fontSize: '0.75rem',
        fontWeight: '900',
        color: '#1f2937',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        lineHeight: 1,
    },
    categoryValue: {
        fontSize: '1.25rem',
        fontWeight: '900',
        color: '#111827',
    },
    categoryMax: {
        fontWeight: 'bold',
        color: '#d1d5db',
        fontSize: '0.75rem',
        marginLeft: '0.25rem',
    },
    inputWrapper: {
        position: 'relative',
    },
    categoryInput: {
        width: '100%',
        padding: '1.25rem',
        backgroundColor: 'white',
        border: '1px solid #f3f4f6',
        borderRadius: '1.5rem',
        fontWeight: '900',
        color: '#1f2937',
        fontSize: '1.125rem',
        transition: 'all 0.2s',
        outline: 'none',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    categoryInputFocused: {
        borderColor: '#e5e7eb',
        boxShadow: '0 0 0 4px #f9fafb',
    },
    inputProgressBg: {
        position: 'absolute',
        bottom: '-4px',
        left: '1rem',
        right: '1rem',
        height: '4px',
        backgroundColor: '#f9fafb',
        borderRadius: '9999px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    inputProgressFill: {
        height: '100%',
        transition: 'width 0.7s ease-out',
        borderRadius: '9999px',
    },
    preferencesSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(20px)',
        padding: '3rem',
        borderRadius: '3.5rem',
        border: '1px solid white',
        boxShadow: '0 25px 50px -12px rgba(30, 58, 138, 0.05)',
    },
    preferencesHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2.5rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid #f3f4f6',
    },
    preferencesTitle: {
        fontSize: '1.5rem',
        fontWeight: '900',
        color: '#111827',
        letterSpacing: '-0.025em',
    },
    preferencesSub: {
        fontSize: '0.75rem',
        fontWeight: 'bold',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginTop: '0.25rem',
    },
    preferencesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2.5rem',
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    fieldLabel: {
        fontSize: '10px',
        fontWeight: '900',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        display: 'block',
        paddingLeft: '0.25rem',
    },
    selectWrapper: {
        position: 'relative',
    },
    select: {
        width: '100%',
        padding: '1.25rem 1.5rem',
        backgroundColor: 'white',
        border: '1px solid #f3f4f6',
        borderRadius: '1.5rem',
        fontWeight: '900',
        color: '#1f2937',
        fontSize: '0.875rem',
        transition: 'all 0.2s',
        outline: 'none',
        appearance: 'none',
        cursor: 'pointer',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    selectFocused: {
        borderColor: '#93c5fd',
        boxShadow: '0 0 0 4px #eff6ff',
    },
    selectArrow: {
        position: 'absolute',
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: '#d1d5db',
        fontWeight: '900',
        fontSize: '10px',
    },
    textInput: {
        width: '100%',
        padding: '1.25rem 1.5rem',
        backgroundColor: 'white',
        border: '1px solid #f3f4f6',
        borderRadius: '1.5rem',
        fontWeight: '900',
        color: '#1f2937',
        fontSize: '0.875rem',
        transition: 'all 0.2s',
        outline: 'none',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    textInputFocused: {
        borderColor: '#93c5fd',
        boxShadow: '0 0 0 4px #eff6ff',
    },
    submitBtn: {
        width: '100%',
        padding: '2rem',
        borderRadius: '2.5rem',
        fontWeight: '900',
        fontSize: '1.25rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#111827',
        color: 'white',
    },
    submitBtnDisabled: {
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        cursor: 'not-allowed',
    },
    submitBtnHover: {
        backgroundColor: '#000',
        transform: 'translateY(-4px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    submitGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), transparent)',
        transform: 'skewX(-12deg)',
        transition: 'transform 1s',
    },
    submitContent: {
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitSpinner: {
        width: '2rem',
        height: '2rem',
        border: '5px solid #9ca3af',
        borderTopColor: 'white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '1rem',
    },
    disclaimer: {
        textAlign: 'center',
        fontSize: '10px',
        color: '#9ca3af',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    },
};

export default Evaluation;
