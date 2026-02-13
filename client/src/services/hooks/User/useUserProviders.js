import { useQuery } from '@tanstack/react-query';
import { getAllProviders, getProviderById } from '../../api/User/userProviders';
export const useAllProviders = () => {
    return useQuery({
        queryKey: ['public-providers'],
        queryFn: getAllProviders,
        staleTime: 5 * 60 * 1000,
    });
};

export const useProviderDetails = (id) => {
    return useQuery({
        queryKey: ['public-provider', id],
        queryFn: () => getProviderById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};
