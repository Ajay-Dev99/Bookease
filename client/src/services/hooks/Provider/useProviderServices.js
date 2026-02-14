import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProviderServices, deleteService, toggleServiceStatus, createService, updateService, addBlockedDate, removeBlockedDate, getBlockedDates } from '../../api/Provider/providerServices';


export const useProviderServices = () => {
    return useQuery({
        queryKey: ['provider-services'],
        queryFn: getProviderServices,
        staleTime: 2 * 60 * 1000,
    });
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] });
        },
    });
};

export const useToggleServiceStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ serviceId, isActive }) => toggleServiceStatus(serviceId, isActive),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] });
        },
    });
};

export const useCreateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ serviceData, imageFiles, blockedDates }) =>
            createService(serviceData, imageFiles, blockedDates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] });
        },
    });
};

export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] });
        },
    });
};

export const useAddBlockedDate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ serviceId, blockedDateData }) => addBlockedDate(serviceId, blockedDateData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] });
            queryClient.invalidateQueries({ queryKey: ['blocked-dates', variables.serviceId] });
        },
    });
};

export const useRemoveBlockedDate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ serviceId, blockId }) => removeBlockedDate(serviceId, blockId),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['provider-services'] });
            queryClient.invalidateQueries({ queryKey: ['blocked-dates', variables.serviceId] });
        },
    });
};

export const useGetBlockedDates = (serviceId) => {
    return useQuery({
        queryKey: ['blocked-dates', serviceId],
        queryFn: () => getBlockedDates(serviceId),
        enabled: !!serviceId,
    });
};
