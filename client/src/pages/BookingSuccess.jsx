import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { IoCheckmarkCircle, IoCalendar, IoTime, IoPerson, IoHome, IoSearch } from "react-icons/io5";

const BookingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { provider, service, date, time } = location.state || {};

    // Default values if accessing directly
    const displayProvider = provider || {
        name: "Dr. Sarah Mitchell",
        type: "General Physician",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
    };

    const displayService = service || {
        name: "General Consultation",
        price: 150,
        duration: 30
    };

    const bookingReference = "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
                {/* Success Header */}
                <div className="bg-green-600 p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4 ring-4 ring-white/10">
                            <IoCheckmarkCircle className="text-5xl text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                        <p className="text-green-100 text-lg">Your appointment has been successfully scheduled</p>

                        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl py-3 px-6 border border-white/20 inline-block">
                            <p className="text-green-100 text-sm uppercase tracking-wider mb-1">Confirmation Number</p>
                            <p className="text-2xl font-mono font-bold tracking-widest">{bookingReference}</p>
                        </div>
                    </div>
                </div>

                {/* Appointment Details */}
                <div className="p-8">
                    <h2 className="text-gray-900 font-bold text-xl mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                        Appointment Details
                    </h2>

                    <div className="flex items-start gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <img
                            src={displayProvider.image || displayProvider.profileImage}
                            alt={displayProvider.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">{displayProvider.name}</h3>
                            <p className="text-gray-600 font-medium text-sm mb-1">{displayProvider.type}</p>
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                                <IoPerson size={14} /> {displayService.name}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-2">
                                <IoCalendar />
                                <span className="font-bold text-sm">Date</span>
                            </div>
                            <p className="font-bold text-gray-900">{date || "February 15, 2026"}</p>
                        </div>
                        <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-2">
                                <IoTime />
                                <span className="font-bold text-sm">Time</span>
                            </div>
                            <p className="font-bold text-gray-900">{time || "10:00 AM"}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Link
                            to="/"
                            className="block w-full py-4 bg-green-600 text-white font-bold rounded-xl text-center shadow-lg shadow-green-200 hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <IoHome /> Back to Home
                        </Link>
                        <Link
                            to="/providers"
                            className="block w-full py-4 bg-white text-gray-700 font-bold rounded-xl text-center border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <IoSearch /> Browse More Providers
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
