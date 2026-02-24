import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', department: '', year: '', cgpa: '', backlogs: 0
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSubmit = {
                ...formData,
                cgpa: Number(formData.cgpa),
                backlogs: Number(formData.backlogs)
            };
            const res = await axios.post('http://localhost:5000/api/auth/register', dataToSubmit);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Signup error:', err);
            const errorMsg = err.response?.data?.msg || 'Signup failed. Please check if the server is running.';
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
                <h2 style={styles.header}>Create Account</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name <span style={styles.required}>*</span></label>
                        <input type="text" name="name" onChange={handleChange} style={styles.input} required />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email <span style={styles.required}>*</span></label>
                        <input type="email" name="email" onChange={handleChange} style={styles.input} required />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password <span style={styles.required}>*</span></label>
                        <input type="password" name="password" onChange={handleChange} style={styles.input} required />
                    </div>
                    <div style={styles.row}>
                        <div style={styles.col}>
                            <label style={styles.label}>Department</label>
                            <input type="text" name="department" onChange={handleChange} style={styles.input} />
                        </div>
                        <div style={styles.col}>
                            <label style={styles.label}>Year</label>
                            <input type="text" name="year" onChange={handleChange} style={styles.input} />
                        </div>
                    </div>
                    <div style={styles.row}>
                        <div style={styles.col}>
                            <label style={styles.label}>CGPA <span style={styles.required}>*</span></label>
                            <input type="number" step="0.01" name="cgpa" onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={styles.col}>
                            <label style={styles.label}>Backlogs <span style={styles.required}>*</span></label>
                            <input type="number" name="backlogs" onChange={handleChange} style={styles.input} required />
                        </div>
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
                        Sign Up
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
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
    },
    blob: {
        position: 'absolute',
        width: '20rem',
        height: '20rem',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(40px)',
        opacity: 0.3,
    },
    blob1: {
        bottom: '10%',
        left: '10%',
        backgroundColor: '#86efac', // green-300
    },
    blob2: {
        top: '10%',
        right: '10%',
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
        maxWidth: '32rem',
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
        gap: '1rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    label: {
        display: 'block',
        color: '#374151',
        fontSize: '0.875rem',
        fontWeight: '600',
    },
    required: {
        color: '#ef4444',
    },
    input: {
        width: '100%',
        padding: '0.5rem 1rem',
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
        marginTop: '1rem',
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

export default Signup;
