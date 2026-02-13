import React from 'react';
import { Link } from 'react-router-dom';
import { IoBook, IoCheckmarkCircle } from "react-icons/io5";

const AuthLayout = ({
    title,
    subtitle,
    features,
    children
}) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

            <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-center gap-6 md:gap-12">
                {/* Left Side - Branding & Features */}
                <div className="w-full md:w-1/2 text-white space-y-8 hidden md:block">
                    <Link to="/" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600">
                            <IoBook size={18} />
                        </div>
                        <span className="text-xl font-bold">BookEase</span>
                    </Link>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold leading-tight">
                            {title}
                        </h1>
                        <p className="text-lg text-blue-100 max-w-md leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                                    <IoCheckmarkCircle size={14} />
                                </div>
                                <span className="text-base text-blue-50 font-medium">{feature.title || feature}</span>
                                {feature.description && (
                                    <span className="block text-sm text-blue-100">{feature.description}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Form Container */}
                <div className="w-full md:w-[420px] bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[24px] shadow-2xl border border-white/50">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
