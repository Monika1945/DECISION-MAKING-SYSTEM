import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden relative">
            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg"></div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        ReadySetGo
                    </span>
                </div>
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition">Login</Link>
                    <Link to="/signup" className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 container mx-auto px-6 pt-20 pb-32 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Unlock Your <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Career Potential
                    </span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Assess your technical skills, aptitude, and communication with our AI-powered readiness system. Get personalized recommendations and land your dream job.
                </p>

                <div className="flex justify-center space-x-4">
                    <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-200">
                        Get Started Free
                    </Link>
                    <Link to="/login" className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition">
                        Log In
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="glass-panel p-8 rounded-2xl hover:shadow-lg transition duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto text-2xl">
                            🚀
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Skill Analysis</h3>
                        <p className="text-gray-600">Comprehensive evaluation of your technical and soft skills.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl hover:shadow-lg transition duration-300">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto text-2xl">
                            📊
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Insights</h3>
                        <p className="text-gray-600">Understand your strengths and weaknesses with interactive charts.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl hover:shadow-lg transition duration-300">
                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 mx-auto text-2xl">
                            🎯
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Targets</h3>
                        <p className="text-gray-600">Receive tailored roadmap to improve your readiness score.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
