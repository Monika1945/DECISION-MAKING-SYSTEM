import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectLogo from '../components/Logo';

const Home = () => {
    const [hoveredBtn, setHoveredBtn] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const theme = darkMode ? darkStyles : lightStyles;

    return (
        <div style={{ ...styles.pageWrapper, ...theme.page }}>

            {/* BACKGROUND */}
            <div style={styles.backgroundContainer}>
                <div style={{ ...styles.blob, ...theme.blob1 }}></div>
                <div style={{ ...styles.blob, ...theme.blob2 }}></div>
                <div style={{ ...styles.blob, ...theme.blob3 }}></div>
            </div>

            {/* NAVBAR */}
            <nav style={{ ...styles.navbar, ...theme.navbar }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <ProjectLogo />
                </Link>

                <div style={styles.navLinks}>

                    {/* THEME TOGGLE */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        style={styles.themeBtn}
                    >
                        {darkMode ? "🌙 Dark" : "☀️ Light"}
                    </button>

                    <Link
                        to="/login"
                        onMouseEnter={() => setHoveredLink('login')}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                            ...styles.navLink,
                            color: theme.text,
                            ...(hoveredLink === 'login' ? theme.navHover : {})
                        }}
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        onMouseEnter={() => setHoveredBtn('signup')}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{
                            ...styles.signupBtn,
                            ...(hoveredBtn === 'signup' ? styles.signupBtnHover : {})
                        }}
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <div style={styles.heroSection}>
                <h1 style={{ ...styles.heroTitle, color: theme.heading }}>
                    Unlock Your <br />
                    <span style={styles.gradientText}>
                        Career Potential 🚀
                    </span>
                </h1>

                <p style={{ ...styles.heroSubtitle, color: theme.subtext }}>
                    Build your future with smart insights 📊 and track your progress like a pro 💼
                </p>

                <div style={styles.heroButtons}>
                    <Link
                        to="/about"
                        onMouseEnter={() => setHoveredBtn('explore')}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{
                            ...styles.primaryBtn,
                            ...(hoveredBtn === 'explore' ? styles.primaryBtnHover : {})
                        }}
                    >
                        Explore More
                    </Link>

                    <Link
                        to="/login"
                        onMouseEnter={() => setHoveredBtn('login-hero')}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{
                            ...styles.secondaryBtn,
                            backgroundColor: theme.card,
                            color: theme.text,
                            ...(hoveredBtn === 'login-hero' ? styles.secondaryBtnHover : {})
                        }}
                    >
                        Log In
                    </Link>
                </div>

                {/* FEATURES */}
                <div style={styles.featureGrid}>
                    {[
                        { icon: "🚀", title: "Skill Analysis", desc: "Understand your strengths and grow faster 📈" },
                        { icon: "📊", title: "Visual Insights", desc: "Clear analytics to guide your journey 🧠" },
                        { icon: "🎯", title: "Smart Targets", desc: "Personalized roadmap for success 💼" }
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.featureCard,
                                backgroundColor: theme.card,
                                border: theme.border
                            }}
                        >
                            <div style={styles.iconBox}>{item.icon}</div>
                            <h3 style={{ ...styles.featureTitle, color: theme.heading }}>
                                {item.title}
                            </h3>
                            <p style={{ ...styles.featureDesc, color: theme.subtext }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* COMMON STYLES */
const styles = {
    pageWrapper: {
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: '"Inter", sans-serif',
        transition: 'all 0.5s'
    },
    backgroundContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    blob: {
        position: 'absolute',
        width: '40%',
        height: '40%',
        borderRadius: '50%',
        filter: 'blur(100px)',
        opacity: 0.3,
    },
    navbar: {
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
    },
    navLinks: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    },
    navLink: {
        textDecoration: 'none',
        fontWeight: 500,
    },
    signupBtn: {
        backgroundColor: '#111827',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '999px',
        textDecoration: 'none',
    },
    signupBtnHover: {
        transform: 'scale(1.05)'
    },
    themeBtn: {
        padding: '6px 10px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer'
    },
    heroSection: {
        textAlign: 'center',
        padding: '5rem 2rem',
        position: 'relative',
        zIndex: 10
    },
    heroTitle: {
        fontSize: '3.5rem',
        fontWeight: 800
    },
    gradientText: {
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
        fontSize: '1.2rem',
        marginTop: '1rem',
        marginBottom: '2rem'
    },
    heroButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem'
    },
    primaryBtn: {
        padding: '12px 24px',
        borderRadius: '999px',
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        color: 'white',
        textDecoration: 'none'
    },
    primaryBtnHover: {
        transform: 'scale(1.05)'
    },
    secondaryBtn: {
        padding: '12px 24px',
        borderRadius: '999px',
        border: '1px solid #ccc',
        textDecoration: 'none'
    },
    featureGrid: {
        marginTop: '4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
    },
    featureCard: {
        padding: '2rem',
        borderRadius: '1.5rem',
        backdropFilter: 'blur(10px)',
        transition: '0.3s'
    },
    iconBox: {
        fontSize: '2rem',
        marginBottom: '1rem'
    },
    featureTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold'
    },
    featureDesc: {}
};

/* LIGHT THEME */
const lightStyles = {
    page: { backgroundColor: '#f8fafc' },
    text: '#374151',
    heading: '#111827',
    subtext: '#6b7280',
    card: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(0,0,0,0.05)',
    navbar: {},
    navHover: { color: '#111827' },
    blob1: { top: '-10%', left: '-10%', backgroundColor: '#60a5fa' },
    blob2: { top: '20%', right: '-10%', backgroundColor: '#c084fc' },
    blob3: { bottom: '-10%', left: '20%', backgroundColor: '#f472b6' }
};

/* DARK THEME */
const darkStyles = {
    page: { backgroundColor: '#020617' },
    text: '#e5e7eb',
    heading: '#ffffff',
    subtext: '#9ca3af',
    card: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    navbar: { borderBottom: '1px solid rgba(255,255,255,0.1)' },
    navHover: { color: '#ffffff' },
    blob1: { top: '-10%', left: '-10%', backgroundColor: '#6366f1' },
    blob2: { top: '20%', right: '-10%', backgroundColor: '#a855f7' },
    blob3: { bottom: '-10%', left: '20%', backgroundColor: '#ec4899' }
};

export default Home;