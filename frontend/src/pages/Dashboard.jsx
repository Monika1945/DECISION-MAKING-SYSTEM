import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const API_BASE = "https://decision-backend-pl2m.onrender.com";

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
                setUser(userRes.data);

                const evalRes = await axios.get(`${API_BASE}/api/evaluation`, {
                    headers: { 'x-auth-token': token }
                });
                setLatestEval(evalRes.data);
            } catch (err) {
                console.error('Fetch error:', err);
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

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Gathering your progress...</p>
        </div>
    );

    const scoreCategories = [
        { label: 'Technical', score: latestEval?.technicalScore, max: 50, color: 'bg-blue-500' },
        { label: 'Aptitude', score: latestEval?.aptitudeScore, max: 30, color: 'bg-purple-500' },
        { label: 'Communication', score: latestEval?.communicationScore, max: 30, color: 'bg-green-500' },
        { label: 'Logical', score: latestEval?.logicalScore, max: 25, color: 'bg-orange-500' },
        { label: 'Leadership', score: latestEval?.leadershipScore, max: 15, color: 'bg-pink-500' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] font-[Inter] tracking-tight">

            {/* Navbar */}
            <nav className="bg-white/70 backdrop-blur-xl border-b px-8 py-3.5 flex justify-between items-center sticky top-0 shadow-sm">
                <Link to="/dashboard">
                    <ProjectLogo />
                </Link>

                <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>

                    <SidebarMenu />
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            Command <span className="text-blue-600">Center</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Track your placement readiness and performance.
                        </p>
                    </div>

                    <Link to="/evaluation" className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition">
                        Retake
                    </Link>
                </div>

                {!latestEval ? (
                    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">No Data Yet</h2>
                        <p className="mb-6">Take your first assessment to see results.</p>
                        <Link to="/evaluation" className="px-6 py-3 bg-white text-blue-700 rounded-xl font-bold">
                            Start Now
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Score Card */}
                        <div className="bg-white p-8 rounded-3xl shadow mb-8">
                            <div className="flex justify-between mb-4">
                                <p className="text-sm font-bold text-gray-400 uppercase">Readiness</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                    ${latestEval.status === 'Ready' ? 'bg-green-100 text-green-700' :
                                        latestEval.status === 'Nearly Ready' ? 'bg-orange-100 text-orange-700' :
                                            'bg-red-100 text-red-700'}`}>
                                    {latestEval.status}
                                </span>
                            </div>

                            <h3 className="text-5xl md:text-6xl font-extrabold text-gray-900">
                                {latestEval.totalScore}
                                <span className="text-lg text-gray-400"> /150</span>
                            </h3>

                            <p className="text-gray-500 mt-2">Overall Score</p>
                        </div>

                        {/* Analytics */}
                        <div className="bg-white p-8 rounded-3xl shadow mb-8">
                            <h3 className="text-sm font-bold text-gray-400 uppercase mb-6">Analytics</h3>

                            {scoreCategories.map((cat, idx) => (
                                <div key={idx} className="mb-5">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-bold">{cat.label}</span>
                                        <span>{cat.score} / {cat.max}</span>
                                    </div>

                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div
                                            className={`${cat.color} h-full rounded-full`}
                                            style={{ width: `${(cat.score / cat.max) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white p-8 rounded-3xl shadow">
                            <h3 className="text-xl font-bold mb-4">Recommendations</h3>

                            {latestEval.recommendations?.length > 0 ? (
                                latestEval.recommendations.slice(0, 2).map((rec, i) => (
                                    <div key={i} className="mb-3 p-4 bg-blue-50 rounded-xl">
                                        {rec}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">You're doing great. Keep it up!</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;