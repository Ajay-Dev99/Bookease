import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProviderBookings, updateBookingStatus } from '../api/providerBookings';

/**
 * Hook to fetch provider's bookings with optional filters
 */
export const useProviderBookings = (filters = {}) => {
    return useQuery({
        queryKey: ['provider-bookings', filters],
        queryFn: () => getProviderBookings(filters),
        staleTime: 1 * 60 * 1000, // 1 minute
    });
};

/**
 * Hook to update booking status
 */
export const useUpdateBookingStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ bookingId, status }) => updateBookingStatus(bookingId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provider-bookings'] });
            queryClient.invalidateQueries({ queryKey: ['provider-reports'] });
        },
    });
};
