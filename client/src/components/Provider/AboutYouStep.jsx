import React from 'react';

const AboutYouStep = ({ formData, onFormChange }) => {
    return (
        <>
            {/* Form Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">About You</h2>
                <p className="text-gray-600">Tell us about your experience and location</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                {/* About/Bio */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        About / Bio *
                    </label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={onFormChange}
                        placeholder="Tell us about your experience, qualifications, and what makes you a great provider..."
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Include your qualifications, years of experience, and areas of expertise
                    </p>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Business Address *
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={onFormChange}
                        placeholder="123 Main Street, Suite 100, City, State, ZIP Code"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        required
                    />
                </div>

                {/* Business/Clinic Name */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Business/Clinic Name *
                    </label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={onFormChange}
                        placeholder="Medical Care Center"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                </div>

                {/* Info Message */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="text-blue-600 text-xl">ℹ️</div>
                        <div>
                            <h4 className="font-bold text-blue-900 mb-1">Service Scheduling</h4>
                            <p className="text-sm text-blue-800">
                                You'll be able to set working hours and availability for each individual service after registration.
                                This allows you to have different schedules for different services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutYouStep;
