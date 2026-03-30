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
    const [showShare, setShowShare] = useState(false);

    const navigate = useNavigate();

    const theme = {
        light: {
            bg: "linear-gradient(135deg,#f8fafc,#eef2ff)",
            card: "rgba(255,255,255,0.7)",
            text: "#0f172a",
            sub: "#64748b",
            border: "#e2e8f0",
            primary: "#4f46e5"
        },
        dark: {
            bg: "linear-gradient(135deg,#020617,#0f172a)",
            card: "rgba(30,41,59,0.6)",
            text: "#f1f5f9",
            sub: "#94a3b8",
            border: "#334155",
            primary: "#6366f1"
        }
    };

    const t = darkMode ? theme.dark : theme.light;

    const formatDate = (date) =>
        new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const res = await axios.get(`${API_BASE}/api/evaluation/history`, {
                    headers: { 'x-auth-token': token }
                });
                setHistory(res.data);
            } catch (err) {
                setError("Failed to load history");
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [navigate]);

    // 🔄 Loading
    if (loading) return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: t.bg,
            color: t.text
        }}>
            Loading...
        </div>
    );

    // ❌ Error
    if (error) return <div>{error}</div>;

    return (
        <div style={{
            minHeight: "100vh",
            background: t.bg,
            color: t.text,
            transition: "0.4s"
        }}>

            {/* NAVBAR */}
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem 2rem",
                backdropFilter: "blur(20px)",
                borderBottom: `1px solid ${t.border}`,
                position: "sticky",
                top: 0,
                zIndex: 10
            }}>
                <Link to="/dashboard">
                    <ProjectLogo />
                </Link>

                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

                    {/* SHARE BUTTON */}
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => setShowShare(!showShare)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "8px 14px",
                                borderRadius: "10px",
                                border: `1px solid ${t.border}`,
                                background: t.card,
                                color: t.text,
                                cursor: "pointer",
                                fontWeight: "600"
                            }}
                        >
                            <span style={{ fontSize: "16px" }}>⤴</span>
                            Share
                        </button>

                        {showShare && (
                            <div style={{
                                position: "absolute",
                                right: 0,
                                top: "120%",
                                background: t.card,
                                border: `1px solid ${t.border}`,
                                borderRadius: "12px",
                                padding: "8px",
                                minWidth: "160px",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                            }}>

                                <div
                                    onClick={() => window.open(`https://wa.me/?text=Check my evaluation 🚀`, "_blank")}
                                    style={styles.shareItem}
                                >
                                    🟢 WhatsApp
                                </div>

                                <div
                                    onClick={() => window.location.href = "mailto:?subject=My Evaluation&body=Check this out"}
                                    style={styles.shareItem}
                                >
                                    ✉️ Email
                                </div>

                            </div>
                        )}
                    </div>

                    {/* THEME TOGGLE */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        style={{
                            padding: "8px 14px",
                            borderRadius: "20px",
                            border: "none",
                            background: t.primary,
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        {darkMode ? "🌞" : "🌙"}
                    </button>

                    {/* FIXED SIDEBAR */}
                    <SidebarMenu color={t.text} />
                </div>
            </nav>

            {/* CONTENT */}
            <div style={{
                maxWidth: "900px",
                margin: "auto",
                padding: "3rem 1.5rem"
            }}>
                <h1 style={{
                    fontSize: "3rem",
                    fontWeight: "900",
                    marginBottom: "2rem"
                }}>
                    Evaluation <span style={{ color: t.primary }}>History</span>
                </h1>

                {history.length === 0 ? (
                    <div style={{ textAlign: "center" }}>
                        <h2>No History Found</h2>
                        <Link to="/evaluation">Start Assessment</Link>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        {history.map((item) => (
                            <div
                                key={item._id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "20px",
                                    borderRadius: "18px",
                                    background: t.card,
                                    backdropFilter: "blur(20px)",
                                    border: `1px solid ${t.border}`,
                                    transition: "0.3s"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-6px)";
                                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <div>
                                    <h3 style={{ fontSize: "1.4rem", fontWeight: "800" }}>
                                        {formatDate(item.createdAt)}
                                    </h3>
                                    <p style={{ color: t.sub }}>{item.status}</p>
                                    <p style={{ fontWeight: "600" }}>{item.companyPreference}</p>
                                </div>

                                <div style={{
                                    fontSize: "2.2rem",
                                    fontWeight: "900",
                                    color: t.primary
                                }}>
                                    {item.totalScore}
                                </div>

                                <Link
                                    to={`/result?id=${item._id}`}
                                    style={{
                                        background: "#000",
                                        color: "#fff",
                                        padding: "10px 18px",
                                        borderRadius: "10px",
                                        textDecoration: "none"
                                    }}
                                >
                                    View →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    shareItem: {
        padding: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500"
    }
};

export default History;