import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import API_BASE from '../config';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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

            try {
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
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        if (!isEditing) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `${API_BASE}/api/auth/profile`,
                {
                    ...formData,
                    skills: formData.skills.split(',').map(s => s.trim())
                },
                { headers: { 'x-auth-token': token } }
            );

            setIsEditing(false);
            if (formData.name) localStorage.setItem('userName', formData.name);

            alert("Updated Successfully ✅");

            setTimeout(() => {
                navigate('/dashboard');
            }, 800);

        } catch (err) {
            console.error(err);
            alert("Update failed ❌");
        }
    };

    if (!user) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text)' }}>Loading...</div>;

    return (
        <div style={{ ...styles.page, background: 'var(--bg)', color: 'var(--text)' }}>
            <TopNav />

            <div style={styles.container}>
                <div style={{
                    ...styles.card,
                    background: 'var(--card)',
                    border: '1px solid var(--border)'
                }}>
                    <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: '2rem' }}>
                        Your Profile 👤
                    </h2>

                    <Section title="Personal Info">
                        <Input {...inputProps(formData, handleChange, isEditing, "name")} placeholder="Full Name" />
                        <Input {...inputProps(formData, handleChange, isEditing, "city")} placeholder="City" />
                        <Input {...inputProps(formData, handleChange, isEditing, "bio")} placeholder="About you" />
                    </Section>

                    <Section title="Academic 🎓">
                        <Input {...inputProps(formData, handleChange, isEditing, "college")} placeholder="College" />
                        <Input {...inputProps(formData, handleChange, isEditing, "department")} placeholder="Department" />
                        <Input {...inputProps(formData, handleChange, isEditing, "cgpa")} placeholder="CGPA" />
                    </Section>

                    <Section title="Skills 💡">
                        <Input {...inputProps(formData, handleChange, isEditing, "skills")} placeholder="Skills (comma separated)" />
                    </Section>

                    <Section title="Social 🌐">
                        <Input {...inputProps(formData, handleChange, isEditing, "linkedin")} placeholder="LinkedIn URL" />
                        <Input {...inputProps(formData, handleChange, isEditing, "github")} placeholder="GitHub URL" />
                    </Section>

                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        {!isEditing ? (
                            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                                Edit Profile ✏️
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

const inputProps = (formData, handleChange, isEditing, name) => ({
    name,
    value: formData[name],
    onChange: handleChange,
    disabled: !isEditing,
    style: {
        width: "100%",
        padding: "14px",
        marginTop: "10px",
        borderRadius: "10px",
        background: 'var(--border)',
        color: 'var(--text)',
        border: '1px solid transparent',
        outline: 'none',
        fontSize: '1rem',
        boxSizing: 'border-box'
    }
});

const Section = ({ title, children }) => (
    <div style={{ marginBottom: "25px" }}>
        <h3 style={{ marginBottom: "15px", color: 'var(--text)', fontSize: '1.25rem' }}>{title}</h3>
        {children}
    </div>
);

const Input = (props) => <input {...props} />;

const styles = {
    page: { 
        minHeight: "100vh",
        transition: 'all 0.4s ease'
    },
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px"
    },
    card: {
        padding: "40px",
        borderRadius: "20px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        outline: "none"
    },
    editBtn: {
        background: "var(--border)",
        color: "var(--text)",
        padding: "14px 30px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        fontSize: '1.1rem',
        fontWeight: 'bold',
        transition: 'all 0.2s'
    },
    saveBtn: {
        background: "var(--primary)",
        color: "white",
        padding: "14px 30px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        fontSize: '1.1rem',
        fontWeight: 'bold',
        boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)',
        transition: 'all 0.2s'
    }
};

export default Profile;