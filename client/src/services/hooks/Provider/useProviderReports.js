import { useQuery } from '@tanstack/react-query';
import { getProviderReports } from '../../api/Provider/providerReports';
export const useProviderReports = () => {
    return useQuery({
        queryKey: ['provider-reports'],
        queryFn: getProviderReports,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });
};
