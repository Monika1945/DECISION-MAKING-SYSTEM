import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const res = await axios.get('http://localhost:5000/api/evaluation/history', {
                    headers: { 'x-auth-token': token }
                });
                setHistory(res.data);
            } catch (err) {
                console.error('Fetch history error:', err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [navigate]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Retrieving your history...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfd] relative overflow-x-hidden font-sans pb-20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none"></div>

            <nav className="relative z-30 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 shadow-sm">
                <Link to="/dashboard">
                    <ProjectLogo className="w-9 h-9" />
                </Link>
                <SidebarMenu />
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
                <div className="mb-14">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tighter">
                        Evaluation <span className="text-blue-600 italic">History</span>
                    </h1>
                    <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em] pl-1">Track your placement journey and performance evolution.</p>
                </div>

                {history.length === 0 ? (
                    <div className="bg-white/70 backdrop-blur-xl rounded-[3.5rem] border border-white p-20 text-center shadow-2xl shadow-blue-900/5">
                        <div className="text-7xl mb-8 grayscale opacity-50">📝</div>
                        <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">No History Found</h2>
                        <p className="text-gray-400 mb-10 max-w-sm mx-auto font-bold uppercase text-[10px] tracking-widest leading-relaxed">Your assessment journey starts here. Take your first analysis to unlock insights.</p>
                        <Link to="/evaluation" className="px-12 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition shadow-2xl active:scale-95 inline-flex items-center group">
                            Start Assessment
                            <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {history.map((item) => (
                            <div key={item._id} className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex items-center space-x-8">
                                    <div className={`w-20 h-20 rounded-[2rem] flex flex-col items-center justify-center font-black shadow-inner border border-white/50 ${item.status === 'Ready' ? 'bg-blue-50 text-blue-600' :
                                        item.status === 'Nearly Ready' ? 'bg-amber-50 text-amber-600' :
                                            'bg-rose-50 text-rose-600'
                                        }`}>
                                        <span className="text-3xl tracking-tighter">{item.totalScore}</span>
                                        <span className="text-[9px] opacity-40 uppercase tracking-widest -mt-1">Pts</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">
                                            {new Date(item.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </h3>
                                        <div className="flex items-center space-x-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${item.status === 'Ready' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                item.status === 'Nearly Ready' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                    'bg-rose-50 text-rose-700 border-rose-100'
                                                }`}>
                                                {item.status}
                                            </span>
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                                {item.companyPreference}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 md:mt-0">
                                    <Link
                                        to={`/result?id=${item._id}`}
                                        className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition shadow-xl active:scale-95 inline-flex items-center"
                                    >
                                        Inspect Report
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
