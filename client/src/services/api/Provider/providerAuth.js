import axiosInstance from '../../../config/axios';

export const providerSignup = async (formData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('password', formData.password);
    data.append('about', formData.about);
    data.append('address', formData.address);

    // Append profile image if exists
    if (formData.profileImage) {
        data.append('profileImage', formData.profileImage);
    }

    const response = await axiosInstance.post('/provider/auth/signup', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const providerLogin = async (credentials) => {
    const response = await axiosInstance.post('/provider/auth/login', credentials);
    return response.data;
};

export const updateProviderProfile = async (formData) => {
    const data = new FormData();

    if (formData.name) data.append('name', formData.name);
    if (formData.about) data.append('about', formData.about);
    if (formData.address) data.append('address', formData.address);
    if (formData.phoneNumber) data.append('phoneNumber', formData.phoneNumber);
    if (formData.profileImage) data.append('profileImage', formData.profileImage);

    const response = await axiosInstance.patch('/provider/auth/update-profile', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
