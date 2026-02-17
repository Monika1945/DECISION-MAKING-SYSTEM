import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            {/* Hamburger Icon */}
            <button
                onClick={toggleMenu}
                className="p-2 text-gray-800 hover:text-blue-600 transition focus:outline-none relative z-50"
                aria-label="Toggle Menu"
            >
                <div className={`w-6 h-1 bg-current mb-1 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-1 bg-current mb-1 transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-1 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>

            {/* Portal for Overlay and Sidebar */}
            {createPortal(
                <>
                    {/* Overlay */}
                    {isOpen && (
                        <div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999] transition-opacity"
                            onClick={toggleMenu}
                        ></div>
                    )}

                    {/* Sidebar */}
                    <div className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-2xl z-[1000] transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-10">
                                <span className="font-bold text-xl text-gray-800">Menu</span>
                                <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-600">
                                    ✕
                                </button>
                            </div>

                            <nav className="space-y-4">
                                <Link to="/" onClick={toggleMenu} className="block py-2 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition font-medium">
                                    Home
                                </Link>
                                <Link to="/profile" onClick={toggleMenu} className="block py-2 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition font-medium">
                                    Profile
                                </Link>
                                <Link to="/history" onClick={toggleMenu} className="block py-2 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition font-medium">
                                    History
                                </Link>
                                <Link to="/about" onClick={toggleMenu} className="block py-2 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition font-medium">
                                    About
                                </Link>
                                <div className="border-t border-gray-100 my-4"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left py-2 px-4 text-red-500 hover:bg-red-50 rounded-lg transition font-medium"
                                >
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>
                </>,
                document.body
            )}
        </div>
    );
};

export default SidebarMenu;
