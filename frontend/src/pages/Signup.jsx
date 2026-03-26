import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = "https://decision-making-system.onrender.com";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        year: '',
        cgpa: '',
        backlogs: 0
    });

    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Basic validation
        if (formData.password.length < 6) {
            return alert("Password must be at least 6 characters");
        }

        if (formData.cgpa < 0 || formData.cgpa > 10) {
            return alert("CGPA must be between 0 and 10");
        }

        setLoading(true);

        try {
            const dataToSubmit = {
                ...formData,
                cgpa: Number(formData.cgpa),
                backlogs: Number(formData.backlogs)
            };

            const res = await axios.post(
                `${API_BASE}/api/auth/register`,
                dataToSubmit
            );

            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');

        } catch (err) {
            console.error('Signup error:', err);

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
            {/* Background */}
            <div style={styles.backgroundContainer}>
                <div style={{ ...styles.blob, ...styles.blob1 }}></div>
                <div style={{ ...styles.blob, ...styles.blob2 }}></div>
            </div>

            <div style={styles.card}>
                <h2 style={styles.header}>Create Account</h2>

                <form onSubmit={handleSubmit} style={styles.form}>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name *</label>
                        <input name="name" onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email *</label>
                        <input type="email" name="email" onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password *</label>
                        <input type="password" name="password" onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.row}>
                        <div style={styles.col}>
                            <label style={styles.label}>Department</label>
                            <input name="department" onChange={handleChange} style={styles.input} />
                        </div>
                        <div style={styles.col}>
                            <label style={styles.label}>Year</label>
                            <input name="year" onChange={handleChange} style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.col}>
                            <label style={styles.label}>CGPA *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="cgpa"
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.col}>
                            <label style={styles.label}>Backlogs *</label>
                            <input
                                type="number"
                                name="backlogs"
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            ...styles.button,
                            ...(isHovered ? styles.buttonHover : {}),
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>

                </form>

                <p style={styles.footerText}>
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        onMouseEnter={() => setIsLinkHovered(true)}
                        onMouseLeave={() => setIsLinkHovered(false)}
                        style={{
                            ...styles.link,
                            ...(isLinkHovered ? styles.linkHover : {})
                        }}
                    >
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
        backgroundColor: '#f9fafb',
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem 0',
        fontFamily: '"Inter", sans-serif',
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
        filter: 'blur(40px)',
        opacity: 0.3,
    },
    blob1: {
        bottom: '10%',
        left: '10%',
        backgroundColor: '#86efac',
    },
    blob2: {
        top: '10%',
        right: '10%',
        backgroundColor: '#93c5fd',
    },
    card: {
        zIndex: 10,
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: '32rem',
    },
    header: {
        fontSize: '1.8rem',
        textAlign: 'center',
        marginBottom: '2rem',
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
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '0.8rem',
        marginBottom: '4px',
    },
    input: {
        padding: '0.6rem',
        borderRadius: '6px',
        border: '1px solid #ddd',
    },
    button: {
        marginTop: '1rem',
        padding: '0.7rem',
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
    },
    buttonHover: {
        transform: 'translateY(-2px)',
    },
    footerText: {
        marginTop: '1rem',
        textAlign: 'center',
    },
    link: {
        color: '#2563eb',
    },
    linkHover: {
        textDecoration: 'underline',
    },
};

export default Signup;