import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ✅ Use deployed API
const API_BASE = "https://decision-making-system.onrender.com";

const Result = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResult = async () => {
            const token = localStorage.getItem('token');

            // ✅ Redirect if not logged in
            if (!token) return navigate('/login');

            const searchParams = new URLSearchParams(location.search);
            const evalId = searchParams.get('id');

            const url = evalId
                ? `${API_BASE}/api/evaluation?id=${evalId}`
                : `${API_BASE}/api/evaluation`;

            try {
                const res = await axios.get(url, {
                    headers: { 'x-auth-token': token }
                });
                setResult(res.data);
            } catch (err) {
                console.error('Error fetching result:', err);

                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [location.search, navigate]);

    // ✅ Loading UI
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">Loading report...</p>
            </div>
        );
    }

    // ✅ No result UI
    if (!result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
                <div className="text-2xl font-bold text-gray-400">No evaluation found.</div>
                <Link to="/evaluation" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
                    Take Assessment
                </Link>
            </div>
        );
    }

    // ✅ Chart Data
    const data = {
        labels: ['Technical', 'Aptitude', 'Communication', 'Logical', 'Leadership', 'Total'],
        datasets: [
            {
                label: 'Scores',
                data: [
                    result.technicalScore || 0,
                    result.aptitudeScore || 0,
                    result.communicationScore || 0,
                    result.logicalScore || 0,
                    result.leadershipScore || 0,
                    result.totalScore || 0
                ],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(79, 70, 229, 0.8)'
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
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 150,
            },
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] relative overflow-x-hidden pb-20">
            {/* Navbar */}
            <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
                <Link to="/dashboard">
                    <ProjectLogo />
                </Link>
                <SidebarMenu />
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-10">Assessment Report</h1>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Chart */}
                    <div className="lg:col-span-8 bg-white p-6 rounded-xl shadow">
                        <div className="h-[400px]">
                            <Bar data={data} options={options} />
                        </div>
                    </div>

                    {/* Status + Recommendations */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Status */}
                        <div className="p-6 rounded-xl bg-blue-600 text-white">
                            <h3 className="text-sm uppercase mb-2">Status</h3>
                            <div className="text-3xl font-bold">{result.status}</div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold mb-4">Recommendations</h3>

                            {(result.recommendations || []).length > 0 ? (
                                result.recommendations.map((rec, index) => (
                                    <p key={index} className="text-sm text-gray-600 mb-2">
                                        {index + 1}. {rec}
                                    </p>
                                ))
                            ) : (
                                <p className="text-gray-400">No recommendations available</p>
                            )}
                        </div>

                        <Link
                            to="/evaluation"
                            className="block text-center bg-black text-white py-3 rounded-lg"
                        >
                            Retake Assessment
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;