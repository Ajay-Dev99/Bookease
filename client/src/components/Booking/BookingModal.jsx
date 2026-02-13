import React, { useState } from 'react';
import { IoArrowBack, IoChevronBack, IoChevronForward, IoCalendar, IoTime, IoPerson, IoClose } from "react-icons/io5";

const BookingModal = ({ isOpen, onClose, provider, service }) => {
    if (!isOpen) return null;

    const displayProvider = provider || {
        name: "Service Provider",
        type: "Medical Center",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
    };

    const displayService = service || {
        name: "Consultation",
        price: 0,
        duration: 30
    };

    const [selectedDate, setSelectedDate] = useState(13); // Default to 13th for demo
    const [selectedTime, setSelectedTime] = useState("11:00 AM");
    const [currentMonth, setCurrentMonth] = useState("February 2026");

    // Generate calendar days
    const days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    // Mock calendar generation (Feb 2026 starts on Sunday)
    const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);

    const timeSlots = [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM", "5:00 PM"
    ];

    const handleContinue = () => {
        // Navigate to confirmation or next step
        console.log("Booking confirmed:", {
            provider: displayProvider,
            service: displayService,
            date: `February ${selectedDate}, 2026`,
            time: selectedTime
        });
        alert("Proceeding to confirmation...");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="relative w-full max-w-4xl bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors bg-white/20 p-2 rounded-full backdrop-blur-sm"
                >
                    <IoClose size={24} />
                </button>

                {/* Header Section with Gradient */}
                <div className="relative p-8 text-white" style={{ background: 'linear-gradient(165.72deg, #155DFC 0%, #9810FA 100%)' }}>

                    <div className="flex items-center gap-4 mb-6 pt-2">
                        <div className="w-16 h-16 rounded-full border-4 border-white/30 overflow-hidden shrink-0 bg-white">
                            <img src={displayProvider.image || displayProvider.profileImage} alt={displayProvider.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{displayProvider.name}</h1>
                            <p className="text-blue-100">{displayProvider.type || displayProvider.about?.split('.')[0].substring(0, 30) || "Service Provider"}</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex justify-between items-center border border-white/10">
                        <div>
                            <p className="text-blue-100 text-sm mb-1">Selected Service</p>
                            <p className="text-xl font-bold">{displayService.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-100 text-sm mb-1">{displayService.duration} min</p>
                            <p className="text-2xl font-bold">${displayService.price}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Select Date */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <IoCalendar />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Select Date</h2>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                                <IoChevronBack />
                            </button>
                            <h3 className="font-bold text-lg text-gray-900">{currentMonth}</h3>
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                                <IoChevronForward />
                            </button>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4">
                            <div className="grid grid-cols-7 mb-2 text-center">
                                {days.map(day => (
                                    <div key={day} className="text-xs font-bold text-gray-500 py-2">{day}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-y-2">
                                {calendarDays.map(day => {
                                    const isSelected = day === selectedDate;
                                    const isToday = day === 1; // Simulation

                                    return (
                                        <div key={day} className="flex justify-center">
                                            <button
                                                onClick={() => setSelectedDate(day)}
                                                className={`
                                                    w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all
                                                    ${isSelected
                                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                                                        : 'text-gray-700 hover:bg-white hover:shadow-sm'
                                                    }
                                                    ${isToday && !isSelected ? 'border border-blue-200 text-blue-600' : ''}
                                                `}
                                                style={isSelected ? { background: 'linear-gradient(135deg, #155DFC 0%, #9810FA 100%)' } : {}}
                                            >
                                                {day}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-4 bg-blue-50 rounded-xl p-4 flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Selected Date:</span>
                            <span className="font-bold text-gray-900">Friday, February {selectedDate}, 2026</span>
                        </div>
                    </div>

                    {/* Right Column: Select Time */}
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <IoTime />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Select Time</h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col">
                            <p className="text-sm text-gray-500 mb-4">Available slots:</p>
                            <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
                                {timeSlots.map((time) => {
                                    const isSelected = time === selectedTime;
                                    return (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`
                                                py-3 rounded-xl text-sm font-medium transition-all
                                                ${isSelected
                                                    ? 'text-white shadow-lg shadow-blue-200 transform scale-[1.02]'
                                                    : 'bg-white text-gray-700 hover:shadow-md'
                                                }
                                            `}
                                            style={isSelected ? { background: 'linear-gradient(165deg, #155DFC 0%, #9810FA 100%)' } : {}}
                                        >
                                            {time}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-4 bg-purple-50 rounded-xl p-4 flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Selected Time:</span>
                            <span className="font-bold text-gray-900">{selectedTime}</span>
                        </div>
                    </div>
                </div>

                {/* Footer / Summary Section */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-t border-blue-100 p-8">
                    <h4 className="font-bold text-gray-900 text-lg mb-4">Booking Summary</h4>

                    <div className="flex flex-col md:flex-row gap-6 justify-between mb-8">
                        <div className="space-y-2">
                            <p className="text-gray-600"><span className="font-bold text-gray-900">Provider:</span> {displayProvider.name}</p>
                            <p className="text-gray-600"><span className="font-bold text-gray-900">Duration:</span> {displayService.duration} min</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-600"><span className="font-bold text-gray-900">Date:</span> Friday, February {selectedDate}, 2026</p>
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-gray-900 text-xl">Total:</span>
                                <span className="text-2xl font-bold text-blue-600">${displayService.price}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleContinue}
                        className="w-full py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                        style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                    >
                        Continue to Confirmation
                        <IoArrowBack className="rotate-180" />
                    </button>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default BookingModal;
