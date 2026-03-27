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
        if (!isEditing) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!isEditing) return;

        const token = localStorage.getItem('token');

        await axios.put(
            `${API_BASE}/api/auth/profile`,
            {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim())
            },
            { headers: { 'x-auth-token': token } }
        );

        setIsEditing(false);
        alert("Updated");
    };

    if (!user) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

            <nav style={{
                background: "white",
                padding: "15px 30px",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}>
                <Link to="/dashboard"><ProjectLogo /></Link>
                <SidebarMenu />
            </nav>

            <div style={{
                maxWidth: "900px",
                margin: "40px auto",
                padding: "20px"
            }}>

                <div style={{
                    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                    borderRadius: "20px",
                    padding: "30px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
                }}>

                    {/* CIRCLE ONLY */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "25px"
                    }}>
                        <div style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #ff512f, #dd2476)",
                            color: "white",
                            fontSize: "36px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {formData.name?.charAt(0)?.toUpperCase()}
                        </div>
                    </div>

                    <div>

                        <Section title="Personal Info">
                            <Input name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} placeholder="City" />
                            <Input name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} placeholder="About you" />
                        </Section>

                        <Section title="Academic">
                            <Input name="college" value={formData.college} onChange={handleChange} disabled={!isEditing} placeholder="College" />
                            <Input name="department" value={formData.department} onChange={handleChange} disabled={!isEditing} placeholder="Department" />
                            <Input name="cgpa" value={formData.cgpa} onChange={handleChange} disabled={!isEditing} placeholder="CGPA" />
                        </Section>

                        <Section title="Skills">
                            <Input name="skills" value={formData.skills} onChange={handleChange} disabled={!isEditing} placeholder="Skills" />
                        </Section>

                        <Section title="Social">
                            <Input name="linkedin" value={formData.linkedin} onChange={handleChange} disabled={!isEditing} placeholder="LinkedIn" />
                            <Input name="github" value={formData.github} onChange={handleChange} disabled={!isEditing} placeholder="GitHub" />
                        </Section>

                        <div style={{ textAlign: "center", marginTop: "25px" }}>
                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    style={btnBlack}
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    style={btnPink}
                                >
                                    Save
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div style={{ marginBottom: "20px" }}>
        <h3>{title}</h3>
        {children}
    </div>
);

const Input = (props) => (
    <input
        {...props}
        style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            borderRadius: "10px",
            border: "1px solid #ddd"
        }}
    />
);

const btnBlack = {
    background: "#111",
    color: "white",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none"
};

const btnPink = {
   background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
    color: "white",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none"
};

export default Profile;