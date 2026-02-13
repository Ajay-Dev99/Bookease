import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;
