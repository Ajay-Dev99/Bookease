import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoChevronBack, IoChevronForward, IoCalendar, IoTime, IoClose, IoAlertCircle } from "react-icons/io5";
import axiosInstance from '../../config/axios';

const BookingModal = ({ isOpen, onClose, provider, service }) => {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState(null);
    const [bookingError, setBookingError] = useState(null);






    // Calendar generation logic
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonthIndex);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Fetch availability slots when date implies a specific day
    useEffect(() => {
        if (selectedDate && service?._id) {
            fetchSlots(selectedDate);
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDate, service]);

    const fetchSlots = async (day, showLoading = true) => {
        if (!day) return;
        if (showLoading) {
            setLoadingSlots(true);
            setBookingError(null);
        }
        setError(null);
        setSelectedTime(null);

        try {
            // Construct date string YYYY-MM-DD
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const dayStr = String(day).padStart(2, '0');
            const formattedDate = `${year}-${month}-${dayStr}`;

            const response = await axiosInstance.get(`/services/${service._id}/availability?date=${formattedDate}`);

            if (response.data.status === 'success') {
                setAvailableSlots(response.data.data.slots);
            }
        } catch (err) {
            console.error("Error fetching slots:", err);
            setError("Failed to load time slots");
            setAvailableSlots([]);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
        setAvailableSlots([]);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
        setAvailableSlots([]);
    };

    const isDayDisabled = (day) => {
        if (!day) return true;

        // Disable past dates
        const dateToCheck = new Date(currentYear, currentMonthIndex, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dateToCheck < today) return true;

        // Check service schedule if available
        if (service?.schedule) {
            const dayOfWeek = dateToCheck.getDay();
            const dayName = days[dayOfWeek].toLowerCase();
            const dayNamesFull = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const fullDayName = dayNamesFull[dayOfWeek];

            if (service.schedule[fullDayName] && !service.schedule[fullDayName].isActive) {
                return true;
            }
        }
        return false;
    };

    const handleContinue = async () => {
        if (!selectedDate || !selectedTime) return;

        setIsBooking(true);
        setError(null);

        try {
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const dayStr = String(selectedDate).padStart(2, '0');
            const formattedDate = `${year}-${month}-${dayStr}`;

            const response = await axiosInstance.post('/bookings', {
                serviceId: service._id,
                date: formattedDate,
                time: selectedTime
            });

            if (response.data.status === 'success') {
                onClose();
                navigate('/booking-success', {
                    state: {
                        booking: response.data.data.booking,
                        provider: provider,
                        service: service,
                        date: formattedDate,
                        time: selectedTime
                    }
                });
            }
        } catch (err) {
            console.error("Booking error:", err);
            const errorMessage = err.response?.data?.message || "Failed to book appointment. Please try again.";

            // If slot is already booked, refresh the list and show specific error
            if (errorMessage.toLowerCase().includes("booked") || err.response?.status === 400) {
                setBookingError("This slot was just booked. Please select another time.");
                // Refresh slots to show updated availability (dimmed) without showing loading spinner
                fetchSlots(selectedDate, false);
            } else {
                // For other errors (network, server), show the blocking error
                setError(errorMessage);
            }
        } finally {
            setIsBooking(false);
        }
    };

    if (!isOpen || !provider || !service) return null;

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

                {/* Header Section */}
                <div className="relative p-6 md:p-8 text-white" style={{ background: 'linear-gradient(165.72deg, #155DFC 0%, #9810FA 100%)' }}>
                    <div className="flex items-center gap-4 mb-6 pt-2">
                        <div className="w-16 h-16 rounded-full border-4 border-white/30 overflow-hidden shrink-0 bg-white">
                            <img src={provider.profileImage} alt={provider.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{provider.name}</h1>
                            <p className="text-blue-100">{provider.type || "Service Provider"}</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex justify-between items-center border border-white/10">
                        <div>
                            <p className="text-blue-100 text-sm mb-1">Selected Service</p>
                            <p className="text-xl font-bold">{service.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-100 text-sm mb-1">{service.duration} min</p>
                            <p className="text-2xl font-bold">${service.price}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Select Date */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <IoCalendar />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Select Date</h2>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                                <IoChevronBack />
                            </button>
                            <h3 className="font-bold text-lg text-gray-900">{monthNames[currentMonthIndex]} {currentYear}</h3>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
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
                                {/* Empty cells for start of month */}
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} className="h-10"></div>
                                ))}

                                {/* Days of month */}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const isDisabled = isDayDisabled(day);
                                    const isSelected = selectedDate === day;

                                    return (
                                        <div key={day} className="flex justify-center">
                                            <button
                                                onClick={() => !isDisabled && setSelectedDate(day)}
                                                disabled={isDisabled}
                                                className={`
                                                    w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all
                                                    ${isDisabled
                                                        ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                                                        : isSelected
                                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                                                            : 'text-gray-700 hover:bg-white hover:shadow-sm cursor-pointer'
                                                    }
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

                        {selectedDate && (
                            <div className="mt-4 bg-blue-50 rounded-xl p-4 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                                <span className="text-gray-600 text-sm">Selected:</span>
                                <span className="font-bold text-blue-900">
                                    {monthNames[currentMonthIndex]} {selectedDate}, {currentYear}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Select Time */}
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <IoTime />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Select Time</h2>
                        </div>

                        {bookingError && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                <IoAlertCircle className="text-xl shrink-0" />
                                {bookingError}
                            </div>
                        )}

                        <div className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col min-h-[300px]">
                            {!selectedDate ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                                    <IoCalendar className="text-4xl mb-2 opacity-50" />
                                    <p>Select a date to view available times</p>
                                </div>
                            ) : loadingSlots ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-blue-500">
                                    <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mb-2"></div>
                                    <p className="text-sm font-medium">Loading slots...</p>
                                </div>
                            ) : error ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-red-500">
                                    <IoAlertCircle className="text-4xl mb-2 opacity-80" />
                                    <p className="text-sm">{error}</p>
                                    <button
                                        onClick={() => fetchSlots(selectedDate)}
                                        className="mt-2 text-xs bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : availableSlots.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                    <p>No available slots for this date.</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-gray-500 mb-4">Available slots:</p>
                                    <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
                                        {availableSlots.map((slot) => {
                                            const isSelected = slot.time === selectedTime;
                                            const disabled = !slot.available;

                                            return (
                                                <button
                                                    key={slot.time}
                                                    onClick={() => {
                                                        if (!disabled) {
                                                            setSelectedTime(slot.time);
                                                            setBookingError(null);
                                                        }
                                                    }}
                                                    disabled={disabled}
                                                    className={`
                                                        py-3 rounded-xl text-sm font-medium transition-all
                                                        ${disabled
                                                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                            : isSelected
                                                                ? 'text-white shadow-lg shadow-blue-200 transform scale-[1.02]'
                                                                : 'bg-white text-gray-700 hover:shadow-md hover:border-blue-200 border border-transparent'
                                                        }
                                                    `}
                                                    style={isSelected ? { background: 'linear-gradient(165deg, #155DFC 0%, #9810FA 100%)' } : {}}
                                                >
                                                    {slot.time}
                                                    {disabled && <span className="block text-[10px] font-normal">Booked</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>

                        {selectedTime && (
                            <div className="mt-4 bg-purple-50 rounded-xl p-4 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                                <span className="text-gray-600 text-sm">Selected Time:</span>
                                <span className="font-bold text-purple-900">{selectedTime}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-t border-blue-100 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 justify-between mb-6">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Provider & Service</p>
                            <p className="text-gray-900 font-medium">{provider.name} • {service.name}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-sm text-gray-500">Total Price</p>
                            <p className="text-2xl font-bold text-blue-600">${service.price}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={!selectedDate || !selectedTime || isBooking}
                        className={`
                            w-full py-4 rounded-full text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300
                            ${!selectedDate || !selectedTime || isBooking
                                ? 'opacity-50 cursor-not-allowed grayscale'
                                : 'hover:shadow-xl hover:-translate-y-0.5'
                            }
                        `}
                        style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                    >
                        {isBooking ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Confirm Booking
                                <IoArrowBack className="rotate-180" />
                            </>
                        )}
                    </button>
                </div>
            </div>

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
