import React from 'react';

const AboutYouStep = ({ formData, onFormChange }) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const dayLabels = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
    };

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

                {/* Working Hours */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                        Working Hours *
                    </label>
                    <div className="space-y-3">
                        {days.map((day) => (
                            <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center gap-3 w-32">
                                    <input
                                        type="checkbox"
                                        id={`schedule-${day}-active`}
                                        name={`schedule.${day}.isActive`}
                                        checked={formData.schedule[day].isActive}
                                        onChange={(e) => {
                                            const newSchedule = { ...formData.schedule };
                                            newSchedule[day].isActive = e.target.checked;
                                            onFormChange({
                                                target: {
                                                    name: 'schedule',
                                                    value: newSchedule
                                                }
                                            });
                                        }}
                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor={`schedule-${day}-active`}
                                        className={`font-bold ${formData.schedule[day].isActive ? 'text-gray-900' : 'text-gray-400'}`}
                                    >
                                        {dayLabels[day]}
                                    </label>
                                </div>

                                {formData.schedule[day].isActive && (
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-600">From:</label>
                                            <input
                                                type="time"
                                                name={`schedule.${day}.startTime`}
                                                value={formData.schedule[day].startTime}
                                                onChange={(e) => {
                                                    const newSchedule = { ...formData.schedule };
                                                    newSchedule[day].startTime = e.target.value;
                                                    onFormChange({
                                                        target: {
                                                            name: 'schedule',
                                                            value: newSchedule
                                                        }
                                                    });
                                                }}
                                                className="px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-600">To:</label>
                                            <input
                                                type="time"
                                                name={`schedule.${day}.endTime`}
                                                value={formData.schedule[day].endTime}
                                                onChange={(e) => {
                                                    const newSchedule = { ...formData.schedule };
                                                    newSchedule[day].endTime = e.target.value;
                                                    onFormChange({
                                                        target: {
                                                            name: 'schedule',
                                                            value: newSchedule
                                                        }
                                                    });
                                                }}
                                                className="px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Select the days you're available and set your working hours
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutYouStep;
