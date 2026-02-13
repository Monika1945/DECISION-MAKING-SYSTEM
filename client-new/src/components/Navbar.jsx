import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleProfileClick = (e) => {
        if (!token) {
            e.preventDefault();
            navigate('/login');
        }
    };

    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If on another page, navigate to about and then scroll (simplified for now)
            navigate('/about#contact');
        }
    };

    return (
        <nav className="relative z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0">
            <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    ReadySetGo
                </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">About</Link>
                <Link to="/dashboard" onClick={handleProfileClick} className="text-gray-600 hover:text-blue-600 font-medium transition">Profile</Link>
                <a href="#contact" onClick={scrollToContact} className="text-gray-600 hover:text-blue-600 font-medium transition">Contact Me</a>
            </div>

            <div className="flex items-center space-x-4">
                {!token ? (
                    <>
                        <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition">Login</Link>
                        <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <Link to="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
                        Dashboard
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
