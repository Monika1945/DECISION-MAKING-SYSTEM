import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import API_BASE from '../config';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [latestEval, setLatestEval] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const userRes = await axios.get(`${API_BASE}/api/auth/user`, {
                    headers: { 'x-auth-token': token }
                });

                const evalRes = await axios.get(`${API_BASE}/api/evaluation`, {
                    headers: { 'x-auth-token': token }
                });

                setUser(userRes.data);
                // Save name and email for avatar
                if (userRes.data.name) localStorage.setItem('userName', userRes.data.name);
                if (userRes.data.email) localStorage.setItem('userEmail', userRes.data.email);

                setLatestEval(evalRes.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
                <div style={{ width: '3rem', height: '3rem', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <style>{"@keyframes spin { 100% { transform: rotate(360deg); } }"}</style>
            </div>
        );
    }

    const totalScore = latestEval?.totalScore || 0;
    const maxScore = latestEval?.maxScore || 20;
    const percent = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const lastAssessmentDate = latestEval?.createdAt
        ? new Date(latestEval.createdAt).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
        : null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--text)', transition: 'all 0.5s' }}>
            <TopNav />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                        Welcome back, {user?.name}
                    </h1>
                    <p style={{ color: 'var(--sub)', fontSize: '1.1rem' }}>
                        Keep building your placement readiness one assessment at a time.
                    </p>
                </div>

                {!latestEval ? (
                    <div style={{ padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: 'var(--card)', textAlign: 'center', border: '1px solid var(--border)', boxShadow: '0 10px 30px var(--border)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                            Start your journey
                        </h2>
                        <p style={{ color: 'var(--sub)', marginBottom: '1.5rem' }}>
                            Take your first assessment and unlock insights.
                        </p>

                        <Link
                            to="/evaluation"
                            style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: '600' }}
                        >
                            Start Now
                        </Link>
                    </div>
                ) : (
                    <>
                        <div style={{ padding: '2rem', borderRadius: '1.5rem', backgroundColor: 'var(--card)', marginBottom: '2rem', border: '1px solid var(--border)', boxShadow: '0 10px 30px var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--sub)', marginBottom: '0.5rem' }}>
                                    Your most recent assessment
                                </p>

                                <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                                    {totalScore} / {maxScore}
                                </h2>

                                <p style={{ marginTop: '0.5rem', color: '#4ade80', fontWeight: '600' }}>
                                    {latestEval.status}
                                </p>

                                <p style={{ color: 'var(--sub)', marginTop: '0.25rem' }}>
                                    {percent.toFixed(1)}%
                                </p>

                                {lastAssessmentDate && (
                                    <p style={{ color: 'var(--sub)', marginTop: '0.25rem', fontSize: '0.875rem' }}>
                                        Last attended: {lastAssessmentDate}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() => navigate('/evaluation')}
                                style={{ padding: '0.75rem 1.25rem', background: 'var(--primary)', borderRadius: '0.75rem', color: 'white', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}
                            >
                                Retake Test
                            </button>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Performance Breakdown</h3>
                            <p style={{ color: 'var(--sub)', marginBottom: '1.5rem' }}>
                                Track your strengths and areas to improve.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                                {[
                                    { label: 'Aptitude', score: latestEval.aptitudeScore || 0, max: 5 },
                                    { label: 'Logical', score: latestEval.logicalScore || 0, max: 5 },
                                    { label: 'Verbal', score: latestEval.communicationScore || 0, max: 5 },
                                    { label: 'Technical', score: latestEval.technicalScore || 0, max: 5 },
                                ].map((item, i) => {
                                    const sectionPercent = Math.round((item.score / item.max) * 100);

                                    let sectionStatus = "";
                                    let color = "";

                                    if (sectionPercent >= 75) {
                                        sectionStatus = "Strong";
                                        color = "#4ade80";
                                    } else if (sectionPercent >= 50) {
                                        sectionStatus = "Average";
                                        color = "#facc15";
                                    } else {
                                        sectionStatus = "Needs Focus";
                                        color = "#f87171";
                                    }

                                    return (
                                        <div
                                            key={i}
                                            style={{ padding: '1.25rem', borderRadius: '1rem', backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                                <h4 style={{ fontWeight: '600' }}>{item.label}</h4>
                                                <span style={{ fontSize: '0.875rem', fontWeight: '600', color }}>
                                                    {sectionStatus}
                                                </span>
                                            </div>

                                            <p style={{ fontSize: '0.875rem', color: 'var(--sub)', marginBottom: '0.5rem' }}>
                                                {item.score} / {item.max}
                                            </p>

                                            <div style={{ height: '0.5rem', backgroundColor: 'var(--border)', borderRadius: '9999px', marginBottom: '0.5rem', overflow: 'hidden' }}>
                                                <div
                                                    style={{ height: '100%', backgroundColor: 'var(--primary)', borderRadius: '9999px', width: `${sectionPercent}%`, transition: 'all 0.5s' }}
                                                />
                                            </div>

                                            <p style={{ fontSize: '0.75rem', color: 'var(--sub)' }}>
                                                {sectionPercent}% completed
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ padding: '2rem', borderRadius: '1.5rem', backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Growth Plan</h3>

                            {latestEval.recommendations?.map((rec, i) => (
                                <div key={i} style={{ padding: '0.75rem', marginBottom: '0.5rem', backgroundColor: 'var(--border)', borderRadius: '0.5rem' }}>
                                    {rec}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
