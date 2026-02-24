import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

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
                const userRes = await axios.get('http://localhost:5000/api/auth/user', {
                    headers: { 'x-auth-token': token }
                });
                setUser(userRes.data);

                const evalRes = await axios.get('http://localhost:5000/api/evaluation', {
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
        <div className="min-h-screen bg-[#f8fafc] relative overflow-x-hidden font-sans selection:bg-blue-100">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px] -ml-64 -mb-64 animate-pulse delay-1000"></div>

            {/* Navbar */}
            <nav className="relative z-30 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 px-8 py-3.5 flex justify-between items-center sticky top-0 shadow-sm">
                <Link to="/dashboard">
                    <ProjectLogo />
                </Link>
                <div className="flex items-center space-x-5">
                    <div className="hidden sm:flex flex-col items-end mr-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Student</span>
                        <span className="text-sm font-bold text-gray-900">{user.name}</span>
                    </div>
                    <SidebarMenu />
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-10 relative z-20">
                {/* Hero Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                            Command <span className="text-blue-600">Center</span>
                        </h1>
                        <p className="text-gray-500 max-w-md font-medium">
                            Your comprehensive placement readiness dashboard. Track scores, improve skills, and get hired.
                        </p>
                    </div>
                    <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100 self-start md:self-auto">
                        <Link to="/evaluation" className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition shadow-lg hover:shadow-xl active:scale-95">
                            Retake Assessment
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Stats & Profile */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Profile Overview */}
                        <div className="glass-panel p-8 rounded-[2.5rem] bg-white border-gray-100 shadow-xl shadow-blue-900/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="flex items-center space-x-5 mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-500/30 transform group-hover:scale-105 transition-transform overflow-hidden">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900">{user.name}</h2>
                                        <p className="text-blue-600 font-bold text-sm tracking-wide">{user.profession || 'Ready Student'}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: 'Department', value: user.department, icon: '🏢' },
                                        { label: 'Study Year', value: user.year, icon: '🎓' },
                                        { label: 'Backlogs', value: user.backlogs, icon: '⚠️', color: user.backlogs > 0 ? 'text-red-500' : 'text-gray-800' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-gray-100/50">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg">{item.icon}</span>
                                                <span className="text-sm font-bold text-gray-500 uppercase tracking-tighter">{item.label}</span>
                                            </div>
                                            <span className={`font-black ${item.color || 'text-gray-800'}`}>{item.value || 'N/A'}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/profile" className="mt-8 block w-full py-4 bg-slate-900 text-white text-center rounded-2xl font-black shadow-xl hover:bg-black transition-all active:scale-[0.98]">
                                    Complete Profile
                                </Link>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-white rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-200/20 text-center">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Reports</p>
                                <p className="text-3xl font-black text-gray-900">01</p>
                                <Link to="/result" className="text-xs font-bold text-blue-600 hover:underline mt-2 inline-block leading-none">View All</Link>
                            </div>
                            <div className="p-6 bg-white rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-200/20 text-center">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                <div className="flex items-center justify-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <p className="text-sm font-black text-gray-900">Active</p>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold mt-2">v1.2.0 Stable</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Analytics & Latest Result */}
                    <div className="lg:col-span-8 space-y-8">
                        {!latestEval ? (
                            /* Empty State Assessment Call */
                            <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-blue-900/20 flex flex-col items-center text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-md">
                                    <span className="text-5xl">🎯</span>
                                </div>
                                <h2 className="text-4xl font-black mb-4 tracking-tighter">Your Scoreboard is Empty</h2>
                                <p className="text-blue-100 text-lg mb-10 max-w-md font-medium">Complete your first evaluation to unlock the Command Center analytics and get your readiness status.</p>
                                <Link to="/evaluation" className="px-12 py-5 bg-white text-blue-700 rounded-2xl font-black text-xl shadow-2xl hover:bg-gray-50 transition transform hover:scale-105 active:scale-95">
                                    Start Now
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Latest Evaluation Summary */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Main Score Card */}
                                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-900/5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Placement Readiness</p>
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${latestEval.status === 'Ready' ? 'bg-green-100 text-green-700' :
                                                    latestEval.status === 'Nearly Ready' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {latestEval.status}
                                                </span>
                                            </div>
                                            <div className="flex items-baseline space-x-2">
                                                <h3 className="text-6xl font-black text-gray-900 leading-none">{latestEval.totalScore}</h3>
                                                <span className="text-xl font-bold text-gray-400">/ 150</span>
                                            </div>
                                            <p className="text-gray-500 font-bold mt-4">Composite Readiness Index</p>
                                        </div>
                                        <div className="mt-8 pt-8 border-t border-gray-100">
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${['bg-blue-500', 'bg-purple-500', 'bg-orange-500'][i - 1]}`}></div>)}
                                                </div>
                                                <span className="text-gray-600 font-bold">Top 5% of your class</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score Breakdown Bars */}
                                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-900/5">
                                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Performance Analytics</h3>
                                        <div className="space-y-5">
                                            {scoreCategories.map((cat, idx) => (
                                                <div key={idx} className="space-y-2">
                                                    <div className="flex justify-between items-end text-sm">
                                                        <span className="font-black text-gray-800 tracking-tight">{cat.label}</span>
                                                        <span className="font-bold text-gray-500">{cat.score} <span className="text-[10px] opacity-60">/ {cat.max}</span></span>
                                                    </div>
                                                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${cat.color} rounded-full transition-all duration-1000 ease-out`}
                                                            style={{ width: `${(cat.score / cat.max) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Active Recommendation */}
                                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-xl shadow-gray-900/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <span className="text-8xl">🚀</span>
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight flex items-center">
                                            Growth Roadmap
                                            <span className="ml-3 text-xs bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Priority</span>
                                        </h3>
                                        <div className="space-y-4">
                                            {latestEval.recommendations && latestEval.recommendations.length > 0 ? (
                                                latestEval.recommendations.slice(0, 2).map((rec, idx) => (
                                                    <div key={idx} className="flex items-start space-x-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                                        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0">
                                                            {idx + 1}
                                                        </div>
                                                        <p className="text-gray-800 font-bold leading-snug">{rec}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 font-medium">You are performing exceptionally well. Keep maintaining your standards!</p>
                                            )}
                                        </div>
                                        <Link to="/result" className="mt-8 inline-flex items-center text-blue-600 font-black tracking-tight group">
                                            Full Strategic Report
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
