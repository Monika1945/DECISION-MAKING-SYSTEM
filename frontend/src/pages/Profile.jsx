import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        college: '',
        cgpa: '',
        profession: '',
        department: '',
        year: '',
        backlogs: '',
        mobile: '',
        skills: '',
        linkedin: '',
        github: '',
        profileImage: '',
        competencies: []
    });
    const [newCompetency, setNewCompetency] = useState({ skill: '', rating: 1 });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
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
                setFormData({
                    name: res.data.name || '',
                    city: res.data.city || '',
                    college: res.data.college || '',
                    cgpa: res.data.cgpa || '',
                    profession: res.data.profession || '',
                    department: res.data.department || '',
                    year: res.data.year || '',
                    backlogs: res.data.backlogs || '',
                    mobile: res.data.mobile || '',
                    skills: res.data.skills ? res.data.skills.join(', ') : '',
                    linkedin: res.data.linkedin || '',
                    github: res.data.github || '',
                    profileImage: res.data.profileImage || '/img3.png',
                    competencies: res.data.competencies || []
                });
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddCompetency = () => {
        if (!newCompetency.skill.trim()) return;
        setFormData({
            ...formData,
            competencies: [...formData.competencies, newCompetency]
        });
        setNewCompetency({ skill: '', rating: 1 });
    };

    const handleRemoveCompetency = (index) => {
        setFormData({
            ...formData,
            competencies: formData.competencies.filter((_, i) => i !== index)
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        const token = localStorage.getItem('token');

        try {
            const res = await axios.put('http://localhost:5000/api/auth/profile', formData, {
                headers: { 'x-auth-token': token }
            });
            setUser(res.data);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-x-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>

            <nav className="relative z-30 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-8 py-3.5 flex justify-between items-center sticky top-0 shadow-sm">
                <Link to="/dashboard">
                    <ProjectLogo />
                </Link>
                <SidebarMenu />
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Your Profile</h1>
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Manage your personal and academic information</p>
                </div>

                {message.text && (
                    <div className={`mb-8 p-4 rounded-2xl text-center font-bold tracking-tight shadow-sm border ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {message.text}
                    </div>
                )}

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-gray-100 p-8 md:p-12">
                    <form onSubmit={handleSave} className="space-y-10">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center pb-8 border-b border-gray-50">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-1 shadow-xl">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl font-black text-blue-600 bg-blue-50">
                                    {formData.name.charAt(0)}
                                </div>
                            </div>
                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition shadow-lg"
                                >
                                    Edit Details
                                </button>
                            )}
                        </div>

                        {/* Personal Information */}
                        <section>
                            <div className="flex items-center space-x-3 mb-8 pb-2 border-b border-gray-50">
                                <span className="text-xl">👤</span>
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Personal Info</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Profession</label>
                                    <input
                                        type="text"
                                        name="profession"
                                        value={formData.profession}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                        placeholder="e.g. Student"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                        placeholder="Phone number"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                        placeholder="Your city"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Academic Details */}
                        <section>
                            <div className="flex items-center space-x-3 mb-8 pb-2 border-b border-gray-50">
                                <span className="text-xl">🎓</span>
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Academic Details</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">College</label>
                                    <input
                                        type="text"
                                        name="college"
                                        value={formData.college}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                        placeholder="College name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Department <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                        placeholder="e.g. CSE"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Year of Study <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                        placeholder="Current year"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">CGPA <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="cgpa"
                                            value={formData.cgpa}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Backlogs <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            name="backlogs"
                                            value={formData.backlogs}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Skill Competencies */}
                        <section className="bg-slate-50/50 p-8 rounded-[2rem] border border-blue-100/30">
                            <div className="flex items-center justify-between mb-8 pb-2 border-b border-blue-100/50">
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl">📊</span>
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Skill Competency</h3>
                                </div>
                                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">Manual Rating</span>
                            </div>

                            <div className="space-y-6">
                                {isEditing && (
                                    <div className="flex flex-col md:flex-row gap-4 p-5 bg-white rounded-3xl border border-blue-100 shadow-sm">
                                        <div className="flex-1 space-y-2">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">New Skill</label>
                                            <input
                                                type="text"
                                                value={newCompetency.skill}
                                                onChange={(e) => setNewCompetency({ ...newCompetency, skill: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition font-bold text-gray-800"
                                                placeholder="e.g. React.js"
                                            />
                                        </div>
                                        <div className="w-full md:w-32 space-y-2">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Level (1-5)</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="5"
                                                value={newCompetency.rating}
                                                onChange={(e) => setNewCompetency({ ...newCompetency, rating: parseInt(e.target.value) })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition font-bold text-gray-800"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAddCompetency}
                                            className="self-end px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95 mb-0.5"
                                        >
                                            Add
                                        </button>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {formData.competencies.map((comp, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-blue-200 transition">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black text-sm">
                                                    {comp.rating}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-800 text-sm leading-none mb-1">{comp.skill}</p>
                                                    <div className="flex space-x-0.5 text-[8px]">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <span key={star} className={star <= comp.rating ? 'text-blue-500' : 'text-gray-200'}>●</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCompetency(idx)}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {formData.competencies.length === 0 && !isEditing && (
                                        <div className="col-span-full py-8 text-center text-gray-400 font-medium bg-white/50 rounded-2xl border border-dashed border-gray-200">
                                            No skill competencies added yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Skills & Links */}
                        <section>
                            <div className="flex items-center space-x-3 mb-8 pb-2 border-b border-gray-50">
                                <span className="text-xl">🛠️</span>
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Skills & Links</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Skills</label>
                                    <textarea
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows="2"
                                        className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                        placeholder="React, Node.js, Python..."
                                    ></textarea>
                                </div>
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">LinkedIn URL</label>
                                        <input
                                            type="url"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">GitHub URL</label>
                                        <input
                                            type="url"
                                            name="github"
                                            value={formData.github}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-5 py-4 rounded-2xl border transition font-bold text-gray-800 ${isEditing ? 'border-blue-200 focus:ring-4 focus:ring-blue-50 bg-white' : 'border-transparent bg-gray-50 cursor-not-allowed'}`}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {isEditing && (
                            <div className="flex space-x-6 mt-8">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition disabled:bg-gray-400 active:scale-[0.98]"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            name: user.name || '',
                                            city: user.city || '',
                                            college: user.college || '',
                                            cgpa: user.cgpa || '',
                                            profession: user.profession || '',
                                            department: user.department || '',
                                            year: user.year || '',
                                            backlogs: user.backlogs || '',
                                            mobile: user.mobile || '',
                                            skills: user.skills ? user.skills.join(', ') : '',
                                            linkedin: user.linkedin || '',
                                            github: user.github || '',
                                            profileImage: user.profileImage || '/img3.png',
                                            competencies: user.competencies || []
                                        });
                                    }}
                                    className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
