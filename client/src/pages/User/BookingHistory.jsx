import React, { useState, useEffect } from 'react';
import { IoSearch, IoCalendar, IoTime, IoLocation, IoCall, IoMail, IoChevronForward, IoStar, IoClose } from 'react-icons/io5';
import axiosInstance from '../../config/axios';

const BookingHistory = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/bookings/my-appointments');
            const { upcoming, past } = res.data.data;

            // Helper to format booking data for UI
            const mapBooking = (b, forcedStatus) => ({
                id: b._id,
                confirmationCode: b._id.slice(-6).toUpperCase(),
                provider: {
                    name: b.provider.name,
                    specialty: 'Healthcare Provider', // Default as schema might vary
                    image: b.provider.profileImage || 'https://via.placeholder.com/150'
                },
                service: b.service.name,
                date: new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                time: (() => {
                    const [h, m] = b.startTime.split(':');
                    const d = new Date();
                    d.setHours(h, m);
                    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                })(),
                location: b.provider.address || 'Medical Center',
                price: b.service.price,
                status: forcedStatus || b.status
            });

            const allBookings = [
                ...upcoming.map(b => mapBooking(b, 'upcoming')),
                ...past.map(b => mapBooking(b))
            ];
            setBookings(allBookings);
        } catch (err) {
            console.error("Failed to fetch bookings:", err);
            setError("Failed to load your appointments.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await axiosInstance.patch(`/bookings/${id}/cancel`);
            fetchBookings(); // Refresh list to update status
        } catch (err) {
            console.error("Failed to cancel booking:", err);
            alert("Failed to cancel booking. Please try again.");
        }
    };

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'upcoming', label: 'Upcoming' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-700',
                    border: 'border-blue-200'
                };
            case 'completed':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    border: 'border-green-200'
                };
            case 'cancelled':
                return {
                    bg: 'bg-red-100',
                    text: 'text-red-700',
                    border: 'border-red-200'
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-700',
                    border: 'border-gray-200'
                };
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
        const matchesSearch = searchQuery === '' ||
            booking.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.confirmationCode.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: bookings.length,
        upcoming: bookings.filter(b => b.status === 'upcoming').length,
        completed: bookings.filter(b => b.status === 'completed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section with Gradient */}
            <div className="relative h-72 overflow-hidden" style={{ background: 'linear-gradient(166.142deg, #155DFC 0%, #9810FA 100%)' }}>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-6 pt-32">
                    <h1 className="text-5xl font-bold text-white text-center mb-4">My Appointments</h1>
                    <p className="text-xl text-blue-100 text-center">View and manage all your appointments in one place</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 pb-12">
                {/* Stats & Filters Card */}
                <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">

                        {/* Filter Buttons */}
                        <div className="flex gap-3 flex-wrap">
                            {filters.map(filter => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${activeFilter === filter.id
                                        ? 'text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    style={activeFilter === filter.id ? { background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' } : {}}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                            <p className="text-sm text-gray-600 mt-1">Total Bookings</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-green-600">{stats.upcoming}</p>
                            <p className="text-sm text-gray-600 mt-1">Upcoming</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-purple-600">{stats.completed}</p>
                            <p className="text-sm text-gray-600 mt-1">Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
                            <p className="text-sm text-gray-600 mt-1">Cancelled</p>
                        </div>
                    </div>
                </div>

                {/* Upcoming Appointments */}
                {filteredBookings.filter(b => b.status === 'upcoming').length > 0 && (activeFilter === 'all' || activeFilter === 'upcoming') && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #155DFC 0%, #9810FA 100%)' }}></div>
                            <h2 className="text-3xl font-bold text-gray-900">Upcoming Appointments</h2>
                        </div>
                        <div className="space-y-6">
                            {filteredBookings.filter(b => b.status === 'upcoming').map(booking => (
                                <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} onCancel={handleCancel} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Appointments */}
                {filteredBookings.filter(b => b.status !== 'upcoming').length > 0 && (activeFilter === 'all' || activeFilter === 'completed' || activeFilter === 'cancelled') && (
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 rounded-full bg-gradient-to-b from-gray-400 to-gray-600"></div>
                            <h2 className="text-3xl font-bold text-gray-900">Past Appointments</h2>
                        </div>
                        <div className="space-y-6">
                            {filteredBookings.filter(b => b.status !== 'upcoming').map(booking => (
                                <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} isPast />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {filteredBookings.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <IoSearch size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No appointments found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Booking Card Component
const BookingCard = ({ booking, getStatusColor, isPast = false, onCancel }) => {
    const statusColors = getStatusColor(booking.status);

    return (
        <div className={`bg-white rounded-3xl shadow-xl p-6 transition-all hover:shadow-2xl ${booking.status === 'upcoming' ? 'border-2 border-blue-100' : ''
            }`}>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Provider Image */}
                <div className="shrink-0">
                    <img
                        src={booking.provider.image}
                        alt={booking.provider.name}
                        className="w-32 h-32 rounded-2xl object-cover"
                    />
                </div>

                {/* Booking Details */}
                <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{booking.provider.name}</h3>
                            <p className={`text-lg font-bold mt-1 ${isPast ? 'text-gray-600' : 'text-blue-600'
                                }`}>{booking.provider.specialty}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Confirmation: <span className="font-mono font-bold text-gray-900">{booking.confirmationCode}</span>
                            </p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${statusColors.bg} ${statusColors.text} inline-flex items-center gap-2`}>
                            {booking.status === 'upcoming' && <IoCalendar />}
                            {booking.status === 'completed' && <IoStar />}
                            {booking.status === 'cancelled' && <IoClose />}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                    </div>

                    {/* Date, Time, Service Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className={`${isPast ? 'bg-gray-50' : 'bg-blue-50'
                            } rounded-2xl p-3 flex items-center gap-3`}>
                            <IoCalendar className={isPast ? 'text-gray-500' : 'text-blue-600'} size={20} />
                            <div>
                                <p className="text-xs text-gray-600">Date</p>
                                <p className="font-bold text-gray-900">{booking.date}</p>
                            </div>
                        </div>
                        <div className={`${isPast ? 'bg-gray-50' : 'bg-purple-50'
                            } rounded-2xl p-3 flex items-center gap-3`}>
                            <IoTime className={isPast ? 'text-gray-500' : 'text-purple-600'} size={20} />
                            <div>
                                <p className="text-xs text-gray-600">Time</p>
                                <p className="font-bold text-gray-900">{booking.time}</p>
                            </div>
                        </div>
                        <div className={`${isPast ? 'bg-gray-50' : 'bg-green-50'
                            } rounded-2xl p-3 flex items-center gap-3`}>
                            <IoLocation className={isPast ? 'text-gray-500' : 'text-green-600'} size={20} />
                            <div>
                                <p className="text-xs text-gray-600">Service</p>
                                <p className="font-bold text-gray-900">{booking.service}</p>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <IoLocation size={16} />
                        <p className="text-sm">{booking.location}</p>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                            {!isPast && (
                                <>
                                    <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                        <IoCall size={16} />
                                        Call
                                    </button>
                                    <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                        <IoMail size={16} />
                                        Email
                                    </button>
                                </>
                            )}
                            <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                View Details
                                <IoChevronForward size={16} />
                            </button>
                            {isPast && booking.status === 'completed' && (
                                <button className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors">
                                    <IoStar size={16} />
                                    Leave Review
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-blue-600">${booking.price}</span>
                            {!isPast && (
                                <button
                                    onClick={() => onCancel(booking.id)}
                                    className="px-6 py-2.5 bg-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-200 transition-colors"
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingHistory;
