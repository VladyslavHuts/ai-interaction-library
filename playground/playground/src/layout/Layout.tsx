import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import '../styles/layout/layout.scss';

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <Header />
            <main className="layout__main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
