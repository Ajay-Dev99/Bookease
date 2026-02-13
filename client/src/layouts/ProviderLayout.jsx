import React from 'react';
import { Outlet } from 'react-router-dom';
import ProviderNavbar from './ProviderNavbar';
import ProviderSidebar from './ProviderSidebar';

const ProviderLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <ProviderNavbar />

            {/* Sidebar */}
            <ProviderSidebar />

            {/* Main Content Area */}
            <div className="pt-[84px] pl-64">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProviderLayout;
