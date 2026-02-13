import axiosInstance from '../../config/axios';

/**
 * Get all bookings for the logged-in provider
 */
export const getProviderBookings = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.status) params.append('status', filters.status);
    if (filters.serviceId) params.append('serviceId', filters.serviceId);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    const response = await axiosInstance.get(`/bookings/provider-bookings?${params.toString()}`);
    return response.data;
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (bookingId, status) => {
    const response = await axiosInstance.patch(`/bookings/${bookingId}/status`, { status });
    return response.data;
};
