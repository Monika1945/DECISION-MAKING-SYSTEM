import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectLogo from '../components/Logo';

const Home = () => {
    const [hoveredBtn, setHoveredBtn] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);

    return (
        <div style={styles.pageWrapper}>
            {/* Background Shapes */}
            <div style={styles.backgroundContainer}>
                <div style={{ ...styles.blob, ...styles.blob1 }}></div>
                <div style={{ ...styles.blob, ...styles.blob2 }}></div>
                <div style={{ ...styles.blob, ...styles.blob3 }}></div>
            </div>

            {/* Navbar */}
            <nav style={styles.navbar}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <ProjectLogo />
                </Link>
                <div style={styles.navLinks}>
                    <Link
                        to="/login"
                        onMouseEnter={() => setHoveredLink('login')}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                            ...styles.navLink,
                            ...(hoveredLink === 'login' ? styles.navLinkHover : {})
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

            {/* Hero Section */}
            <div style={styles.heroSection}>
                <h1 style={styles.heroTitle}>
                    Unlock Your <br />
                    <span style={styles.gradientText}>
                        Career Potential
                    </span>
                </h1>
                <p style={styles.heroSubtitle}>
                    Assess your technical skills, aptitude, and communication with our AI-powered readiness system. Get personalized recommendations and land your dream job.
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
                            ...(hoveredBtn === 'login-hero' ? styles.secondaryBtnHover : {})
                        }}
                    >
                        Log In
                    </Link>
                </div>

                {/* Feature Cards */}
                <div style={styles.featureGrid}>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.iconBox, backgroundColor: '#dbeafe' }}>🚀</div>
                        <h3 style={styles.featureTitle}>Skill Analysis</h3>
                        <p style={styles.featureDesc}>Comprehensive evaluation of your technical and soft skills.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.iconBox, backgroundColor: '#f3e8ff' }}>📊</div>
                        <h3 style={styles.featureTitle}>Visual Insights</h3>
                        <p style={styles.featureDesc}>Understand your strengths and weaknesses with interactive charts.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.iconBox, backgroundColor: '#fdf2f8' }}>🎯</div>
                        <h3 style={styles.featureTitle}>Smart Targets</h3>
                        <p style={styles.featureDesc}>Receive tailored roadmap to improve your readiness score.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: '"Inter", sans-serif',
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
    },
    blob: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(64px)',
        opacity: 0.2,
    },
    blob1: {
        top: '-20%',
        left: '-10%',
        backgroundColor: '#60a5fa', // blue-400
    },
    blob2: {
        top: '20%',
        right: '-10%',
        backgroundColor: '#c084fc', // purple-400
    },
    blob3: {
        bottom: '-20%',
        left: '20%',
        backgroundColor: '#f472b6', // pink-400
    },
    navbar: {
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    },
    navLink: {
        color: '#4b5563',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.2s',
    },
    navLinkHover: {
        color: '#111827',
    },
    signupBtn: {
        backgroundColor: '#111827',
        color: 'white',
        padding: '0.625rem 1.25rem',
        borderRadius: '9999px',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'all 0.2s',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    signupBtnHover: {
        backgroundColor: '#1f2937',
        transform: 'translateY(-2px)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    heroSection: {
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '5rem 2rem 8rem',
        textAlign: 'center',
    },
    heroTitle: {
        fontSize: '4rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '1.5rem',
        lineHeight: 1.1,
    },
    gradientText: {
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
        fontSize: '1.25rem',
        color: '#4b5563',
        marginBottom: '2.5rem',
        maxWidth: '42rem',
        margin: '0 auto 2.5rem',
        lineHeight: 1.6,
    },
    heroButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    },
    primaryBtn: {
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '9999px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1.125rem',
        transition: 'all 0.2s',
    },
    primaryBtnHover: {
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transform: 'scale(1.05)',
    },
    secondaryBtn: {
        backgroundColor: 'white',
        color: '#1f2937',
        padding: '1rem 2rem',
        borderRadius: '9999px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1.125rem',
        border: '1px solid #e5e7eb',
        transition: 'all 0.2s',
    },
    secondaryBtnHover: {
        borderColor: '#d1d5db',
        backgroundColor: '#f9fafb',
    },
    featureGrid: {
        marginTop: '5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    featureCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'default',
    },
    iconBox: {
        width: '3rem',
        height: '3rem',
        borderRadius: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '1.5rem',
    },
    featureTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '0.5rem',
    },
    featureDesc: {
        color: '#4b5563',
    },
};

export default Home;
