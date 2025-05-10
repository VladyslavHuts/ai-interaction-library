import React from 'react';

const Footer: React.FC = () => (
    <footer style={{ marginTop: '40px', padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
        <p>© {new Date().getFullYear()} AI Interaction Library. All rights reserved.</p>
    </footer>
);

export default Footer;
