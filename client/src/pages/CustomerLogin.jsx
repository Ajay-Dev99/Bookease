import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMail, IoLockClosed, IoEye, IoEyeOff } from "react-icons/io5";
import AuthLayout from '../components/Auth/AuthLayout';

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
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to manage your appointments, view booking history, and connect with top service providers."
            features={features}
        >
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h2>
                <p className="text-sm text-gray-500">Welcome back! Please sign in to continue</p>
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
                <Link to="/signup/customer" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                    Sign up
                </Link>
            </div>
        </AuthLayout>
    );
};

export default CustomerLogin;
