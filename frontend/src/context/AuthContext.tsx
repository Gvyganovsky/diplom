import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
    id?: string;
    login: string;
    email: string;
    phone: string;
    address: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: Omit<User, 'id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Проверяем, есть ли сохраненный пользователь в localStorage при инициализации приложения
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.get('https://6630f40fc92f351c03dbb255.mockapi.io/user');
            const users: User[] = response.data;
            const foundUser = users.find(user => user.email === email && user.password === password);
            if (foundUser) {
                setUser(foundUser);
                // Сохранение пользователя в localStorage
                localStorage.setItem('user', JSON.stringify(foundUser));
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        // Удаление пользователя из localStorage при выходе
        localStorage.removeItem('user');
    };

    const register = async (userData: Omit<User, 'id'>) => {
        try {
            const response = await axios.post('https://6630f40fc92f351c03dbb255.mockapi.io/user', userData);
            setUser(response.data);
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
