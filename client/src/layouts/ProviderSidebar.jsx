import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoGrid, IoBriefcase, IoCalendar } from 'react-icons/io5';

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
        <div className="fixed left-0 top-[84px] h-[calc(100vh-84px)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
            {/* Navigation Links */}
            <div className="p-4 space-y-2">
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


        </div>
    );
};

export default ProviderSidebar;
