import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link, useLocation } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Result = () => {
    const [result, setResult] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchResult = async () => {
            const token = localStorage.getItem('token');
            const searchParams = new URLSearchParams(location.search);
            const evalId = searchParams.get('id');
            const url = evalId ? `http://localhost:5000/api/evaluation?id=${evalId}` : 'http://localhost:5000/api/evaluation';

            try {
                const res = await axios.get(url, {
                    headers: { 'x-auth-token': token }
                });
                setResult(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchResult();
    }, [location.search]);

    if (!result) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
            <div className="text-2xl font-bold text-gray-400">No evaluation found.</div>
            <Link to="/evaluation" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">Take Assessment</Link>
        </div>
    );

    const data = {
        labels: ['Technical', 'Aptitude', 'Communication', 'Logical', 'Leadership', 'Total'],
        datasets: [
            {
                label: 'Scores',
                data: [
                    result.technicalScore,
                    result.aptitudeScore,
                    result.communicationScore,
                    result.logicalScore,
                    result.leadershipScore,
                    result.totalScore
                ],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)', // Blue
                    'rgba(168, 85, 247, 0.8)', // Purple
                    'rgba(236, 72, 153, 0.8)', // Pink
                    'rgba(245, 158, 11, 0.8)', // Amber
                    'rgba(16, 185, 129, 0.8)', // Emerald
                    'rgba(79, 70, 229, 0.8)'   // Indigo (Total)
                ],
                borderRadius: 12,
                barThickness: 40,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 150,
                grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
                ticks: { font: { weight: '600' } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { weight: '600' } }
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] relative overflow-x-hidden pb-20">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>

            <nav className="relative z-30 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 shadow-sm text-gray-800">
                <Link to="/dashboard">
                    <ProjectLogo className="w-9 h-9" />
                </Link>
                <SidebarMenu />
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
                            Assessment <span className="text-blue-600 italic">Report</span>
                        </h1>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Comprehensive Placement Readiness Analysis</p>
                    </div>
                    <div className="bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-50 flex items-center space-x-2">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest px-4">Generated on</span>
                        <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100">
                            {new Date(result.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Analytics Section */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Visualization Card */}
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-2xl shadow-blue-900/5 min-h-[500px]">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">📊</span>
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Performance Profile</h3>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assessment Data</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[400px]">
                                <Bar data={data} options={options} />
                            </div>
                        </div>

                        {/* Technical Skill Map */}
                        {result.technicalSkills && result.technicalSkills.length > 0 && (
                            <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-2xl shadow-blue-900/5">
                                <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-gray-50">
                                    <span className="text-3xl">🧩</span>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Technical Skill Map</h3>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Granular breakdown of your expertise areas.</p>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                                    {result.technicalSkills.map((skill, index) => (
                                        <div key={index} className="space-y-4 group">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 block">Level {skill.rating}</span>
                                                    <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest group-hover:text-blue-600 transition-colors uppercase">{skill.skill}</h4>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xl font-black text-gray-900 tracking-tighter">{skill.rating * 10}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-2.5 bg-gray-100 rounded-full p-0.5 shadow-inner">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]"
                                                    style={{ width: `${(skill.rating / 10) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Status & Recommendations */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Status Card */}
                        <div className={`p-10 rounded-[3rem] text-white shadow-3xl overflow-hidden relative group ${result.status === 'Ready' ? 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-500/20' :
                            result.status === 'Nearly Ready' ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-orange-500/20' :
                                'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/20'
                            }`}>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="relative z-10">
                                <h3 className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Readiness Verdict</h3>
                                <div className="text-5xl font-black tracking-tighter leading-none mb-6">
                                    {result.status}
                                </div>
                                <div className="space-y-4 pt-6 border-t border-white/20">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-lg">💡</div>
                                        <p className="text-sm font-bold text-white/90">
                                            {result.status === 'Ready' ? 'Prime candidate for high-tier roles.' :
                                                result.status === 'Nearly Ready' ? 'Minor refinements needed to excel.' :
                                                    'Dedicated mentorship recommended.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations Card */}
                        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-2xl shadow-blue-900/5">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center">
                                <span className="mr-3">🚀</span> Strategic Roadmap
                            </h3>
                            <div className="space-y-6">
                                {result.recommendations.map((rec, index) => (
                                    <div key={index} className="flex space-x-4 p-5 rounded-3xl hover:bg-white transition bg-slate-50 shadow-sm border border-gray-50 group">
                                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-black text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {index + 1}
                                        </div>
                                        <p className="text-sm font-bold text-gray-600 leading-relaxed capitalize">{rec}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            to="/evaluation"
                            className="w-full py-6 rounded-3xl bg-gray-900 text-white font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center shadow-2xl hover:bg-black hover:-translate-y-1 active:scale-95 transition-all group"
                        >
                            Retake Assessment
                            <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
