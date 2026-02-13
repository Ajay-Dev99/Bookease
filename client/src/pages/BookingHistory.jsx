import React, { useState } from 'react';
import { IoSearch, IoCalendar, IoTime, IoLocation, IoCall, IoMail, IoChevronForward, IoStar, IoClose } from 'react-icons/io5';

const BookingHistory = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock booking data
    const bookings = [
        {
            id: 1,
            confirmationCode: 'BK-A3F8G2H1K',
            provider: {
                name: 'Dr. Sarah Mitchell',
                specialty: 'General Physician',
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop'
            },
            service: 'General Consultation',
            date: 'February 20, 2026',
            time: '2:00 PM',
            location: '456 Park Avenue, Suite 200, New York, NY 10022',
            price: 150,
            status: 'upcoming'
        },
        {
            id: 2,
            confirmationCode: 'BK-B9D4E6F2M',
            provider: {
                name: 'Dr. Michael Chen',
                specialty: 'Cardiologist',
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop'
            },
            service: 'Cardiac Checkup',
            date: 'February 25, 2026',
            time: '10:00 AM',
            location: '789 Medical Plaza, Floor 5, New York, NY 10023',
            price: 200,
            status: 'upcoming'
        },
        {
            id: 3,
            confirmationCode: 'BK-C7H3J5K9N',
            provider: {
                name: 'Dr. Emily Rodriguez',
                specialty: 'Dermatologist',
                image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&auto=format&fit=crop'
            },
            service: 'Skin Consultation',
            date: 'January 30, 2026',
            time: '3:00 PM',
            location: '123 Health Street, New York, NY 10001',
            price: 180,
            status: 'completed'
        },
        {
            id: 4,
            confirmationCode: 'BK-D2F8G4H6P',
            provider: {
                name: 'Dr. James Wilson',
                specialty: 'Orthopedic Surgeon',
                image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop'
            },
            service: 'Joint Assessment',
            date: 'January 15, 2026',
            time: '11:00 AM',
            location: '456 Wellness Center, New York, NY 10002',
            price: 250,
            status: 'completed'
        },
        {
            id: 5,
            confirmationCode: 'BK-E5J9K2L7Q',
            provider: {
                name: 'Dr. Lisa Thompson',
                specialty: 'Pediatrician',
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop'
            },
            service: 'Child Wellness Visit',
            date: 'December 20, 2025',
            time: '9:00 AM',
            location: '789 Kids Care, New York, NY 10003',
            price: 120,
            status: 'cancelled'
        }
    ];

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
                                <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
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
const BookingCard = ({ booking, getStatusColor, isPast = false }) => {
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
                                <button className="px-6 py-2.5 bg-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-200 transition-colors">
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
