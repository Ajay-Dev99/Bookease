import axiosInstance from '../../../config/axios';

export const getProviderReports = async () => {
    const response = await axiosInstance.get('/provider/auth/reports');
    return response.data;
};
