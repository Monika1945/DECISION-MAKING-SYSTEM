import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';

const PlatformDetails = () => {
    return (
        <div style={styles.pageWrapper}>
            <TopNav />

            <div style={styles.container}>
                <div style={styles.headerSection}>
                    <h1 style={styles.title}>About The Platform</h1>
                    <p style={styles.subtitle}>
                        Discover how ReadySetGo empowers students to achieve placement readiness.
                    </p>
                </div>

                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>Who Is This For?</h2>
                    <p style={styles.text}>
                        This platform is explicitly designed for ambitious students and job-seekers who want to rigorously 
                        assess their technical, logical, verbal, and aptitude skills before facing real interviews. Whether you 
                        are aiming for product-based giants, vibrant startups, or steady service-based corporations, this 
                        platform builds your profile to match industry expectations.
                    </p>
                </div>

                <div style={styles.grid}>
                    <div style={styles.benefitCard}>
                        <div style={styles.icon}>🧠</div>
                        <h3 style={styles.benefitTitle}>AI-Driven Evaluation</h3>
                        <p style={styles.benefitDesc}>
                            Get real-time scoring and logical feedback based on your testing performance instantly. Avoid the wait time of traditional mock tests.
                        </p>
                    </div>

                    <div style={styles.benefitCard}>
                        <div style={styles.icon}>📈</div>
                        <h3 style={styles.benefitTitle}>Actionable Growth</h3>
                        <p style={styles.benefitDesc}>
                            Every test highlights exactly which subjects you should study next. You receive tailored recommendations and targeted focal points.
                        </p>
                    </div>

                    <div style={styles.benefitCard}>
                        <div style={styles.icon}>🎯</div>
                        <h3 style={styles.benefitTitle}>Company Specific</h3>
                        <p style={styles.benefitDesc}>
                            Align your assessment parameters to match the flavor of product, service, or startup tier companies seamlessly.
                        </p>
                    </div>
                </div>

                <div style={styles.ctaSection}>
                    <Link to="/evaluation" style={styles.ctaButton}>
                        Take Your Next Test
                    </Link>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: '"Inter", sans-serif',
        transition: 'all 0.4s ease'
    },
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 1.5rem',
    },
    headerSection: {
        textAlign: 'center',
        marginBottom: '3rem'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '900',
        color: 'var(--text)',
        marginBottom: '1rem'
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--sub)'
    },
    card: {
        backgroundColor: 'var(--card)',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid var(--border)',
        boxShadow: '0 10px 30px var(--border)',
        marginBottom: '3rem'
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: 'var(--primary)'
    },
    text: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        color: 'var(--text)'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
    },
    benefitCard: {
        backgroundColor: 'var(--card)',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid var(--border)',
        transition: 'transform 0.3s',
    },
    icon: {
        fontSize: '2.5rem',
        marginBottom: '1rem'
    },
    benefitTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    },
    benefitDesc: {
        color: 'var(--sub)',
        lineHeight: 1.5
    },
    ctaSection: {
        textAlign: 'center',
        marginTop: '2rem'
    },
    ctaButton: {
        display: 'inline-block',
        backgroundColor: 'var(--primary)',
        color: '#fff',
        padding: '1rem 2.5rem',
        borderRadius: '9999px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
    }
};

export default PlatformDetails;
