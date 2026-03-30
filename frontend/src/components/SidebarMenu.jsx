import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

const SidebarMenu = ({ color = "#1f2937" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isMenuBtnHovered, setIsMenuBtnHovered] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    // ✅ CLEAN NAV ITEMS (no emoji in label)
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/', label: 'Home', icon: '🏡' },
        { path: '/profile', label: 'Profile', icon: '👤' },
        { path: '/history', label: 'History', icon: '📜' },
        { path: '/about', label: 'About', icon: 'ℹ️' },
    ];

    return (
        <div style={styles.container}>

            {/* ☰ MENU BUTTON */}
            <button
                onClick={toggleMenu}
                onMouseEnter={() => setIsMenuBtnHovered(true)}
                onMouseLeave={() => setIsMenuBtnHovered(false)}
                style={{
                    ...styles.menuBtn,
                    color: color,
                    ...(isMenuBtnHovered ? styles.menuBtnHover : {})
                }}
            >
                <div style={{
                    ...styles.hamburgerLine,
                    backgroundColor: color,
                    ...(isOpen ? styles.line1Open : {})
                }} />

                <div style={{
                    ...styles.hamburgerLine,
                    backgroundColor: color,
                    ...(isOpen ? { opacity: 0 } : {})
                }} />

                <div style={{
                    ...styles.hamburgerLine,
                    backgroundColor: color,
                    ...(isOpen ? styles.line3Open : {})
                }} />
            </button>

            {/* PORTAL */}
            {createPortal(
                <>
                    {/* OVERLAY */}
                    {isOpen && (
                        <div style={styles.overlay} onClick={toggleMenu}></div>
                    )}

                    {/* SIDEBAR */}
                    <div style={{
                        ...styles.sidebar,
                        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                        pointerEvents: isOpen ? 'auto' : 'none'
                    }}>

                        <div style={styles.sidebarContent}>

                            {/* HEADER */}
                            <div style={styles.sidebarHeader}>
                                <span style={styles.menuTitle}>Menu 🚀</span>
                                <button onClick={toggleMenu} style={styles.closeBtn}>✕</button>
                            </div>

                            {/* NAV */}
                            <nav style={styles.nav}>
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;

                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={toggleMenu}
                                            onMouseEnter={() => setHoveredLink(item.path)}
                                            onMouseLeave={() => setHoveredLink(null)}
                                            style={{
                                                ...styles.navItem,
                                                ...(hoveredLink === item.path ? styles.navItemHover : {}),
                                                ...(isActive ? styles.activeLink : {})
                                            }}
                                        >
                                            <div style={styles.navItemContent}>
                                                <span style={styles.icon}>{item.icon}</span>
                                                {item.label}
                                            </div>
                                        </Link>
                                    );
                                })}

                                <div style={styles.divider}></div>

                                {/* LOGOUT */}
                                <button
                                    onClick={handleLogout}
                                    onMouseEnter={() => setHoveredLink('logout')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    style={{
                                        ...styles.logoutBtn,
                                        ...(hoveredLink === 'logout' ? styles.logoutBtnHover : {})
                                    }}
                                >
                                    Logout 🚪
                                </button>
                            </nav>

                        </div>
                    </div>
                </>,
                document.body
            )}
        </div>
    );
};

/* 🎨 STYLES */
const styles = {
    container: { position: 'relative' },

    menuBtn: {
        padding: '0.5rem',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },

    menuBtnHover: { color: '#7c3aed' },

    hamburgerLine: {
        width: '1.6rem',
        height: '3px',
        borderRadius: '2px',
        transition: '0.3s'
    },

    line1Open: {
        transform: 'rotate(45deg) translateY(7px)'
    },

    line3Open: {
        transform: 'rotate(-45deg) translateY(-7px)'
    },

    overlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(6px)',
        zIndex: 999
    },

    sidebar: {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '270px',
        background: 'linear-gradient(135deg, #ffffff, #f3f4f6)',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
        zIndex: 1000,
        transition: '0.3s'
    },

    sidebarContent: { padding: '1.5rem' },

    sidebarHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2rem'
    },

    menuTitle: {
        fontWeight: 'bold',
        fontSize: '1.3rem'
    },

    closeBtn: {
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '1.3rem'
    },

    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },

    navItem: {
        padding: '12px 14px',
        borderRadius: '12px',
        textDecoration: 'none',
        color: '#374151',
        transition: '0.2s',
        fontWeight: '600'
    },

    navItemHover: {
        background: '#ede9fe',
        color: '#7c3aed'
    },

    activeLink: {
        background: '#7c3aed',
        color: 'white'
    },

    navItemContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },

    icon: {
        fontSize: '1.2rem'
    },

    divider: {
        borderTop: '1px solid #e5e7eb',
        margin: '12px 0'
    },

    logoutBtn: {
        padding: '12px',
        border: 'none',
        background: 'transparent',
        color: '#ef4444',
        cursor: 'pointer',
        borderRadius: '12px',
        fontWeight: '600'
    },

    logoutBtnHover: {
        background: '#fee2e2'
    }
};

export default SidebarMenu;