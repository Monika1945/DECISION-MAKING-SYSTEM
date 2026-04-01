import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const API_BASE = "https://decision-backend-pl2m.onrender.com";

const Result = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResult = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            const searchParams = new URLSearchParams(location.search);
            const evalId = searchParams.get('id');

            try {
                const res = await axios.get(
                    evalId
                        ? `${API_BASE}/api/evaluation?id=${evalId}`
                        : `${API_BASE}/api/evaluation`,
                    {
                        headers: { 'x-auth-token': token }
                    }
                );

                setResult(res.data);
            } catch (err) {
                console.error(err);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [location.search, navigate]);

    // 🔄 LOADING
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="text-lg font-semibold">Loading Result...</div>
            </div>
        );
    }

    // ❌ NO RESULT
    if (!result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2>No Result Found</h2>
                <Link to="/evaluation" className="bg-blue-600 text-white px-5 py-2 rounded">
                    Take Assessment
                </Link>
            </div>
        );
    }

    // ✅ SCORES (UPDATED)
    const data = {
        labels: ['Aptitude', 'Logical', 'Verbal', 'Technical'],
        datasets: [
            {
                label: 'Scores',
                data: [
                    result.aptitudeScore || 0,
                    result.logicalScore || 0,
                    result.verbalScore || 0,
                    result.technicalScore || 0
                ],
                backgroundColor: [
                    '#3b82f6',
                    '#a855f7',
                    '#ec4899',
                    '#22c55e'
                ],
                borderRadius: 10
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true,
                max: 25
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* 🔝 NAVBAR */}
            <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
                <Link to="/dashboard">
                    <ProjectLogo />
                </Link>
                <SidebarMenu />
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-8">
                    🎯 Assessment Report
                </h1>

                <div className="grid md:grid-cols-3 gap-6">

                    {/* 📊 CHART */}
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Performance Overview</h2>
                        <div className="h-[350px]">
                            <Bar data={data} options={options} />
                        </div>
                    </div>

                    {/* 📌 SIDE INFO */}
                    <div className="space-y-5">

                        {/* STATUS */}
                        <div className="bg-indigo-600 text-white p-5 rounded-xl">
                            <h3 className="text-sm mb-1">STATUS</h3>
                            <div className="text-2xl font-bold">
                                {result.status}
                            </div>
                        </div>

                        {/* INTEREST */}
                        <div className="bg-white p-5 rounded-xl shadow">
                            <h3 className="font-semibold mb-2">Interest</h3>
                            <p className="text-gray-600">
                                {result.interest || "Not Provided"}
                            </p>
                        </div>

                        {/* COMPANY */}
                        <div className="bg-white p-5 rounded-xl shadow">
                            <h3 className="font-semibold mb-2">Company Preference</h3>
                            <p className="text-gray-600">
                                {result.companyPreference || "Not Selected"}
                            </p>
                        </div>

                        {/* RECOMMENDATIONS */}
                        <div className="bg-white p-5 rounded-xl shadow">
                            <h3 className="font-semibold mb-3">Recommendations</h3>

                            {(result.recommendations || []).length > 0 ? (
                                result.recommendations.map((rec, i) => (
                                    <p key={i} className="text-sm text-gray-600 mb-1">
                                        • {rec}
                                    </p>
                                ))
                            ) : (
                                <p className="text-gray-400">No suggestions</p>
                            )}
                        </div>

                        {/* RETAKE */}
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