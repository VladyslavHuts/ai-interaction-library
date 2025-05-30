import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
    <nav style={{ marginBottom: '20px' }}>
            <Link to="/">Home</Link> |{' '}
            <Link to="/camera">Camera</Link> |{' '}
            <Link to="/voice">Voice</Link> |{' '}
            <Link to="/voice-nav">Voice Navigation</Link> |{' '}
            <Link to="/dynamic-ui">Dynamic UI</Link> |{' '}
            <Link to="/assistant">Assistant</Link>
    </nav>
);

export default Header;
