import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Result = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/evaluation', {
                    headers: { 'x-auth-token': token }
                });
                setResult(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchResult();
    }, []);

    if (!result) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
            <SidebarMenu />
            <div className="text-2xl font-bold text-gray-400">No evaluation found.</div>
            <Link to="/evaluation" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">Take Assessment</Link>
        </div>
    );

    const data = {
        labels: ['Technical', 'Aptitude', 'Communication', 'Total'],
        datasets: [
            {
                label: 'Scores',
                data: [result.technicalScore, result.aptitudeScore, result.communicationScore, result.totalScore],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)', // Blue
                    'rgba(168, 85, 247, 0.8)', // Purple
                    'rgba(236, 72, 153, 0.8)', // Pink
                    'rgba(251, 191, 36, 0.8)'  // Amber
                ],
                borderRadius: 8,
                barThickness: 50,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(0,0,0,0.05)' }
            },
            x: {
                grid: { display: false }
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <SidebarMenu />
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Analysis Result</h1>
                    <Link to="/dashboard" className="text-gray-500 hover:text-gray-800 font-medium">Back to Dashboard</Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Chart Section */}
                    <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-96">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Performance Visusalization</h3>
                        <div className="h-full pb-8">
                            <Bar data={data} options={options} />
                        </div>
                    </div>

                    {/* Status & Recommendations */}
                    <div className="space-y-6">
                        <div className={`p-8 rounded-2xl text-white shadow-lg ${result.status === 'Ready' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                            result.status === 'Nearly Ready' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                                'bg-gradient-to-br from-red-500 to-pink-600'
                            }`}>
                            <h3 className="text-white/80 font-medium uppercase tracking-wider text-sm mb-1">Readiness Status</h3>
                            <div className="text-4xl font-extrabold">{result.status}</div>
                            <div className="mt-4 pt-4 border-t border-white/20 text-white/90 text-sm">
                                {result.status === 'Ready' ? 'Great job! You are ready to crack interviews.' : 'Keep practicing, you are getting there!'}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Recommendations</h3>
                            <ul className="space-y-3">
                                {result.recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start text-gray-600 text-sm">
                                        <span className="text-blue-500 mr-3 mt-0.5">•</span>
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
