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
        email: '',
        city: '',
        college: '',
        cgpa: '',
        department: '',
        year: '',
        skills: '',
        linkedin: '',
        github: '',
        portfolio: '',
        resume: '',
        bio: '',
        experience: '',
        projects: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            const res = await axios.get(`${API_BASE}/api/auth/user`, {
                headers: { 'x-auth-token': token }
            });

            setUser(res.data);

            setFormData({
                name: res.data?.name || '',
                email: res.data?.email || '',
                city: res.data?.city || '',
                college: res.data?.college || '',
                cgpa: res.data?.cgpa || '',
                department: res.data?.department || '',
                year: res.data?.year || '',
                skills: res.data?.skills?.join(', ') || '',
                linkedin: res.data?.linkedin || '',
                github: res.data?.github || '',
                portfolio: res.data?.portfolio || '',
                resume: res.data?.resume || '',
                bio: res.data?.bio || '',
                experience: res.data?.experience || '',
                projects: res.data?.projects || ''
            });
        };

        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const payload = {
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim())
        };

        await axios.put(`${API_BASE}/api/auth/profile`, payload, {
            headers: { 'x-auth-token': token }
        });

        setIsEditing(false);
        alert("Profile updated!");
    };

    if (!user) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <nav className="bg-white px-6 py-4 flex justify-between shadow">
                <Link to="/dashboard"><ProjectLogo /></Link>
                <SidebarMenu />
            </nav>

            <div className="max-w-5xl mx-auto p-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

                    <form onSubmit={handleSave} className="space-y-6">

                        {/* PERSONAL */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">Personal Info</h2>

                            <input name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} placeholder="Name" className="input" />
                            <input name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} placeholder="Email" className="input mt-2" />
                            <input name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} placeholder="City" className="input mt-2" />

                            <textarea name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} placeholder="About you..." className="input mt-2" />
                        </div>

                        {/* ACADEMIC */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">Academic</h2>

                            <input name="college" value={formData.college} onChange={handleChange} disabled={!isEditing} placeholder="College" className="input" />
                            <input name="department" value={formData.department} onChange={handleChange} disabled={!isEditing} placeholder="Department" className="input mt-2" />
                            <input name="cgpa" value={formData.cgpa} onChange={handleChange} disabled={!isEditing} placeholder="CGPA" className="input mt-2" />
                        </div>

                        {/* SKILLS */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">Skills</h2>

                            <textarea name="skills" value={formData.skills} onChange={handleChange} disabled={!isEditing} placeholder="React, Node, SQL..." className="input" />
                        </div>

                        {/* SOCIAL */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">Social Links</h2>

                            <input name="linkedin" value={formData.linkedin} onChange={handleChange} disabled={!isEditing} placeholder="LinkedIn URL" className="input" />
                            <input name="github" value={formData.github} onChange={handleChange} disabled={!isEditing} placeholder="GitHub URL" className="input mt-2" />
                            <input name="portfolio" value={formData.portfolio} onChange={handleChange} disabled={!isEditing} placeholder="Portfolio Website" className="input mt-2" />
                        </div>

                        {/* EXPERIENCE */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">Experience</h2>

                            <textarea name="experience" value={formData.experience} onChange={handleChange} disabled={!isEditing} placeholder="Internships / Experience..." className="input" />
                        </div>

                        {/* PROJECTS */}
                        <div>
                            <h2 className="font-semibold text-lg mb-2">Projects</h2>

                            <textarea name="projects" value={formData.projects} onChange={handleChange} disabled={!isEditing} placeholder="Your projects..." className="input" />
                        </div>

                        {/* BUTTON */}
                        {!isEditing ? (
                            <button type="button" onClick={() => setIsEditing(true)} className="btn-black">
                                Edit Profile
                            </button>
                        ) : (
                            <button type="submit" className="btn-blue">
                                Save Changes
                            </button>
                        )}

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.btn-black {
  background: black;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}

.btn-blue {
  background: #2563eb;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}