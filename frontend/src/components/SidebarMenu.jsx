import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isMenuBtnHovered, setIsMenuBtnHovered] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/profile', label: 'Profile' },
        { path: '/history', label: 'History' },
        { path: '/about', label: 'About' },
    ];

    return (
        <div style={styles.container}>
            {/* Hamburger Icon */}
            <button
                onClick={toggleMenu}
                onMouseEnter={() => setIsMenuBtnHovered(true)}
                onMouseLeave={() => setIsMenuBtnHovered(false)}
                style={{
                    ...styles.menuBtn,
                    ...(isMenuBtnHovered ? styles.menuBtnHover : {})
                }}
                aria-label="Toggle Menu"
            >
                <div style={{
                    ...styles.hamburgerLine,
                    ...(isOpen ? { transform: 'rotate(45deg) translateY(8px)' } : {})
                }}></div>
                <div style={{
                    ...styles.hamburgerLine,
                    ...(isOpen ? { opacity: 0 } : {})
                }}></div>
                <div style={{
                    ...styles.hamburgerLine,
                    ...(isOpen ? { transform: 'rotate(-45deg) translateY(-8px)' } : {})
                }}></div>
            </button>

            {/* Portal for Overlay and Sidebar */}
            {createPortal(
                <>
                    {/* Overlay */}
                    {isOpen && (
                        <div
                            style={styles.overlay}
                            onClick={toggleMenu}
                        ></div>
                    )}

                    {/* Sidebar */}
                    <div style={{
                        ...styles.sidebar,
                        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                        pointerEvents: isOpen ? 'auto' : 'none'
                    }}>
                        <div style={styles.sidebarContent}>
                            <div style={styles.sidebarHeader}>
                                <span style={styles.menuTitle}>Menu</span>
                                <button
                                    onClick={toggleMenu}
                                    style={styles.closeBtn}
                                    onMouseEnter={(e) => e.target.style.color = '#4b5563'}
                                    onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                                >
                                    ✕
                                </button>
                            </div>

                            <nav style={styles.nav}>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={toggleMenu}
                                        onMouseEnter={() => setHoveredLink(item.path)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                        style={{
                                            ...styles.navItem,
                                            ...(hoveredLink === item.path ? styles.navItemHover : {})
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div style={styles.divider}></div>
                                <button
                                    onClick={handleLogout}
                                    onMouseEnter={() => setHoveredLink('logout')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    style={{
                                        ...styles.logoutBtn,
                                        ...(hoveredLink === 'logout' ? styles.logoutBtnHover : {})
                                    }}
                                >
                                    Logout
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

const styles = {
    container: {
        position: 'relative',
    },
    menuBtn: {
        padding: '0.5rem',
        color: '#1f2937',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        zIndex: 50,
        position: 'relative',
        outline: 'none',
    },
    menuBtnHover: {
        color: '#2563eb',
    },
    hamburgerLine: {
        width: '1.5rem',
        height: '4px',
        backgroundColor: 'currentColor',
        transition: 'all 0.3s ease-in-out',
        borderRadius: '2px',
    },
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(4px)',
        zIndex: 999,
        transition: 'opacity 0.3s',
    },
    sidebar: {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '16rem',
        backgroundColor: 'white',
        boxShadow: '-10px 0 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        transition: 'transform 0.3s ease-in-out',
        overflowY: 'auto',
    },
    sidebarContent: {
        padding: '1.5rem',
    },
    sidebarHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2.5rem',
    },
    menuTitle: {
        fontWeight: 'bold',
        fontSize: '1.25rem',
        color: '#1f2937',
    },
    closeBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.25rem',
        color: '#9ca3af',
        cursor: 'pointer',
        transition: 'color 0.2s',
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    navItem: {
        display: 'block',
        padding: '0.5rem 1rem',
        color: '#4b5563',
        textDecoration: 'none',
        borderRadius: '0.5rem',
        transition: 'all 0.2s',
        fontWeight: '500',
    },
    navItemHover: {
        backgroundColor: '#eff6ff',
        color: '#2563eb',
    },
    divider: {
        borderTop: '1px solid #f3f4f6',
        margin: '1rem 0',
    },
    logoutBtn: {
        width: '100%',
        textAlign: 'left',
        padding: '0.5rem 1rem',
        color: '#ef4444',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontWeight: '500',
    },
    logoutBtnHover: {
        backgroundColor: '#fef2f2',
    },
};

export default SidebarMenu;
