import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoBook, IoLogoGoogle, IoLogoFacebook, IoMail, IoLockClosed, IoEye, IoEyeOff, IoCheckmarkCircle } from "react-icons/io5";

const CustomerLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const features = [
        "Quick and easy appointment booking",
        "Secure payment processing",
        "24/7 customer support"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
        console.log('Login attempt:', formData);
    };

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
                            Welcome back
                        </h1>
                        <p className="text-lg text-blue-100 max-w-md leading-relaxed">
                            Sign in to manage your appointments and connect with top service providers.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                                    <IoCheckmarkCircle size={14} />
                                </div>
                                <span className="text-base text-blue-50 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-[420px] bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[24px] shadow-2xl border border-white/50">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h2>
                        <p className="text-sm text-gray-500">Welcome back! Please sign in to continue</p>
                    </div>

                    {/* Social Login */}
                    <div className="flex gap-3 mb-6">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all group">
                            <IoLogoGoogle className="text-lg text-gray-600 group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">Google</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all group">
                            <IoLogoFacebook className="text-lg text-gray-600 group-hover:text-blue-600 transition-colors" />
                            <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">Facebook</span>
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <IoMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-lg" />
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm font-medium placeholder:text-gray-400"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 ml-1">Password</label>
                            <div className="relative group">
                                <IoLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-lg" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full px-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm font-medium placeholder:text-gray-400"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                />
                                <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all active:translate-y-0"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
