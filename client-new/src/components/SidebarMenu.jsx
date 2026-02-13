import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="fixed top-6 left-6 z-[100]">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center space-y-1.5 hover:bg-gray-50 transition-all duration-300"
            >
                <div className={`w-6 h-0.5 bg-gray-600 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-gray-600 transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-gray-600 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>

            {/* Sidebar Drawer */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[90] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 pt-24 space-y-8">
                    <div className="flex items-center space-x-3 mb-12">
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg"></div>
                        <span className="text-xl font-bold text-gray-800">ReadySetGo</span>
                    </div>

                    <nav className="space-y-4">
                        <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 font-medium p-3 rounded-lg hover:bg-blue-50 transition">
                            <span className="mr-3 text-xl">🏠</span> Home
                        </Link>
                        <Link to="/about" className="flex items-center text-gray-600 hover:text-blue-600 font-medium p-3 rounded-lg hover:bg-blue-50 transition">
                            <span className="mr-3 text-xl">ℹ️</span> About
                        </Link>
                        {token && (
                            <>
                                <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 font-medium p-3 rounded-lg hover:bg-blue-50 transition">
                                    <span className="mr-3 text-xl">👤</span> Profile
                                </Link>
                                <Link to="/result" className="flex items-center text-gray-600 hover:text-blue-600 font-medium p-3 rounded-lg hover:bg-blue-50 transition">
                                    <span className="mr-3 text-xl">📜</span> History
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center text-red-500 hover:text-red-700 font-medium p-3 rounded-lg hover:bg-red-50 transition mt-12"
                                >
                                    <span className="mr-3 text-xl">🚪</span> Logout
                                </button>
                            </>
                        )}
                        {!token && (
                            <Link to="/login" className="flex items-center text-blue-600 hover:text-blue-700 font-medium p-3 rounded-lg bg-blue-50 mt-12">
                                <span className="mr-3 text-xl">🔑</span> Login
                            </Link>
                        )}
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm z-[80]"
                ></div>
            )}
        </div>
    );
};

export default SidebarMenu;
