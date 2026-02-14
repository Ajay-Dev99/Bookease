import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoGrid, IoBriefcase, IoCalendar, IoLogOut } from 'react-icons/io5';

const ProviderSidebar = () => {
    const location = useLocation();

    const navItems = [
        {
            path: '/provider/dashboard',
            label: 'Dashboard',
            icon: IoGrid
        },
        {
            path: '/provider/services',
            label: 'Services',
            icon: IoBriefcase
        },
        {
            path: '/provider/bookings',
            label: 'Bookings',
            icon: IoCalendar
        }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed left-0 top-[84px] h-[calc(100vh-84px)] w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Navigation Links */}
            <div className="p-4 space-y-2 flex-1 overflow-y-auto pb-20">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-base transition-all ${active
                                ? 'text-white shadow-lg'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            style={active ? { background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' } : {}}
                        >
                            <Icon size={20} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            {/* Logout Button - Fixed at Bottom */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <Link
                    to="/"
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('userType');
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-base transition-all w-full text-red-600 hover:bg-red-50"
                >
                    <IoLogOut size={20} />
                    Logout
                </Link>

            </div>
        </div>
    );
};

export default ProviderSidebar;
