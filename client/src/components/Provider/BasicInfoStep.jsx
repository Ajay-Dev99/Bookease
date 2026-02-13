import React from 'react';
import { IoCamera, IoEye, IoEyeOff } from 'react-icons/io5';

const BasicInfoStep = ({
    formData,
    profileImage,
    showPassword,
    showConfirmPassword,
    onFormChange,
    onImageUpload,
    onTogglePassword,
    onToggleConfirmPassword
}) => {
    const specialties = [
        'General Practitioner',
        'Dentist',
        'Cardiologist',
        'Dermatologist',
        'Pediatrician',
        'Orthopedic Surgeon',
        'Psychiatrist',
        'Ophthalmologist',
        'Other'
    ];

    return (
        <>
            {/* Form Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic Information</h2>
                <p className="text-gray-600">Let's start with your personal details</p>
            </div>

            {/* Profile Image Upload */}
            <div className="flex justify-center mb-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <IoCamera size={48} className="text-gray-400" />
                        )}
                    </div>
                    <label
                        htmlFor="profile-upload"
                        className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                        style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                    >
                        <IoCamera size={20} className="text-white" />
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            onChange={onImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onFormChange}
                            placeholder="Dr. John Doe"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onFormChange}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                </div>

                {/* Row 2: Phone and Specialty */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={onFormChange}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Specialty *
                        </label>
                        <select
                            name="specialty"
                            value={formData.specialty}
                            onChange={onFormChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors bg-white"
                            required
                        >
                            <option value="">Select specialty</option>
                            {specialties.map(specialty => (
                                <option key={specialty} value={specialty}>{specialty}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 3: Password and Confirm Password */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Password *
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={onFormChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Confirm Password *
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={onFormChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                            <button
                                type="button"
                                onClick={onToggleConfirmPassword}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicInfoStep;
