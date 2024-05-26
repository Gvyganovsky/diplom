import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user || user.admin !== 1) {
        // Перенаправление на страницу авторизации, если пользователь не администратор
        return <Navigate to="/auth/signin" />;
    }

    return children;
};

export default ProtectedRoute;
