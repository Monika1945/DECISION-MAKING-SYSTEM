import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE from "../config";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        year: '',
    });

    const [loading, setLoading] = useState(false);
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
            navigate('/login');
        } catch (err) {
            const errorMsg =
                err.response?.data?.msg ||
                "Signup failed. Please try again.";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <button onClick={toggleTheme} style={styles.themeBtn}>
                {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

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

            <div style={styles.card}>
                <h2 style={styles.header}>Create Account</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {["name", "email", "password", "department", "year"].map((field) => (
                        <div key={field} style={styles.inputGroup}>
                            <label style={styles.label}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>

                            <input
                                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                                name={field}
                                onChange={handleChange}
                                required={field !== "department" && field !== "year"}
                                style={styles.input}
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

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Inter", sans-serif',
        background: 'var(--bg)',
        color: 'var(--text)',
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
        width: '100%',
        height: '100%',
        zIndex: 0
    },

    blob: {
        position: 'absolute',
        width: '22rem',
        height: '22rem',
        borderRadius: '50%',
        filter: 'blur(100px)',
        opacity: 0.25,
    },

    card: {
        zIndex: 10,
        padding: '2.5rem',
        borderRadius: '1.5rem',
        width: '100%',
        maxWidth: '32rem',
        backdropFilter: 'blur(20px)',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: '0 20px 40px var(--border)'
    },

    header: {
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: 'bold',
        color: 'var(--text)'
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
        fontSize: '0.85rem',
        marginBottom: '6px',
        color: 'var(--sub)',
        fontWeight: '600'
    },

    input: {
        padding: '0.8rem',
        borderRadius: '8px',
        outline: 'none',
        transition: '0.2s',
        background: 'var(--bg)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        fontSize: '1rem',
        boxSizing: 'border-box'
    },

    button: {
        marginTop: '1rem',
        padding: '0.9rem',
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1.05rem',
        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
    },

    footerText: {
        marginTop: '1.5rem',
        textAlign: 'center',
        color: 'var(--sub)'
    },

    link: {
        color: 'var(--primary)',
        fontWeight: 'bold',
        textDecoration: 'none'
    },
};

export default Signup;