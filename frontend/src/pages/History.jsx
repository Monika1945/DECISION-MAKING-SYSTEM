import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const API_BASE = "https://decision-backend-pl2m.onrender.com";

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    const theme = {
        light: {
            bg: "#fcfcfd",
            card: "#ffffff",
            text: "#111827",
            subText: "#6b7280",
            border: "#e5e7eb",
            primary: "#2563eb"
        },
        dark: {
            bg: "#0f172a",
            card: "#1e293b",
            text: "#f1f5f9",
            subText: "#94a3b8",
            border: "#334155",
            primary: "#3b82f6"
        }
    };

    const currentTheme = darkMode ? theme.dark : theme.light;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    useEffect(() => {
        let isMounted = true;

        const fetchHistory = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get(`${API_BASE}/api/evaluation/history`, {
                    headers: { 'x-auth-token': token }
                });

                if (isMounted) {
                    setHistory(res.data);
                }

            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    setError("Failed to load history");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchHistory();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    // 🔄 Loading UI
    if (loading) return (
        <div style={{
            minHeight: "100vh",
            background: currentTheme.bg,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                width: "60px",
                height: "60px",
                border: `5px solid ${currentTheme.primary}`,
                borderTop: "transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
            }}></div>
            <p style={{ marginTop: "15px", color: currentTheme.subText }}>
                Retrieving your history...
            </p>
        </div>
    );

    // ❌ Error UI
    if (error) return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red"
        }}>
            {error}
        </div>
    );

    return (
        <div style={{
            minHeight: "100vh",
            background: currentTheme.bg,
            color: currentTheme.text,
            transition: "all 0.3s ease"
        }}>

            {/* NAVBAR */}
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem 2rem",
                background: currentTheme.card,
                borderBottom: `1px solid ${currentTheme.border}`,
                position: "sticky",
                top: 0,
                zIndex: 10
            }}>

                <Link to="/dashboard">
                    <ProjectLogo style={{ width: "36px", height: "36px" }} />
                </Link>

                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

                    {/* Email Icon */}
                    <a href="mailto:yourmail@gmail.com" style={{
                        fontSize: "22px",
                        textDecoration: "none"
                    }}>
                        📧
                    </a>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            border: "none",
                            cursor: "pointer",
                            background: currentTheme.primary,
                            color: "white",
                            fontSize: "16px"
                        }}
                    >
                        {darkMode ? "🌞" : "🌙"}
                    </button>

                    <SidebarMenu />
                </div>
            </nav>

            {/* CONTENT */}
            <div style={{
                maxWidth: "900px",
                margin: "auto",
                padding: "3rem 1.5rem"
            }}>

                {/* HEADER */}
                <h1 style={{
                    fontSize: "2.8rem",
                    fontWeight: "900",
                    marginBottom: "2rem"
                }}>
                    Evaluation <span style={{
                        color: currentTheme.primary,
                        fontStyle: "italic"
                    }}>History</span>
                </h1>

                {/* EMPTY STATE */}
                {history.length === 0 ? (
                    <div style={{
                        textAlign: "center",
                        marginTop: "50px"
                    }}>
                        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
                            No History Found
                        </h2>
                        <Link to="/evaluation" style={{
                            background: currentTheme.primary,
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "10px",
                            textDecoration: "none"
                        }}>
                            Start Assessment
                        </Link>
                    </div>
                ) : (

                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                        {history.map((item) => (
                            <div
                                key={item._id}
                                style={{
                                    background: currentTheme.card,
                                    padding: "20px",
                                    borderRadius: "16px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    border: `1px solid ${currentTheme.border}`,
                                    transition: "0.3s",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >

                                {/* LEFT */}
                                <div>
                                    <h3 style={{ fontSize: "1.3rem", fontWeight: "800" }}>
                                        {formatDate(item.createdAt)}
                                    </h3>

                                    <p style={{ color: currentTheme.subText }}>
                                        {item.status}
                                    </p>

                                    <p style={{ fontWeight: "600" }}>
                                        {item.companyPreference}
                                    </p>
                                </div>

                                {/* SCORE */}
                                <div style={{
                                    fontSize: "2rem",
                                    fontWeight: "900",
                                    color: currentTheme.primary
                                }}>
                                    {item.totalScore}
                                </div>

                                {/* BUTTON */}
                                <Link
                                    to={`/result?id=${item._id}`}
                                    style={{
                                        background: "#111",
                                        color: "white",
                                        padding: "10px 18px",
                                        borderRadius: "10px",
                                        textDecoration: "none",
                                        fontWeight: "600"
                                    }}
                                >
                                    View →
                                </Link>

                            </div>
                        ))}

                    </div>
                )}
            </div>

            {/* SPINNER ANIMATION */}
            <style>
                {`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

export default History;