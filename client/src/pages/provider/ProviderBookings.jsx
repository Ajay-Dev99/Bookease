import React, { useState } from 'react';
import { useProviderBookings, useUpdateBookingStatus } from '../../services/hooks/useProviderBookings';
import { useProviderServices } from '../../services/hooks/useProviderServices';
import {
    IoCalendarOutline,
    IoTimeOutline,
    IoPersonOutline,
    IoCallOutline,
    IoCheckmarkCircle,
    IoCloseCircle,
    IoHourglassOutline,
    IoFilterOutline,
    IoSearchOutline
} from 'react-icons/io5';

const ProviderBookings = () => {
    const [filters, setFilters] = useState({
        status: '',
        serviceId: '',
        search: ''
    });

    const { data: bookingsData, isLoading, isError, error } = useProviderBookings(filters);
    const { data: servicesData } = useProviderServices();
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateBookingStatus();
    const [updatingId, setUpdatingId] = useState(null);

    const handleStatusUpdate = (bookingId, newStatus) => {
        if (window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) {
            setUpdatingId(bookingId);
            updateStatus(
                { bookingId, status: newStatus },
                {
                    onSuccess: () => {
                        alert(`Booking ${newStatus} successfully!`);
                    },
                    onError: (error) => {
                        alert(error?.response?.data?.message || 'Failed to update booking');
                    },
                    onSettled: () => setUpdatingId(null)
                }
            );
        }
    };

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
                    {error?.response?.data?.message || 'Failed to load bookings. Please try again.'}
                </p>
            </div>
        );
    }

    const bookings = bookingsData?.data?.bookings || [];
    const services = servicesData?.data?.services || [];

    // Filter bookings by search
    const filteredBookings = bookings.filter(booking => {
        if (!filters.search) return true;
        const searchLower = filters.search.toLowerCase();
        return (
            booking.user?.name?.toLowerCase().includes(searchLower) ||
            booking.user?.email?.toLowerCase().includes(searchLower) ||
            booking.service?.name?.toLowerCase().includes(searchLower)
        );
    });

    // Group bookings by status
    const upcomingBookings = filteredBookings.filter(b => b.status === 'booked');
    const completedBookings = filteredBookings.filter(b => b.status === 'completed');
    const cancelledBookings = filteredBookings.filter(b => b.status === 'cancelled');

    const getStatusBadge = (status) => {
        const styles = {
            booked: 'bg-blue-100 text-blue-700',
            completed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700'
        };
        const icons = {
            booked: IoHourglassOutline,
            completed: IoCheckmarkCircle,
            cancelled: IoCloseCircle
        };
        const Icon = icons[status];
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${styles[status]}`}>
                <Icon size={14} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const BookingCard = ({ booking }) => (
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{booking.service?.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                            <IoCalendarOutline size={16} />
                            {formatDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-1">
                            <IoTimeOutline size={16} />
                            {booking.startTime}
                        </span>
                    </div>
                </div>
                {getStatusBadge(booking.status)}
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-bold text-gray-500 mb-2">Customer Details</p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <IoPersonOutline size={18} className="text-gray-600" />
                        <span className="font-bold text-gray-900">{booking.user?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoCallOutline size={18} className="text-gray-600" />
                        <span className="text-gray-700">{booking.user?.phoneNumber || 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* Service Details */}
            <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-600">Duration:</span>
                <span className="font-bold text-gray-900">{booking.service?.duration} min</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-600">Price:</span>
                <span className="font-bold text-green-600">${booking.service?.price}</span>
            </div>

            {/* Actions */}
            {booking.status === 'booked' && (
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                        onClick={() => handleStatusUpdate(booking._id, 'completed')}
                        disabled={updatingId === booking._id}
                        className="flex-1 px-4 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {updatingId === booking._id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <IoCheckmarkCircle size={18} />
                                Complete
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                        disabled={updatingId === booking._id}
                        className="flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {updatingId === booking._id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <IoCloseCircle size={18} />
                                Cancel
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Bookings</h1>
                <p className="text-gray-600">Manage your appointments and bookings</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <IoFilterOutline size={20} className="text-gray-600" />
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Search
                        </label>
                        <div className="relative">
                            <IoSearchOutline size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                placeholder="Customer name or service..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">All Statuses</option>
                            <option value="booked">Booked</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Service Filter */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Service
                        </label>
                        <select
                            value={filters.serviceId}
                            onChange={(e) => setFilters(prev => ({ ...prev, serviceId: e.target.value }))}
                            className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">All Services</option>
                            {services.map(service => (
                                <option key={service._id} value={service._id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-600 font-bold mb-1">Upcoming</p>
                            <p className="text-3xl font-bold text-blue-700">{upcomingBookings.length}</p>
                        </div>
                        <IoHourglassOutline size={40} className="text-blue-400" />
                    </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-bold mb-1">Completed</p>
                            <p className="text-3xl font-bold text-green-700">{completedBookings.length}</p>
                        </div>
                        <IoCheckmarkCircle size={40} className="text-green-400" />
                    </div>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600 font-bold mb-1">Cancelled</p>
                            <p className="text-3xl font-bold text-red-700">{cancelledBookings.length}</p>
                        </div>
                        <IoCloseCircle size={40} className="text-red-400" />
                    </div>
                </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length > 0 ? (
                <div className="space-y-6">
                    {/* Upcoming Bookings */}
                    {upcomingBookings.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Bookings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {upcomingBookings.map(booking => (
                                    <BookingCard key={booking._id} booking={booking} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Completed Bookings */}
                    {completedBookings.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Bookings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {completedBookings.map(booking => (
                                    <BookingCard key={booking._id} booking={booking} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cancelled Bookings */}
                    {cancelledBookings.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancelled Bookings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cancelledBookings.map(booking => (
                                    <BookingCard key={booking._id} booking={booking} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                    <IoCalendarOutline size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">No Bookings Found</h3>
                    <p className="text-gray-500">
                        {filters.status || filters.serviceId || filters.search
                            ? 'Try adjusting your filters'
                            : 'You don\'t have any bookings yet'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProviderBookings;
