import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Evaluation = () => {
    const [scores, setScores] = useState({ technicalScore: 0, aptitudeScore: 0, communicationScore: 0 });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setScores({ ...scores, [e.target.name]: Number(e.target.value) });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/evaluation', scores, {
                headers: { 'x-auth-token': token }
            });
            // Simulate processing time for UX
            setTimeout(() => {
                setLoading(false);
                navigate('/result');
            }, 1000);
        } catch (err) {
            setLoading(false);
            alert('Evaluation failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-600 rounded-b-[4rem] z-0"></div>

            <div className="relative z-10 glass-panel bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Skill Assessment</h2>
                <p className="text-center text-gray-500 mb-8">Self-evaluate your skills to get instant feedback.</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-bold mb-2">Technical Skills (0-50)</label>
                            <p className="text-xs text-gray-400 mb-2">Coding, System Design, Core Subjects</p>
                            <input
                                type="range"
                                name="technicalScore"
                                min="0"
                                max="50"
                                value={scores.technicalScore}
                                onChange={handleChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                required
                            />
                            <div className="text-right font-bold text-blue-600 mt-1">{scores.technicalScore} / 50</div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-bold mb-2">Aptitude (0-30)</label>
                            <p className="text-xs text-gray-400 mb-2">Quantitative, Logical, Verbal</p>
                            <input
                                type="range"
                                name="aptitudeScore"
                                min="0"
                                max="30"
                                value={scores.aptitudeScore}
                                onChange={handleChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                required
                            />
                            <div className="text-right font-bold text-purple-600 mt-1">{scores.aptitudeScore} / 30</div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">Communication (0-20)</label>
                            <p className="text-xs text-gray-400 mb-2">Verbal Fluency, Confidence, Body Language</p>
                            <input
                                type="range"
                                name="communicationScore"
                                min="0"
                                max="20"
                                value={scores.communicationScore}
                                onChange={handleChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
                                required
                            />
                            <div className="text-right font-bold text-pink-600 mt-1">{scores.communicationScore} / 20</div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 ${loading ? 'bg-gray-400' : 'bg-gray-900'}`}
                    >
                        {loading ? 'Analyzing...' : 'Submit Evaluation'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Evaluation;
