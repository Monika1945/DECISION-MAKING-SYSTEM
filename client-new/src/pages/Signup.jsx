import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', department: '', year: '', cgpa: '', backlogs: 0
    });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden py-12">
            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
                <div className="absolute top-[10%] right-[10%] w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 glass-panel p-10 rounded-2xl shadow-xl w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">Full Name</label>
                        <input type="text" name="name" onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
                        <input type="email" name="email" onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
                        <input type="password" name="password" onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-1">Department</label>
                            <input type="text" name="department" onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-1">Year</label>
                            <input type="text" name="year" onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 internal-shadow rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 mt-4">
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
