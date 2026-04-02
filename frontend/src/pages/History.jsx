import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import API_BASE from '../config';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showShare, setShowShare] = useState(false);

    const navigate = useNavigate();

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

    if (loading) return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: 'var(--bg)', color: 'var(--text)' }}>
            Loading...
        </div>
    );

    if (error) return <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: 'var(--bg)', color: 'var(--text)' }}>{error}</div>;

    const shareAction = (
        <div style={{ position: "relative" }}>
            <button
                onClick={() => setShowShare(!showShare)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    border: `1px solid var(--border)`,
                    background: 'var(--card)',
                    color: 'var(--text)',
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
                    background: 'var(--card)',
                    border: `1px solid var(--border)`,
                    borderRadius: "12px",
                    padding: "8px",
                    minWidth: "160px",
                    boxShadow: "0 10px 30px var(--border)"
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
    );

    return (
        <div style={{ minHeight: "100vh", background: 'var(--bg)', color: 'var(--text)', transition: "0.4s" }}>
            <TopNav extraActions={shareAction} />

            <div style={{ maxWidth: "900px", margin: "auto", padding: "3rem 1.5rem" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "2rem" }}>
                    Evaluation <span style={{ color: 'var(--primary)' }}>History</span>
                </h1>

                {history.length === 0 ? (
                    <div style={{ textAlign: "center", background: 'var(--card)', padding: '3rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <h2 style={{ marginBottom: '1rem' }}>No History Found</h2>
                        <Link to="/evaluation" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>Start Assessment -{">"}</Link>
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
                                    padding: "20px 25px",
                                    borderRadius: "18px",
                                    background: 'var(--card)',
                                    backdropFilter: "blur(20px)",
                                    border: `1px solid var(--border)`,
                                    transition: "0.3s"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-4px)";
                                    e.currentTarget.style.boxShadow = "0 20px 40px var(--border)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <div>
                                    <h3 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: '4px' }}>
                                        {formatDate(item.createdAt)}
                                    </h3>
                                    <p style={{ color: 'var(--sub)' }}>{item.status}</p>
                                    <p style={{ fontWeight: "600", marginTop: '8px' }}>{item.companyPreference}</p>
                                </div>

                                <div style={{ fontSize: "2.2rem", fontWeight: "900", color: 'var(--primary)' }}>
                                    {item.totalScore}
                                </div>

                                <Link
                                    to={`/result?id=${item._id}`}
                                    style={{
                                        background: "var(--text)",
                                        color: "var(--bg)",
                                        padding: "10px 18px",
                                        borderRadius: "10px",
                                        textDecoration: "none",
                                        fontWeight: 'bold',
                                        transition: 'all 0.2s'
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
        fontWeight: "500",
        color: 'var(--text)'
    }
};

export default History;