import React from 'react';

const Home = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob [animation-delay:2000ms]"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob [animation-delay:4000ms]"></div>

            <div className="relative z-10 text-center">
                <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-fade-in-up drop-shadow-sm">
                    Welcome to BookEase
                </h1>
            </div>
        </div>
    );
};

export default Home;
