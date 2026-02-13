import axiosInstance from '../../../config/axios';

export const getAllProviders = async () => {
    const response = await axiosInstance.get('/providers');
    return response.data;
};

export const getProviderById = async (id) => {
    const response = await axiosInstance.get(`/providers/${id}`);
    return response.data;
};
