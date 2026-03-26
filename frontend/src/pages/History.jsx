import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const API_BASE = "https://decision-making-system.onrender.com";

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                console.error('Fetch history error:', err);

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Retrieving your history...</p>
        </div>
    );

    // ❌ Error UI
    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500 font-bold">{error}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfd] relative overflow-x-hidden font-sans pb-20">

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
                </div>

                {history.length === 0 ? (
                    <div className="text-center">
                        <h2>No History Found</h2>
                        <Link to="/evaluation">Start Assessment</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {history.map((item) => (
                            <div key={item._id} className="bg-white rounded-xl p-6 flex justify-between items-center shadow">

                                <div>
                                    <h3 className="font-bold">
                                        {formatDate(item.createdAt)}
                                    </h3>
                                    <p>{item.status}</p>
                                    <p>{item.companyPreference}</p>
                                </div>

                                <div>
                                    <p className="text-xl font-bold">{item.totalScore}</p>
                                </div>

                                <Link
                                    to={`/result?id=${item._id}`}
                                    className="bg-black text-white px-4 py-2 rounded"
                                >
                                    View
                                </Link>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;