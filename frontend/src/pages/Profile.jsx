import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const API_BASE = "https://decision-backend-pl2m.onrender.com";

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

    // ✅ FETCH USER
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const res = await axios.get(`${API_BASE}/api/auth/user`, {
                    headers: { 'x-auth-token': token }
                });

                setUser(res.data);

                setFormData({
                    name: res.data?.name || '',
                    city: res.data?.city || '',
                    college: res.data?.college || '',
                    cgpa: res.data?.cgpa || '',
                    profession: res.data?.profession || '',
                    department: res.data?.department || '',
                    year: res.data?.year || '',
                    backlogs: res.data?.backlogs || '',
                    mobile: res.data?.mobile || '',
                    skills: res.data?.skills ? res.data.skills.join(', ') : '',
                    linkedin: res.data?.linkedin || '',
                    github: res.data?.github || '',
                    profileImage: res.data?.profileImage || '/img3.png',
                    competencies: res.data?.competencies || []
                });

            } catch (err) {
                console.error("Fetch user error:", err);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    // ✅ HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ ADD COMPETENCY
    const handleAddCompetency = () => {
        if (!newCompetency.skill.trim()) return;

        setFormData({
            ...formData,
            competencies: [...formData.competencies, newCompetency]
        });

        setNewCompetency({ skill: '', rating: 1 });
    };

    // ✅ REMOVE COMPETENCY
    const handleRemoveCompetency = (index) => {
        setFormData({
            ...formData,
            competencies: formData.competencies.filter((_, i) => i !== index)
        });
    };

    // ✅ SAVE PROFILE
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        try {
            const payload = {
                ...formData,
                skills: formData.skills
                    ? formData.skills.split(',').map(s => s.trim())
                    : []
            };

            const res = await axios.put(
                `${API_BASE}/api/auth/profile`,
                payload,
                { headers: { 'x-auth-token': token } }
            );

            setUser(res.data);
            setIsEditing(false);

            setMessage({
                type: 'success',
                text: 'Profile updated successfully!'
            });

        } catch (err) {
            console.error("Update error:", err);
            setMessage({
                type: 'error',
                text: err.response?.data?.msg || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* NAVBAR */}
            <nav className="bg-white px-6 py-4 flex justify-between items-center shadow">
                <Link to="/dashboard">
                    <ProjectLogo />
                </Link>
                <SidebarMenu />
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

                {message.text && (
                    <div className={`mb-4 p-3 rounded ${
                        message.type === 'success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-6">

                    <input name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} placeholder="Name" className="w-full p-3 border rounded" />

                    <input name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} placeholder="City" className="w-full p-3 border rounded" />

                    <textarea name="skills" value={formData.skills} onChange={handleChange} disabled={!isEditing} placeholder="Skills (comma separated)" className="w-full p-3 border rounded" />

                    {/* ✅ LINKEDIN */}
                    <input
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="LinkedIn Profile URL"
                        className="w-full p-3 border rounded"
                    />

                    {/* ✅ GITHUB */}
                    <input
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="GitHub Profile URL"
                        className="w-full p-3 border rounded"
                    />

                    {/* ✅ DISPLAY LINKS */}
                    {!isEditing && (
                        <div className="space-y-2">
                            {user.linkedin && (
                                <p>
                                    LinkedIn: 
                                    <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 ml-2">
                                        View Profile
                                    </a>
                                </p>
                            )}
                            {user.github && (
                                <p>
                                    GitHub: 
                                    <a href={user.github} target="_blank" rel="noreferrer" className="text-blue-600 ml-2">
                                        View Profile
                                    </a>
                                </p>
                            )}
                        </div>
                    )}

                    {/* COMPETENCIES */}
                    <div>
                        <h3 className="font-bold mb-2">Competencies</h3>

                        {formData.competencies.map((c, i) => (
                            <div key={i} className="flex justify-between mb-2">
                                <span>{c.skill} ({c.rating})</span>
                                {isEditing && (
                                    <button type="button" onClick={() => handleRemoveCompetency(i)}>X</button>
                                )}
                            </div>
                        ))}

                        {isEditing && (
                            <div className="flex gap-2 mt-2">
                                <input placeholder="Skill" value={newCompetency.skill}
                                    onChange={(e) => setNewCompetency({ ...newCompetency, skill: e.target.value })} />
                                <input type="number" min="1" max="5" value={newCompetency.rating}
                                    onChange={(e) => setNewCompetency({ ...newCompetency, rating: parseInt(e.target.value) || 1 })} />
                                <button type="button" onClick={handleAddCompetency}>Add</button>
                            </div>
                        )}
                    </div>

                    {!isEditing ? (
                        <button type="button" onClick={() => setIsEditing(true)} className="bg-black text-white px-4 py-2 rounded">
                            Edit
                        </button>
                    ) : (
                        <div className="flex gap-4">
                            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                                {loading ? 'Saving...' : 'Save'}
                            </button>

                            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">
                                Cancel
                            </button>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Profile;