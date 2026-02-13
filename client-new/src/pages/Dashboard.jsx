import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const res = await axios.get('http://localhost:5000/api/auth/user', {
                    headers: { 'x-auth-token': token }
                });
                setUser(res.data);
            } catch (err) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">Loading your profile...</div>;

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            <SidebarMenu />

            {/* Background Ambience */}

            <div className="container mx-auto px-6 py-12 relative z-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="glass-panel p-8 rounded-2xl md:col-span-1 h-fit">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-4 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Department</span>
                                <span className="font-semibold text-gray-800">{user.department || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Year</span>
                                <span className="font-semibold text-gray-800">{user.year || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Backlogs</span>
                                <span className="font-semibold text-gray-800">{user.backlogs || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions & Stats */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Action Banner */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0">
                                <h2 className="text-2xl font-bold mb-2">Ready to assess your skills?</h2>
                                <p className="text-blue-100 opacity-90">Take a comprehensive test to check your placement readiness.</p>
                            </div>
                            <Link to="/evaluation" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-50 transition transform hover:scale-105">
                                Start Evaluation
                            </Link>
                        </div>

                        {/* Quick Links / Stats Placeholder */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                                <h3 className="text-gray-500 font-medium mb-1">Previous Reports</h3>
                                <p className="text-3xl font-bold text-gray-800">View</p>
                                <Link to="/result" className="text-blue-600 text-sm font-semibold mt-4 block hover:underline">Check history &rarr;</Link>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                                <h3 className="text-gray-500 font-medium mb-1">Profile Completion</h3>
                                <p className="text-3xl font-bold text-gray-800">100%</p>
                                <span className="text-green-500 text-sm font-semibold mt-4 block">You are all set!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
