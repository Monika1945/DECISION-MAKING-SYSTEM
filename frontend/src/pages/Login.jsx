import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE from "../config";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isHovered, setIsHovered] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDark(savedTheme === 'dark');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.toggle('dark');
        const dark = root.classList.contains('dark');
        setIsDark(dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/api/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            const errorMsg = err.response?.data?.msg || 'Login failed. Please try again.';
            alert(errorMsg);
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <button onClick={toggleTheme} style={styles.themeBtn}>
                {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

            <div style={styles.backgroundContainer}>
                <div style={{ ...styles.blob, ...styles.blob1 }}></div>
                <div style={{ ...styles.blob, ...styles.blob2 }}></div>
            </div>

            <div style={styles.card}>
                <h2 style={styles.header}>Welcome Back</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            ...styles.button,
                            ...(isHovered ? styles.buttonHover : {})
                        }}
                    >
                        Log In
                    </button>
                </form>
                <p style={styles.footerText}>
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        onMouseEnter={() => setIsLinkHovered(true)}
                        onMouseLeave={() => setIsLinkHovered(false)}
                        style={{
                            ...styles.link,
                            ...(isLinkHovered ? styles.linkHover : {})
                        }}
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Inter", sans-serif',
        transition: 'all 0.4s'
    },
    themeBtn: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '8px 14px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        background: 'var(--primary)',
        color: '#fff',
        fontWeight: 'bold',
        zIndex: 20
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
        width: '18rem',
        height: '18rem',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(70px)',
        opacity: 0.25,
    },
    blob1: {
        top: '10%',
        left: '20%',
        backgroundColor: '#d8b4fe',
    },
    blob2: {
        top: '30%',
        right: '20%',
        backgroundColor: '#93c5fd',
    },
    card: {
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'var(--card)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        padding: '2.5rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 40px var(--border)',
        width: '100%',
        maxWidth: '28rem',
    },
    header: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        textAlign: 'center',
        color: 'var(--text)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        display: 'block',
        color: 'var(--sub)',
        fontSize: '0.875rem',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        padding: '0.8rem 1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        outline: 'none',
        transition: 'all 0.2s',
        fontSize: '1rem',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        background: 'var(--primary)',
        color: 'white',
        fontWeight: 'bold',
        padding: '0.85rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
        transition: 'all 0.2s',
        fontSize: '1.05rem'
    },
    buttonHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.6)',
    },
    footerText: {
        marginTop: '1.5rem',
        textAlign: 'center',
        color: 'var(--sub)',
    },
    link: {
        color: 'var(--primary)',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'color 0.2s',
    },
    linkHover: {
        textDecoration: 'underline',
    },
};

export default Login;
