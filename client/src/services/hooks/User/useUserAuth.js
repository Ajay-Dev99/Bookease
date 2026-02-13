import { useMutation } from '@tanstack/react-query';
import { userSignup, userLogin } from '../../api/User/userAuth';
import { useNavigate } from 'react-router-dom';

/**
 * Hook for user signup
 */
export const useUserSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: userSignup,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            localStorage.setItem('userType', 'customer');
            navigate('/');
        },
        onError: (error) => {
            console.error('Signup error:', error);
        },
    });
};

/**
 * Hook for user login
 */
export const useUserLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: userLogin,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            localStorage.setItem('userType', 'customer');
            navigate('/');
        },
        onError: (error) => {
            console.error('Login error:', error);
        },
    });
};
