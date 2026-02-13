import { useMutation } from '@tanstack/react-query';
import { providerSignup, providerLogin, updateProviderProfile } from '../../api/Provider/providerAuth';
import { useNavigate } from 'react-router-dom';

export const useProviderSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: providerSignup,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            localStorage.setItem('userType', 'provider');

            navigate('/provider/dashboard');
        },
        onError: (error) => {
            console.error('Signup error:', error);
        },
    });
};


export const useProviderLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: providerLogin,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            localStorage.setItem('userType', 'provider');
            navigate('/provider/dashboard');
        },
        onError: (error) => {
            console.error('Login error:', error);
        },
    });
};

export const useUpdateProviderProfile = () => {
    return useMutation({
        mutationFn: updateProviderProfile,
        onSuccess: (data) => {
            localStorage.setItem('user', JSON.stringify(data.data.provider));
        },
        onError: (error) => {
            console.error('Profile update error:', error);
        },
    });
};
