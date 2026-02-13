import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMail, IoLockClosed, IoEye, IoEyeOff, IoPerson, IoCall } from "react-icons/io5";
import AuthLayout from '../components/Auth/AuthLayout';

const CustomerSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const features = [
        {
            title: "Easy Booking",
            description: "Book appointments in just a few clicks"
        },
        {
            title: "Verified Providers",
            description: "All providers are verified and trusted"
        },
        {
            title: "Manage Anytime",
            description: "View and manage all your bookings in one place"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signup attempt:', formData);
    };

    return (
        <AuthLayout
            title="Join thousands of users managing their appointments"
            subtitle="Create your account and start booking appointments with top-rated service providers in minutes."
            features={features}
        >
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
                <p className="text-sm text-gray-500">Sign up to get started with BookEase</p>
            </div>



            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 ml-1">Full Name</label>
                    <div className="relative group">
                        <IoPerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-lg" />
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm font-medium placeholder:text-gray-400"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                        />
                    </div>
                </div>

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
                    <label className="text-xs font-bold text-gray-700 ml-1">Phone Number</label>
                    <div className="relative group">
                        <IoCall className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-lg" />
                        <input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm font-medium placeholder:text-gray-400"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 ml-1">Confirm Password</label>
                        <div className="relative group">
                            <IoLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-lg" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm font-medium placeholder:text-gray-400"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                </div>

                <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            checked={formData.agreeToTerms}
                            onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                            required
                        />
                        <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                            I agree to the <Link to="/terms" className="text-blue-600 font-bold hover:underline">Terms</Link> and <Link to="/privacy" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link>
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all active:translate-y-0"
                >
                    Create Account
                </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-600">
                Already have an account?{' '}
                <Link to="/login/customer" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                    Sign in
                </Link>
            </div>
        </AuthLayout>
    );
};

export default CustomerSignup;
