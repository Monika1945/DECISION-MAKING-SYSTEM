import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const Evaluation = () => {
    const [scores, setScores] = useState({
        technicalScore: 0,
        aptitudeScore: 0,
        communicationScore: 0,
        logicalScore: 0,
        leadershipScore: 0,
        companyPreference: 'Product Based',
        interestedSkill: ''
    });
    const [technicalSkills, setTechnicalSkills] = useState([]);
    const [newTechSkill, setNewTechSkill] = useState({ skill: '', rating: 0 });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        setScores({ ...scores, [name]: val });
    };

    const handleAddTechSkill = () => {
        if (!newTechSkill.skill.trim()) return;
        const updatedSkills = [...technicalSkills, { ...newTechSkill, rating: Number(newTechSkill.rating) }];
        setTechnicalSkills(updatedSkills);

        // Update technicalScore: Average of skill ratings (scaled to 50 max) 
        // Or simply sum if they are small. Let's assume skill level is 1-10.
        // If skill level is 1-10, we could sum them up to 50.
        const totalTech = updatedSkills.reduce((sum, s) => sum + s.rating, 0);
        setScores({ ...scores, technicalScore: Math.min(totalTech, 50) });

        setNewTechSkill({ skill: '', rating: 0 });
    };

    const handleRemoveTechSkill = (index) => {
        const updatedSkills = technicalSkills.filter((_, i) => i !== index);
        setTechnicalSkills(updatedSkills);
        const totalTech = updatedSkills.reduce((sum, s) => sum + s.rating, 0);
        setScores({ ...scores, technicalScore: Math.min(totalTech, 50) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const dataToSubmit = {
                ...scores,
                technicalSkills
            };
            await axios.post('http://localhost:5000/api/evaluation', dataToSubmit, {
                headers: { 'x-auth-token': token }
            });
            setTimeout(() => {
                setLoading(false);
                navigate('/result');
            }, 1200);
        } catch (err) {
            setLoading(false);
            alert('Evaluation failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] relative overflow-x-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none"></div>

            <nav className="relative z-30 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-8 py-3.5 flex justify-between items-center sticky top-0 shadow-sm">
                <Link to="/dashboard">
                    <ProjectLogo className="w-9 h-9" />
                </Link>
                <SidebarMenu />
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
                        Placement <span className="text-blue-600 italic">Readiness</span> Assessment
                    </h1>
                    <p className="text-gray-500 font-bold max-w-lg mx-auto leading-relaxed uppercase text-xs tracking-[0.2em]">
                        Analyze your strengths across 5 core domains and get a strategic career roadmap.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Skill Assessment */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-900/5">
                        <div className="flex items-center space-x-4 mb-10 border-b border-gray-50 pb-6">
                            <span className="text-3xl">📊</span>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Skill Competency</h2>
                                <p className="text-sm font-bold text-gray-400">Self-rate your proficiency in core placement areas.</p>
                            </div>
                        </div>

                        <div className="space-y-12">
                            {/* Technical Skills Section */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className="text-2xl">💻</span>
                                    <div>
                                        <label className="text-sm font-black text-gray-800 uppercase tracking-widest block leading-none mb-1">Technical Expertise</label>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">List your technical skills and proficiency level (1-10)</p>
                                    </div>
                                </div>

                                {/* Common Skill Suggestions */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {['React', 'Python', 'Java', 'SQL', 'Node.js', 'AWS', 'Docker', 'Machine Learning'].map(skill => (
                                        <button
                                            key={skill}
                                            type="button"
                                            onClick={() => setNewTechSkill({ ...newTechSkill, skill })}
                                            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border ${newTechSkill.skill === skill
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                                                    : 'bg-white text-gray-400 border-gray-100 hover:border-blue-200 hover:text-blue-500'
                                                }`}
                                        >
                                            + {skill}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewTechSkill({ skill: '', rating: 0 });
                                            document.getElementById('custom-skill-input')?.focus();
                                        }}
                                        className="px-4 py-2 bg-gray-50 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition active:scale-95 border border-gray-100"
                                    >
                                        + Other Skill
                                    </button>
                                </div>

                                {/* Streamlined Manual Entry Row */}
                                <div className="group relative bg-[#fcfcfd] p-3 rounded-[3rem] border border-gray-100 shadow-inner mb-10 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                                    <div className="flex flex-col lg:flex-row items-center gap-4">
                                        {/* Box for Skill Name */}
                                        <div className="flex-1 w-full relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-lg grayscale opacity-50 group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all">
                                                🔍
                                            </div>
                                            <input
                                                id="custom-skill-input"
                                                type="text"
                                                value={newTechSkill.skill}
                                                onChange={(e) => setNewTechSkill({ ...newTechSkill, skill: e.target.value })}
                                                className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white border-transparent focus:border-transparent focus:ring-0 font-black text-gray-800 placeholder-gray-300 text-sm tracking-tight"
                                                placeholder="Type custom skill name here..."
                                            />
                                        </div>

                                        {/* Level Selector */}
                                        <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-[2rem] border border-gray-50 shadow-sm">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-2">Level</span>
                                            <div className="flex gap-1.5">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                                                    <button
                                                        key={level}
                                                        type="button"
                                                        onClick={() => setNewTechSkill({ ...newTechSkill, rating: level })}
                                                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black transition-all transform hover:scale-125 active:scale-90 ${newTechSkill.rating === level
                                                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40 ring-2 ring-blue-100'
                                                            : 'bg-gray-50 text-gray-300 hover:text-blue-500 hover:bg-blue-50'
                                                            }`}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Add Button */}
                                        <button
                                            type="button"
                                            onClick={handleAddTechSkill}
                                            disabled={!newTechSkill.skill || newTechSkill.rating === 0}
                                            className={`px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl ${newTechSkill.skill && newTechSkill.rating > 0
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
                                                }`}
                                        >
                                            Add Skill +
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {technicalSkills.map((s, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-100 shadow-sm group hover:border-blue-200 transition-all hover:shadow-lg hover:shadow-blue-500/5">
                                            <div className="flex items-center space-x-5">
                                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-extrabold text-lg shadow-inner">
                                                    {s.rating}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-800 text-sm leading-none mb-1.5">{s.skill}</p>
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(dot => (
                                                            <div
                                                                key={dot}
                                                                className={`w-2.5 h-1 rounded-full ${dot <= s.rating ? 'bg-blue-500' : 'bg-gray-100'}`}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTechSkill(idx)}
                                                className="p-3 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-xl"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <div className="col-span-full pt-4 px-2">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 block">Weightage</span>
                                                <span className="text-2xl font-black text-blue-600 tracking-tighter">Aggregate Level</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-3xl font-black text-gray-900">{scores.technicalScore}</span>
                                                <span className="text-gray-300 font-bold ml-1 text-lg">/ 50</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-3 bg-gray-100 rounded-full mt-4 p-1 shadow-inner relative overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(scores.technicalScore / 50) * 100}%` }}
                                            >
                                                <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other Categories */}
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 pt-12 border-t border-gray-100">
                                {[
                                    { name: 'aptitudeScore', label: 'Aptitude & Math', max: 30, icon: '🔢', color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50 text-purple-600' },
                                    { name: 'communicationScore', label: 'Verbal Fluency', max: 20, icon: '🗣️', color: 'from-green-500 to-emerald-600', bg: 'bg-emerald-50 text-emerald-600' },
                                    { name: 'logicalScore', label: 'Logical Reasoning', max: 30, icon: '🧩', color: 'from-orange-500 to-amber-600', bg: 'bg-orange-50 text-orange-600' },
                                    { name: 'leadershipScore', label: 'Leadership Skills', max: 20, icon: '👑', color: 'from-pink-500 to-rose-600', bg: 'bg-rose-50 text-rose-600' }
                                ].map((field) => (
                                    <div key={field.name} className="space-y-4 group">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 ${field.bg} rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform`}>
                                                    {field.icon}
                                                </div>
                                                <label className="text-xs font-black text-gray-800 uppercase tracking-widest block leading-none">{field.label}</label>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-black text-gray-900">{scores[field.name]}</span>
                                                <span className="text-gray-300 font-bold text-xs ml-1">/ {field.max}</span>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name={field.name}
                                                min="0"
                                                max={field.max}
                                                value={scores[field.name]}
                                                onChange={handleChange}
                                                className="w-full px-5 py-5 bg-white border border-gray-100 rounded-[1.5rem] font-black text-gray-800 focus:ring-4 focus:ring-gray-50 focus:border-gray-200 transition outline-none shadow-sm text-lg"
                                                placeholder={`Range: 0 - ${field.max}`}
                                            />
                                            {/* Progress Bar under input */}
                                            <div className="absolute -bottom-1 left-4 right-4 h-1 bg-gray-50 rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${field.color} transition-all duration-700`}
                                                    style={{ width: `${(scores[field.name] / field.max) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Career Preferences */}
                    <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] border border-white shadow-2xl shadow-blue-900/5">
                        <div className="flex items-center space-x-4 mb-10 border-b border-gray-100 pb-8">
                            <span className="text-4xl">🎯</span>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Career Aspirations</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Tell us where you see yourself working.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block pl-1">Company Preference</label>
                                <div className="relative">
                                    <select
                                        name="companyPreference"
                                        value={scores.companyPreference}
                                        onChange={handleChange}
                                        className="w-full px-6 py-5 bg-white border border-gray-100 rounded-3xl font-black text-gray-800 focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition outline-none appearance-none shadow-sm cursor-pointer"
                                    >
                                        <option value="Product Based">🏢 Product Based (FAANG, etc)</option>
                                        <option value="Service Based">⚙️ Service Based (TCS, etc)</option>
                                        <option value="Startup">🚀 Early Stage Startup</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 font-black">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block pl-1">Specialization Interest</label>
                                <input
                                    type="text"
                                    name="interestedSkill"
                                    value={scores.interestedSkill}
                                    onChange={handleChange}
                                    placeholder="e.g. AI/ML, DevOps, Cloud"
                                    className="w-full px-6 py-5 bg-white border border-gray-100 rounded-3xl font-black text-gray-800 placeholder:text-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition outline-none shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-8 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all transform hover:-translate-y-2 active:scale-95 group relative overflow-hidden ${loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-black'
                            }`}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        {loading ? (
                            <span className="flex items-center justify-center relative z-10">
                                <div className="w-8 h-8 border-[5px] border-gray-400 border-t-white rounded-full animate-spin mr-4"></div>
                                Running AI Benchmarking...
                            </span>
                        ) : (
                            <span className="relative z-10 flex items-center justify-center">
                                Finalize Evaluation & View Roadmap
                                <span className="ml-3 text-2xl group-hover:translate-x-2 transition-transform">→</span>
                            </span>
                        )}
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Your data is processed by our AI engine to provide accurate benchmarks.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Evaluation;
