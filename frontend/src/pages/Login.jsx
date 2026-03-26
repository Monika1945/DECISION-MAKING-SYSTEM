import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isHovered, setIsHovered] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);
    const navigate = useNavigate();

    const API_BASE = "https://decision-making-system.onrender.com";

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
            {/* Background Shapes */}
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
        backgroundColor: '#f9fafb',
        position: 'relative',
        overflow: 'hidden',
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
        width: '18rem',
        height: '18rem',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(40px)',
        opacity: 0.3,
    },
    blob1: {
        top: '10%',
        left: '20%',
        backgroundColor: '#d8b4fe', // purple-300
    },
    blob2: {
        top: '30%',
        right: '20%',
        backgroundColor: '#93c5fd', // blue-300
    },
    card: {
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        padding: '2.5rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        width: '100%',
        maxWidth: '28rem',
    },
    header: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        textAlign: 'center',
        color: '#1f2937',
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
        color: '#374151',
        fontSize: '0.875rem',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        outline: 'none',
        transition: 'all 0.2s',
        fontSize: '1rem',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        color: 'white',
        fontWeight: 'bold',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s',
    },
    buttonHover: {
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transform: 'translateY(-2px)',
    },
    footerText: {
        marginTop: '1.5rem',
        textAlign: 'center',
        color: '#4b5563',
    },
    link: {
        color: '#2563eb',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'color 0.2s',
    },
    linkHover: {
        textDecoration: 'underline',
    },
};

export default Login;
