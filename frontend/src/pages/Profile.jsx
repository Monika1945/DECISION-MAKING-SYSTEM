import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const API_BASE = "https://decision-backend-pl2m.onrender.com";

const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "8px"
};

const sectionTitle = {
    fontWeight: "600",
    fontSize: "18px",
    marginBottom: "10px"
};

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

    if (!user) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

    return (
        <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>

            {/* NAVBAR */}
            <nav style={{
                background: "white",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
                <Link to="/dashboard"><ProjectLogo /></Link>
                <SidebarMenu />
            </nav>

            <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>

                <div style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}>

                    <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>👤 Profile</h1>

                    <form onSubmit={handleSave}>

                        {/* PERSONAL */}
                        <div>
                            <h2 style={sectionTitle}>Personal Info</h2>

                            <input name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} placeholder="Name" style={inputStyle} />
                            <input name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} placeholder="Email" style={inputStyle} />
                            <input name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} placeholder="City" style={inputStyle} />
                            <textarea name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} placeholder="About you..." style={inputStyle} />
                        </div>

                        {/* ACADEMIC */}
                        <div style={{ marginTop: "20px" }}>
                            <h2 style={sectionTitle}>Academic</h2>

                            <input name="college" value={formData.college} onChange={handleChange} disabled={!isEditing} placeholder="College" style={inputStyle} />
                            <input name="department" value={formData.department} onChange={handleChange} disabled={!isEditing} placeholder="Department" style={inputStyle} />
                            <input name="cgpa" value={formData.cgpa} onChange={handleChange} disabled={!isEditing} placeholder="CGPA" style={inputStyle} />
                        </div>

                        {/* SKILLS */}
                        <div style={{ marginTop: "20px" }}>
                            <h2 style={sectionTitle}>Skills</h2>
                            <textarea name="skills" value={formData.skills} onChange={handleChange} disabled={!isEditing} placeholder="React, Node..." style={inputStyle} />
                        </div>

                        {/* SOCIAL */}
                        <div style={{ marginTop: "20px" }}>
                            <h2 style={sectionTitle}>Social Links</h2>

                            <input name="linkedin" value={formData.linkedin} onChange={handleChange} disabled={!isEditing} placeholder="LinkedIn URL" style={inputStyle} />
                            <input name="github" value={formData.github} onChange={handleChange} disabled={!isEditing} placeholder="GitHub URL" style={inputStyle} />
                            <input name="portfolio" value={formData.portfolio} onChange={handleChange} disabled={!isEditing} placeholder="Portfolio Website" style={inputStyle} />
                        </div>

                        {/* EXPERIENCE */}
                        <div style={{ marginTop: "20px" }}>
                            <h2 style={sectionTitle}>Experience</h2>
                            <textarea name="experience" value={formData.experience} onChange={handleChange} disabled={!isEditing} placeholder="Internships..." style={inputStyle} />
                        </div>

                        {/* PROJECTS */}
                        <div style={{ marginTop: "20px" }}>
                            <h2 style={sectionTitle}>Projects</h2>
                            <textarea name="projects" value={formData.projects} onChange={handleChange} disabled={!isEditing} placeholder="Projects..." style={inputStyle} />
                        </div>

                        {/* BUTTON */}
                        <div style={{ marginTop: "20px" }}>
                            {!isEditing ? (
                                <button type="button" onClick={() => setIsEditing(true)} style={{
                                    background: "black",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    border: "none"
                                }}>
                                    Edit Profile
                                </button>
                            ) : (
                                <button type="submit" style={{
                                    background: "#2563eb",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    border: "none"
                                }}>
                                    Save Changes
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;