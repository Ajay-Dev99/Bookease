import axiosInstance from '../../../config/axios';

/**
 * User signup
 */
export const userSignup = async (credentials) => {
    const response = await axiosInstance.post('/user/auth/signup', credentials);
    return response.data;
};

/**
 * User login
 */
export const userLogin = async (credentials) => {
    const response = await axiosInstance.post('/user/auth/login', credentials);
    return response.data;
};
