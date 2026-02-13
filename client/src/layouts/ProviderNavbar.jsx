import React from 'react';
import { Link } from 'react-router-dom';
import { IoBook, IoChevronDown } from 'react-icons/io5';

const ProviderNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-[84px]">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/provider/dashboard" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #155DFC 0%, #9810FA 100%)' }}
                    >
                        <IoBook size={24} />
                    </div>
                    <span
                        className="text-2xl font-bold bg-clip-text text-transparent"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        BookEase
                    </span>
                </Link>    
            </div>
        </nav>
    );
};

export default ProviderNavbar;
