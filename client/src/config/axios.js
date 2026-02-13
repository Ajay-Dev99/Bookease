import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized - Token expired or invalid
        if (error.response?.status === 401) {
            // Only redirect if not already on a login/signup page
            const currentPath = window.location.pathname;
            const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup');

            if (!isAuthPage) {
                // Clear auth data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('userType');

                // Redirect based on user type
                const userType = localStorage.getItem('userType');
                if (userType === 'provider') {
                    window.location.href = '/login/provider';
                } else {
                    window.location.href = '/login/customer';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
