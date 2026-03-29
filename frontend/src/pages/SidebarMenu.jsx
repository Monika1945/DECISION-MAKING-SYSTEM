import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ☰ BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="text-2xl px-2"
            >
                ☰
            </button>

            {/* OVERLAY */}
            {open && (
                <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)}></div>
            )}

            {/* SIDEBAR */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 
                ${open ? "translate-x-0" : "-translate-x-full"}`}>

                {/* HEADER */}
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={() => setOpen(false)}>✕</button>
                </div>

                {/* MENU ITEMS */}
                <div className="flex flex-col gap-6 p-6 text-lg">

                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                        Dashboard 🏠
                    </Link>

                    <Link to="/" onClick={() => setOpen(false)}>
                        Home
                    </Link>

                    <Link to="/profile" onClick={() => setOpen(false)}>
                        Profile
                    </Link>

                    <Link to="/history" onClick={() => setOpen(false)}>
                        History
                    </Link>

                    <Link to="/about" onClick={() => setOpen(false)}>
                        About
                    </Link>

                    <hr />

                    <button className="text-red-500 text-left">
                        Logout 🚪
                    </button>

                </div>
            </div>
        </>
    );
};

export default SidebarMenu;