import React from 'react';
import { useProviderReports } from '../../services/hooks/useProviderReports';
import { IoCalendarOutline, IoCheckmarkCircle, IoCloseCircle, IoTimeOutline, IoTrendingUp } from 'react-icons/io5';

const ProviderDashboard = () => {
    const { data, isLoading, isError, error } = useProviderReports();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <p className="text-red-600 font-bold">
                    {error?.response?.data?.message || 'Failed to load reports. Please try again.'}
                </p>
            </div>
        );
    }

    const { summary, busiestTimes } = data.data;

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome to your provider dashboard</p>

            {/* Summary Statistics */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Appointments */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm opacity-90">Total Appointments</p>
                        <IoCalendarOutline size={24} className="opacity-80" />
                    </div>
                    <p className="text-4xl font-bold">{summary.totalAppointments}</p>
                </div>

                {/* Completed */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm opacity-90">Completed</p>
                        <IoCheckmarkCircle size={24} className="opacity-80" />
                    </div>
                    <p className="text-4xl font-bold">{summary.completedAppointments}</p>
                    <p className="text-sm mt-2 opacity-90">{summary.completionRate} completion rate</p>
                </div>

                {/* Cancelled */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm opacity-90">Cancelled</p>
                        <IoCloseCircle size={24} className="opacity-80" />
                    </div>
                    <p className="text-4xl font-bold">{summary.cancelledAppointments}</p>
                    <p className="text-sm mt-2 opacity-90">{summary.cancellationRate} cancellation rate</p>
                </div>

                {/* Upcoming */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm opacity-90">Upcoming</p>
                        <IoTimeOutline size={24} className="opacity-80" />
                    </div>
                    <p className="text-4xl font-bold">{summary.bookedAppointments}</p>
                    <p className="text-sm mt-2 opacity-90">Scheduled bookings</p>
                </div>
            </div>

            {/* Busiest Times Section */}
            {busiestTimes && busiestTimes.length > 0 && (
                <div className="mt-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <IoTrendingUp size={28} className="text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Busiest Time Slots</h2>
                        </div>

                        <div className="space-y-3">
                            {busiestTimes.map((slot, index) => {
                                // Calculate percentage for visual bar
                                const maxCount = busiestTimes[0].appointmentCount;
                                const percentage = (slot.appointmentCount / maxCount) * 100;

                                return (
                                    <div key={slot.time} className="flex items-center gap-4">
                                        {/* Rank */}
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                                            ${index === 0 ? 'bg-yellow-500' : ''}
                                            ${index === 1 ? 'bg-gray-400' : ''}
                                            ${index === 2 ? 'bg-orange-600' : ''}
                                            ${index > 2 ? 'bg-gray-300' : ''}
                                        `}>
                                            {index + 1}
                                        </div>

                                        {/* Time */}
                                        <div className="w-24">
                                            <p className="text-lg font-bold text-gray-900">{slot.time}</p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>

                                        {/* Count Badge */}
                                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold min-w-[100px] text-center">
                                            {slot.appointmentCount} {slot.appointmentCount === 1 ? 'booking' : 'bookings'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State for Busiest Times */}
            {(!busiestTimes || busiestTimes.length === 0) && (
                <div className="mt-8 bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                    <IoTimeOutline size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No Booking Data Yet</h3>
                    <p className="text-gray-500">Once you start receiving bookings, your busiest times will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default ProviderDashboard;
