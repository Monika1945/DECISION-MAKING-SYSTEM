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

        await axios.put(`${API_BASE}/api/auth/profile`, {
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim())
        }, {
            headers: { 'x-auth-token': token }
        });

        setIsEditing(false);
        alert("Profile updated!");
    };

    if (!user) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f3f4f6"   // ✅ outside white/gray same
        }}>

            {/* NAVBAR */}
            <nav style={{
                background: "white",
                padding: "15px 30px",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
                <Link to="/dashboard"><ProjectLogo /></Link>
                <SidebarMenu />
            </nav>

            <div style={{
                maxWidth: "900px",
                margin: "40px auto",
                padding: "20px"
            }}>

                {/* 🔥 INSIDE BOX GRADIENT */}
                <div style={{
                    background: "linear-gradient(135deg, #e0eafc, #cfdef3)",  // 👈 LIGHT GRADIENT
                    borderRadius: "15px",
                    padding: "30px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}>

                    {/* HEADER */}
                    <div style={{ textAlign: "center", marginBottom: "25px" }}>
                        <h2>{formData.name}</h2>
                        <p>{formData.email}</p>
                    </div>

                    <form onSubmit={handleSave}>

                        <Section title="Personal Info">
                            <Input name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} placeholder="City" />
                            <Input name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} placeholder="About you..." />
                        </Section>

                        <Section title="Academic">
                            <Input name="college" value={formData.college} onChange={handleChange} disabled={!isEditing} placeholder="College" />
                            <Input name="department" value={formData.department} onChange={handleChange} disabled={!isEditing} placeholder="Department" />
                            <Input name="cgpa" value={formData.cgpa} onChange={handleChange} disabled={!isEditing} placeholder="CGPA" />
                        </Section>

                        <Section title="Skills">
                            <Input name="skills" value={formData.skills} onChange={handleChange} disabled={!isEditing} placeholder="React, Node..." />
                        </Section>

                        <Section title="Social Links">
                            <Input name="linkedin" value={formData.linkedin} onChange={handleChange} disabled={!isEditing} placeholder="LinkedIn URL" />
                            <Input name="github" value={formData.github} onChange={handleChange} disabled={!isEditing} placeholder="GitHub URL" />
                        </Section>

                        <div style={{ textAlign: "center", marginTop: "25px" }}>
                            {!isEditing ? (
                                <button type="button" onClick={() => setIsEditing(true)} style={btnBlack}>
                                    Edit
                                </button>
                            ) : (
                                <button type="submit" style={btnBlue}>
                                    Save
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px" }}>{title}</h3>
        {children}
    </div>
);

const Input = (props) => (
    <input
        {...props}
        style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc"
        }}
    />
);

const btnBlack = {
    background: "black",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none"
};

const btnBlue = {
    background: "#2563eb",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none"
};

export default Profile;