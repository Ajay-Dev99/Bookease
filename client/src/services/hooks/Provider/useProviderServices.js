import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProviderServices, deleteService, toggleServiceStatus, createService } from '../../api/Provider/providerServices';


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
