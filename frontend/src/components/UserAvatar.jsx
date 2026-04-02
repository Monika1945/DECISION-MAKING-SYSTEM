import React from 'react';

const UserAvatar = ({ size = 40 }) => {
    const name = localStorage.getItem('userName') || '';
    const email = localStorage.getItem('userEmail') || localStorage.getItem('email') || '';
    
    let initial = 'U';
    if (name) {
        initial = name.charAt(0).toUpperCase();
    } else if (email) {
        initial = email.charAt(0).toUpperCase();
    }

    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: `${size * 0.4}px`,
            flexShrink: 0,
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
        }}>
            {initial}
        </div>
    );
};

export default UserAvatar;
