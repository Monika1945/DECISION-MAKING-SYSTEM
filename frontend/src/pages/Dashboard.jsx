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
    const [darkMode, setDarkMode] = useState(true);

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
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const theme = darkMode
        ? "bg-black text-white"
        : "bg-gradient-to-br from-slate-50 to-blue-100 text-gray-900";

    return (
        <div className={`min-h-screen ${theme} transition-all duration-500`}>

            {/* NAVBAR */}
            <nav className="flex justify-between items-center px-8 py-4 backdrop-blur-xl border-b border-white/10">
                <ProjectLogo />

                <div className="flex items-center gap-4">

                    {/* THEME TOGGLE */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    >
                        {darkMode ? "🌙 Dark" : "☀️ Light"}
                    </button>

                    {/* AVATAR */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>

                    <SidebarMenu />
                </div>
            </nav>

            {/* MAIN */}
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* HEADER */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold">
                        Welcome back, {user?.name} 👋
                    </h1>
                    <p className="text-gray-400 mt-2">
                        You're doing great 🚀 keep improving your skills everyday
                    </p>
                </div>

                {!latestEval ? (
                    <div className="p-10 rounded-3xl backdrop-blur-xl bg-white/10 text-center">
                        <h2 className="text-2xl font-bold mb-3">
                            Start your journey 🚀
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Take your first assessment and unlock insights 📊
                        </p>

                        <Link
                            to="/evaluation"
                            className="px-6 py-3 bg-purple-600 rounded-xl"
                        >
                            Start Now
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* SCORE */}
                        <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl mb-8 hover:scale-[1.02] transition">
                            <p className="text-sm text-gray-400 mb-2">
                                Your current readiness status 🎯
                            </p>

                            <h2 className="text-5xl font-bold">
                                {latestEval.totalScore} / 150
                            </h2>

                            <p className="mt-2 text-green-400">
                                {latestEval.status} ✅
                            </p>
                        </div>

                        {/* MESSAGE */}
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
                            <p className="text-lg font-semibold">
                                📈 You're improving consistently! Keep pushing forward 💪
                            </p>
                        </div>

                        {/* PERFORMANCE */}
                        <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl mb-8">
                            <h3 className="mb-4 font-bold">Performance Breakdown 📊</h3>

                            {[
                                { label: 'Technical', score: latestEval.technicalScore, max: 50 },
                                { label: 'Aptitude', score: latestEval.aptitudeScore, max: 30 },
                                { label: 'Communication', score: latestEval.communicationScore, max: 30 },
                                { label: 'Logical', score: latestEval.logicalScore, max: 25 },
                                { label: 'Leadership', score: latestEval.leadershipScore, max: 15 },
                            ].map((item, i) => (
                                <div key={i} className="mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span>{item.label}</span>
                                        <span>{item.score}/{item.max}</span>
                                    </div>

                                    <div className="h-2 bg-white/10 rounded-full">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                            style={{ width: `${(item.score / item.max) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RECOMMENDATIONS */}
                        <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl">
                            <h3 className="font-bold mb-4">Growth Plan 🧠</h3>

                            {latestEval.recommendations?.map((rec, i) => (
                                <div key={i} className="p-3 mb-2 bg-white/10 rounded-lg">
                                    👉 {rec}
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