import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectLogo from '../components/Logo';

const About = () => {
    const [hoveredBtn, setHoveredBtn] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <div style={styles.pageWrapper}>
            {/* Background Shapes */}
            <div style={styles.backgroundContainer}>
                <div style={styles.blob1}></div>
                <div style={styles.blob2}></div>
            </div>

            {/* Navbar */}
            <nav style={styles.navbar}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <ProjectLogo />
                </Link>
                <div style={styles.navLinks}>
                    <Link
                        to="/"
                        onMouseEnter={() => setHoveredLink('home')}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{ ...styles.navLink, ...(hoveredLink === 'home' ? styles.navLinkHover : {}) }}
                    >
                        Home
                    </Link>
                    <Link
                        to="/login"
                        onMouseEnter={() => setHoveredLink('login')}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{ ...styles.navLink, ...(hoveredLink === 'login' ? styles.navLinkHover : {}) }}
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        onMouseEnter={() => setHoveredBtn('signup-nav')}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{ ...styles.signupBtn, ...(hoveredBtn === 'signup-nav' ? styles.signupBtnHover : {}) }}
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            <main style={styles.main}>
                <div style={styles.container}>
                    <h1 style={styles.heroTitle}>
                        Empowering Future <br />
                        <span style={styles.gradientText}>Industy Leaders</span>
                    </h1>

                    <div style={styles.glassPanel}>
                        <p style={styles.introText}>
                            ReadySetGo is a comprehensive placement readiness system designed to bridge the gap between academic learning and professional excellence. We provide students with the tools and insights they need to assess their current standing and prepare for their dream careers.
                        </p>

                        <div style={styles.grid2}>
                            <div
                                style={{ ...styles.featureCard, ...(hoveredCard === 'mission' ? styles.featureCardHover : {}) }}
                                onMouseEnter={() => setHoveredCard('mission')}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <h3 style={styles.featureTitle}>
                                    <span style={styles.icon}>🎯</span> Our Mission
                                </h3>
                                <p style={styles.featureDesc}>
                                    To provide personalized, data-driven career guidance that helps every student reach their full potential through continuous assessment and targeted improvement.
                                </p>
                            </div>
                            <div
                                style={{ ...styles.featureCard, ...(hoveredCard === 'vision' ? styles.featureCardHover : {}) }}
                                onMouseEnter={() => setHoveredCard('vision')}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <h3 style={styles.featureTitle}>
                                    <span style={styles.icon}>💡</span> Our Vision
                                </h3>
                                <p style={styles.featureDesc}>
                                    To become the standard for professional readiness, connecting talent with opportunity through innovative technology and actionable insights.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h2 style={styles.sectionTitle}>Why Choose ReadySetGo?</h2>
                        <div style={styles.grid3}>
                            {[
                                { id: 'ai', title: "AI/ML Powered", desc: "Advanced algorithms to predict your placement chances accurately.", icon: "🤖" },
                                { id: 'realtime', title: "Real-time Feedback", desc: "Instant evaluation of your technical and aptitude tests.", icon: "⚡" },
                                { id: 'roadmap', title: "Growth Roadmap", desc: "Personalized path to fix weaknesses and boost your score.", icon: "🗺️" }
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        ...styles.benefitCard,
                                        ...(hoveredCard === item.id ? styles.benefitCardHover : {})
                                    }}
                                >
                                    <div style={styles.benefitIcon}>{item.icon}</div>
                                    <h4 style={styles.benefitTitle}>{item.title}</h4>
                                    <p style={styles.benefitDesc}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '6rem' }}>
                        <h2 style={{ ...styles.sectionTitle, textAlign: 'center' }}>Get in Touch</h2>
                        <div style={styles.grid3}>
                            {[
                                { id: 'office', icon: '📍', title: 'Our Office', desc: '123 Education Hub, Innovation Park, Bangalore, India' },
                                { id: 'email', icon: '📧', title: 'Email Us', desc: 'support@readysetgo.edu\ninfo@readysetgo.com' },
                                { id: 'call', icon: '📞', title: 'Call Us', desc: '+91 98765-43210\n(080) 1234-5678' }
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        ...styles.contactCard,
                                        ...(hoveredCard === item.id ? styles.contactCardHover : {})
                                    }}
                                >
                                    <div style={styles.contactIconBg}>
                                        <span style={styles.contactIcon}>{item.icon}</span>
                                    </div>
                                    <h4 style={styles.contactTitle}>{item.title}</h4>
                                    <p style={styles.contactDesc}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '6rem', textAlign: 'center' }}>
                        <Link
                            to="/signup"
                            onMouseEnter={() => setHoveredBtn('journey')}
                            onMouseLeave={() => setHoveredBtn(null)}
                            style={{
                                ...styles.primaryBtn,
                                ...(hoveredBtn === 'journey' ? styles.primaryBtnHover : {})
                            }}
                        >
                            Start Your Journey Today
                        </Link>
                    </div>
                </div>
            </main>

            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 ReadySetGo. All rights reserved.</p>
            </footer>
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
    blob1: {
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '40%',
        height: '40%',
        backgroundColor: '#60a5fa',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(64px)',
        opacity: 0.2,
    },
    blob2: {
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '40%',
        height: '40%',
        backgroundColor: '#c084fc',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(64px)',
        opacity: 0.2,
    },
    navbar: {
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.875rem',
        fontWeight: '500',
    },
    navLink: {
        color: '#4b5563',
        textDecoration: 'none',
        transition: 'color 0.2s',
    },
    navLinkHover: {
        color: '#2563eb',
    },
    signupBtn: {
        backgroundColor: '#111827',
        color: 'white',
        padding: '0.5rem 1.25rem',
        borderRadius: '9999px',
        textDecoration: 'none',
        transition: 'all 0.2s',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    signupBtnHover: {
        backgroundColor: '#1f2937',
    },
    main: {
        position: 'relative',
        zIndex: 10,
        padding: '5rem 1.5rem',
    },
    container: {
        maxWidth: '56rem',
        margin: '0 auto',
    },
    heroTitle: {
        fontSize: '3rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '2rem',
        textAlign: 'center',
        lineHeight: 1.2,
    },
    gradientText: {
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    glassPanel: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(12px)',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        marginBottom: '4rem',
    },
    introText: {
        fontSize: '1.125rem',
        color: '#374151',
        lineHeight: 1.6,
        marginBottom: '1.5rem',
    },
    grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginTop: '3rem',
    },
    featureCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: '1.5rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s',
    },
    featureCardHover: {
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-4px)',
    },
    featureTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '0.75rem',
        fontSize: '1.5rem',
    },
    featureDesc: {
        color: '#4b5563',
    },
    sectionTitle: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '2.5rem',
    },
    grid3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    benefitCard: {
        padding: '1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(8px)',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s',
        cursor: 'default',
    },
    benefitCardHover: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    benefitIcon: {
        fontSize: '2.25rem',
        marginBottom: '1rem',
    },
    benefitTitle: {
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    benefitDesc: {
        fontSize: '0.875rem',
        color: '#4b5563',
    },
    contactCard: {
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(12px)',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
        transition: 'all 0.3s',
    },
    contactCardHover: {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    contactIconBg: {
        width: '3rem',
        height: '3rem',
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1rem',
        transition: 'transform 0.3s',
    },
    contactIcon: {
        fontSize: '1.5rem',
    },
    contactTitle: {
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    contactDesc: {
        fontSize: '0.875rem',
        color: '#4b5563',
        whiteSpace: 'pre-line',
    },
    primaryBtn: {
        display: 'inline-block',
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        color: 'white',
        padding: '1rem 2.5rem',
        borderRadius: '9999px',
        textDecoration: 'none',
        fontWeight: '800',
        fontSize: '1.125rem',
        transition: 'all 0.2s',
    },
    primaryBtnHover: {
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transform: 'scale(1.05)',
    },
    footer: {
        position: 'relative',
        zIndex: 10,
        padding: '2.5rem 0',
        textAlign: 'center',
        borderTop: '1px solid #f1f5f9',
        marginTop: '5rem',
    },
    footerText: {
        color: '#64748b',
        fontSize: '0.875rem',
    },
};

export default About;
