import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoBook, IoEye, IoEyeOff, IoArrowForward } from 'react-icons/io5';
import { useProviderLogin } from '../../services/hooks/Provider/useProviderAuth';

const ProviderLogin = () => {
    const navigate = useNavigate();
    const { mutate: login, isPending, isError, error } = useProviderLogin();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
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
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">New provider?</span>
                    <Link
                        to="/signup/provider"
                        className="px-4 py-2.5 border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-colors"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-xl p-8">
                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Provider Login</h1>
                            <p className="text-gray-600">Welcome back! Please login to your account</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {isError && (
                                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                                    <p className="text-red-600 font-bold text-sm">
                                        {error?.response?.data?.message || 'Login failed. Please check your credentials.'}
                                    </p>
                                </div>
                            )}
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <Link to="/forgot-password" className="text-sm text-blue-600 font-bold hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full px-8 py-3.5 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                            >
                                {isPending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        Login
                                        <IoArrowForward size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-sm text-gray-500">OR</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup/provider" className="text-blue-600 font-bold hover:underline">
                                    Sign up now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderLogin;
