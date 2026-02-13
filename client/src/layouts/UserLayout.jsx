import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const UserLayout = () => {
    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow pt-16">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
};

export default UserLayout;
