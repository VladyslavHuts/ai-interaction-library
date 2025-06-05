import React from 'react';
import '../styles/layout/footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">
                    © {new Date().getFullYear()} AI Interaction Library. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
