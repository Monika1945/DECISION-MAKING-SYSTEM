import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectLogo from './Logo';
import SidebarMenu from './SidebarMenu';
import UserAvatar from './UserAvatar';

const TopNav = ({ extraActions }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.toggle('dark');
        const dark = root.classList.contains('dark');
        setIsDark(dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    };

    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "transparent"
        }}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <ProjectLogo />
            </Link>

            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                
                {extraActions}

                <button
                    onClick={toggleTheme}
                    style={{
                        padding: "8px 14px",
                        borderRadius: "20px",
                        border: "none",
                        background: "var(--primary)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600",
                        transition: "all 0.3s ease"
                    }}
                >
                    {isDark ? "🌞 Dark" : "🌙 Light"}
                </button>

                <UserAvatar size={40} />

                <SidebarMenu color="var(--text)" />
            </div>
        </nav>
    );
};

export default TopNav;
