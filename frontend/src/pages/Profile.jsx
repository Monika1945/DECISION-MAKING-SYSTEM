import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import ProjectLogo from '../components/Logo';

const API_BASE = "https://decision-backend-pl2m.onrender.com";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const [formData, setFormData] = useState({
        name: '', email: '', city: '', college: '', cgpa: '',
        department: '', year: '', skills: '', linkedin: '',
        github: '', portfolio: '', bio: '', experience: '', projects: ''
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
        const token = localStorage.getItem('token');

        await axios.put(`${API_BASE}/api/auth/profile`,
            {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim())
            },
            { headers: { 'x-auth-token': token } }
        );

        setIsEditing(false);
        alert("Updated Successfully ✅");
    };

    if (!user) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

    const theme = darkMode ? dark : light;

    return (
        <div style={{ ...styles.page, background: theme.bg, color: theme.text }}>

            {/* NAVBAR */}
            <nav style={{ ...styles.nav, borderBottom: theme.border }}>
                <Link to="/dashboard"><ProjectLogo /></Link>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button onClick={() => setDarkMode(!darkMode)} style={styles.toggle}>
                        {darkMode ? "🌙" : "☀️"}
                    </button>
                    <SidebarMenu />
                </div>
            </nav>

            {/* CARD */}
            <div style={styles.container}>
                <div style={{
                    ...styles.card,
                    background: theme.card,
                    border: theme.border
                }}>

                    {/* AVATAR */}
                    <div style={styles.avatar}>
                        {formData.name?.charAt(0)?.toUpperCase()}
                    </div>

                    {/* TITLE */}
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                        Your Profile 👤
                    </h2>

                    <Section title="Personal Info">
                        <Input {...inputProps(theme, formData, handleChange, isEditing, "city")} placeholder="City" />
                        <Input {...inputProps(theme, formData, handleChange, isEditing, "bio")} placeholder="About you" />
                    </Section>

                    <Section title="Academic 🎓">
                        <Input {...inputProps(theme, formData, handleChange, isEditing, "college")} placeholder="College" />
                        <Input {...inputProps(theme, formData, handleChange, isEditing, "department")} placeholder="Department" />
                        <Input {...inputProps(theme, formData, handleChange, isEditing, "cgpa")} placeholder="CGPA" />
                    </Section>

                    <Section title="Skills 💡">
                        <Input {...inputProps(theme, formData, handleChange, isEditing, "skills")} placeholder="Skills" />
                    </Section>

                    <Section title="Social 🌐">
                        <Input {...inputProps(theme, formData, handleChange, isEditing, "linkedin")} placeholder="LinkedIn" />
                        <Input {...inputProps(theme, formData, handleChange, isEditing, "github")} placeholder="GitHub" />
                    </Section>

                    {/* BUTTON */}
                    <div style={{ textAlign: "center", marginTop: "25px" }}>
                        {!isEditing ? (
                            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                                Edit ✏️
                            </button>
                        ) : (
                            <button onClick={handleSave} style={styles.saveBtn}>
                                Save Changes 💾
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

/* INPUT HELPER */
const inputProps = (theme, formData, handleChange, isEditing, name) => ({
    name,
    value: formData[name],
    onChange: handleChange,
    disabled: !isEditing,
    style: {
        ...styles.input,
        background: theme.inputBg,
        color: theme.text,
        border: theme.border
    }
});

/* COMPONENTS */
const Section = ({ title, children }) => (
    <div style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px" }}>{title}</h3>
        {children}
    </div>
);

const Input = (props) => <input {...props} />;

/* STYLES */
const styles = {
    page: { minHeight: "100vh" },

    nav: {
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between"
    },

    toggle: {
        padding: "6px 10px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
    },

    container: {
        maxWidth: "900px",
        margin: "40px auto"
    },

    card: {
        padding: "30px",
        borderRadius: "20px",
        backdropFilter: "blur(20px)",

        // 💎 glass look
        background: "rgba(240, 187, 187, 0.08)",
        border: "1px solid rgba(255,255,255,0.15)",

        // 🔥 depth
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",

        // ✨ glow
        outline: "1px solid rgba(255,255,255,0.05)"
    },   // ⚠️ THIS COMMA IMPORTANT

    avatar: {
        width: "90px",
        height: "90px",
        borderRadius: "50%",
        margin: "0 auto 20px",
        background: "linear-gradient(135deg, #6366f1, #ec4899)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32px",
        color: "white",
        fontWeight: "bold"
    },

    input: {
        width: "100%",
        padding: "12px",
        marginTop: "8px",
        borderRadius: "10px"
    },

    editBtn: {
        background: "#111",
        color: "white",
        padding: "12px 25px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer"
    },

    saveBtn: {
        background: "linear-gradient(135deg, #6366f1, #ec4899)",
        color: "white",
        padding: "12px 25px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer"
    }
};

/* THEMES */
const light = {
    bg: "#f8fafc",
    text: "#111",
    card: "rgba(255,255,255,0.9)",
border: "1px solid rgba(0,0,0,0.08)",
    inputBg: "#fff"
};

const dark = {
    bg: "#020617",
    text: "#e5e7eb",
    card: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    inputBg: "rgba(255,255,255,0.05)"
};

export default Profile;