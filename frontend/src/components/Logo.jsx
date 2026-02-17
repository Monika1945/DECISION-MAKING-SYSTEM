import React from 'react';

const Logo = ({ className = "h-10 w-10", showText = true, textClass = "" }) => {
    return (
        <div className="flex items-center space-x-3 group">
            <div className={`relative ${className} flex shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-lg border border-gray-100/50`}>
                {/* Enhanced Circular Glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full group-hover:bg-blue-500/40 transition-all duration-500 scale-150"></div>

                {/* Main Logo Image (Circularized) */}
                <img
                    src="/logo.png"
                    alt="ReadySetGo"
                    className="h-full w-full relative z-10 object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
                    onLoad={(e) => {
                        // If the image is wide (horizontal logo with text), we might want to hide the manual text
                        if (e.target.naturalWidth > e.target.naturalHeight * 1.5) {
                            const textSpan = e.target.closest('.group')?.querySelector('.manual-text');
                            if (textSpan) textSpan.style.display = 'none';
                        }
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement.querySelector('.fallback-svg');
                        if (fallback) fallback.classList.remove('hidden');
                    }}
                />

                {/* SVG Fallback */}
                <svg
                    viewBox="0 0 100 100"
                    className="h-full w-auto fallback-svg relative z-10 hidden"
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
            </div>

            {showText && (
                <span className={`manual-text text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tighter transition-opacity duration-300 ${textClass}`}>
                    ReadySetGo
                </span>
            )}
        </div>
    );
};

export default Logo;
