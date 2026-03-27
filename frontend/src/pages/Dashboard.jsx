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

                const evalRes = await axios.get(`${API_BASE}/api/evaluation`, {
                    headers: { 'x-auth-token': token }
                });

                setUser(userRes.data);
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const scoreCategories = [
        { label: 'Technical', score: latestEval?.technicalScore, max: 50 },
        { label: 'Aptitude', score: latestEval?.aptitudeScore, max: 30 },
        { label: 'Communication', score: latestEval?.communicationScore, max: 30 },
        { label: 'Logical', score: latestEval?.logicalScore, max: 25 },
        { label: 'Leadership', score: latestEval?.leadershipScore, max: 15 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-[Inter]">

            {/* NAVBAR */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white/60 backdrop-blur-xl border-b sticky top-0 z-50">
                <ProjectLogo />

                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>

                    <SidebarMenu />
                </div>
            </nav>

            {/* MAIN */}
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            Dashboard 🚀
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Welcome back, {user?.name}
                        </p>
                    </div>

                    <Link
                        to="/evaluation"
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                    >
                        Retake Test
                    </Link>
                </div>

                {!latestEval ? (
                    <div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl text-center shadow-xl">
                        <h2 className="text-3xl font-bold mb-4">Start Your Journey 🚀</h2>
                        <p className="text-gray-600 mb-6">Take your first assessment now</p>

                        <Link
                            to="/evaluation"
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                        >
                            Start Now
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* SCORE */}
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl mb-8">
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-400 text-sm uppercase font-semibold">
                                    Placement Readiness
                                </span>

                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                    ${latestEval.status === 'Ready' ? 'bg-green-100 text-green-700' :
                                        latestEval.status === 'Nearly Ready' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'}`}>
                                    {latestEval.status}
                                </span>
                            </div>

                            <h2 className="text-6xl font-extrabold text-gray-900">
                                {latestEval.totalScore}
                                <span className="text-lg text-gray-400"> /150</span>
                            </h2>
                        </div>

                        {/* ANALYTICS */}
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl mb-8">
                            <h3 className="text-lg font-bold mb-6">Performance</h3>

                            {scoreCategories.map((cat, i) => (
                                <div key={i} className="mb-5">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{cat.label}</span>
                                        <span>{cat.score}/{cat.max}</span>
                                    </div>

                                    <div className="h-3 bg-gray-200 rounded-full">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                                            style={{ width: `${(cat.score / cat.max) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RECOMMENDATIONS */}
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
                            <h3 className="text-xl font-bold mb-4">Growth Plan</h3>

                            {latestEval.recommendations?.length > 0 ? (
                                latestEval.recommendations.map((rec, i) => (
                                    <div key={i} className="mb-3 p-4 bg-blue-50 rounded-xl">
                                        {rec}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">You're doing great 🚀</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;