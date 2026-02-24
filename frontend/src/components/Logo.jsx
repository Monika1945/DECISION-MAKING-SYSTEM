import React, { useState } from 'react';

const Logo = ({ style = {}, showText = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [hideManualText, setHideManualText] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={styles.container}
        >
            <div style={{
                ...styles.logoWrapper,
                ...style
            }}>
                {/* Enhanced Circular Glow */}
                <div style={{
                    ...styles.glow,
                    ...(isHovered ? styles.glowHover : {})
                }}></div>

                {/* Main Logo Image (Circularized) */}
                {!imgError && (
                    <img
                        src="/logo.png"
                        alt="ReadySetGo"
                        onLoad={(e) => {
                            if (e.target.naturalWidth > e.target.naturalHeight * 1.5) {
                                setHideManualText(true);
                            }
                        }}
                        onError={() => setImgError(true)}
                        style={{
                            ...styles.image,
                            ...(isHovered ? styles.imageHover : {})
                        }}
                    />
                )}

                {/* SVG Fallback */}
                {imgError && (
                    <svg
                        viewBox="0 0 100 100"
                        style={styles.fallbackSvg}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2563eb" />
                                <stop offset="100%" stopColor="#9333ea" />
                            </linearGradient>
                        </defs>
                        <path d="M30 70 L50 20 L75 45 L55 95 Z" fill="url(#logoGradient)" />
                        <path d="M45 55 L55 65 L85 35" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>

            {showText && !hideManualText && (
                <span style={styles.text}>
                    ReadySetGo
                </span>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
    },
    logoWrapper: {
        position: 'relative',
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: 'white',
        padding: '0.125rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(243, 244, 246, 0.5)',
    },
    glow: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        filter: 'blur(24px)',
        borderRadius: '50%',
        transition: 'all 0.5s',
        transform: 'scale(1.5)',
        zIndex: 0,
    },
    glowHover: {
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
    },
    image: {
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 10,
        objectFit: 'cover',
        borderRadius: '50%',
        transition: 'transform 0.5s',
    },
    imageHover: {
        transform: 'scale(1.1)',
    },
    fallbackSvg: {
        height: '100%',
        width: 'auto',
        position: 'relative',
        zIndex: 10,
    },
    text: {
        fontSize: '1.25rem',
        fontWeight: '900',
        background: 'linear-gradient(to right, #2563eb, #9333ea)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.05em',
        transition: 'opacity 0.3s',
        fontFamily: '"Inter", sans-serif',
    },
};

export default Logo;
