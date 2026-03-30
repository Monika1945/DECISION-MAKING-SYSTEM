import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = "https://decision-backend-pl2m.onrender.com";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        year: '',
    });

    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState('light');

    const navigate = useNavigate();

    // 🌗 Load saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);

    // 🌗 Toggle Theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            return alert("Password must be at least 6 characters");
        }

        setLoading(true);

        try {
            await axios.post(`${API_BASE}/api/auth/register`, formData);

            alert("Account created successfully! Please login.");
            navigate('/login'); // ✅ correct flow

        } catch (err) {
            const errorMsg =
                err.response?.data?.msg ||
                "Signup failed. Please try again.";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const isDark = theme === 'dark';

    return (
        <div style={{
            ...styles.pageWrapper,
            background: isDark ? '#0f172a' : '#f9fafb',
            color: isDark ? '#fff' : '#111'
        }}>

            {/* 🌗 Toggle Button */}
            <button onClick={toggleTheme} style={styles.themeBtn}>
                {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

            {/* Background blobs */}
            <div style={styles.backgroundContainer}>
                <div style={{
                    ...styles.blob,
                    backgroundColor: isDark ? '#6366f1' : '#86efac',
                    bottom: '10%',
                    left: '10%'
                }}></div>
                <div style={{
                    ...styles.blob,
                    backgroundColor: isDark ? '#9333ea' : '#93c5fd',
                    top: '10%',
                    right: '10%'
                }}></div>
            </div>

            <div style={{
                ...styles.card,
                background: isDark
                    ? 'rgba(30,41,59,0.8)'
                    : 'rgba(255,255,255,0.7)',
                color: isDark ? '#fff' : '#111'
            }}>

                <h2 style={styles.header}>Create Account</h2>

                <form onSubmit={handleSubmit} style={styles.form}>

                    {["name", "email", "password", "department", "year"].map((field) => (
                        <div key={field} style={styles.inputGroup}>
                            <label style={styles.label}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === "password" ? "password" : "text"}
                                name={field}
                                onChange={handleChange}
                                required={field !== "department" && field !== "year"}
                                style={{
                                    ...styles.input,
                                    background: isDark ? '#1e293b' : '#fff',
                                    color: isDark ? '#fff' : '#111',
                                    border: isDark ? '1px solid #334155' : '1px solid #ddd'
                                }}
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.link}>
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

/* 🎨 STYLES */
const styles = {
    pageWrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Inter", sans-serif',
    },

    themeBtn: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '8px 12px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        background: '#6366f1',
        color: '#fff'
    },

    backgroundContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    blob: {
        position: 'absolute',
        width: '20rem',
        height: '20rem',
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.3,
    },

    card: {
        zIndex: 10,
        padding: '2.5rem',
        borderRadius: '1.5rem',
        width: '100%',
        maxWidth: '32rem',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },

    header: {
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: 'bold'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },

    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },

    label: {
        fontSize: '0.8rem',
        marginBottom: '4px',
    },

    input: {
        padding: '0.7rem',
        borderRadius: '8px',
        outline: 'none'
    },

    button: {
        marginTop: '1rem',
        padding: '0.8rem',
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer'
    },

    footerText: {
        marginTop: '1rem',
        textAlign: 'center',
    },

    link: {
        color: '#6366f1',
        fontWeight: 'bold'
    },
};

export default Signup;