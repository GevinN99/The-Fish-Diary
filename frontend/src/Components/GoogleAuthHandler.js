import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Loading from "./Loading/Loading";

const GoogleAuthHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('userId');
        const name = params.get('name');
        const role = params.get('role');

        if (token && userId && name && role) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);

            message.success('Login successful');

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } else {
            message.error('Login failed');
            navigate('/login');
        }
    }, [location, navigate]);

    return <Loading/>;
};

export default GoogleAuthHandler;
