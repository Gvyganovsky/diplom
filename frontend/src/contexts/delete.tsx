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

interface Product {
    name: string;
    image: string[];
    brand: string;
    model: string;
    price: number;
    description: string[];
    count: number;
    id: string;
}

interface BasketItem {
    product: Product;
    quantity: number;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: Omit<User, 'id'>) => Promise<void>;
    addToBasket: (product: Product, quantity: number) => Promise<void>;
    createOrder: () => Promise<void>;
    basket: BasketItem[];
    clearBasket: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [basket, setBasket] = useState<BasketItem[]>([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [basket]);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.get('https://6630f40fc92f351c03dbb255.mockapi.io/user');
            const users: User[] = response.data;
            const foundUser = users.find(user => user.email === email && user.password === password);
            if (foundUser) {
                setUser(foundUser);
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
        localStorage.removeItem('user');
        setBasket([]);
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

    const addToBasket = async (product: Product, quantity: number) => {
        try {
            const response = await axios.post('https://6648b1ce4032b1331bec22b7.mockapi.io/basket', {
                user: user?.id,
                product: product.id,
                count: quantity,
            });
            setBasket([...basket, { product, quantity }]);
        } catch (error) {
            console.error('Ошибка добавления товара в корзину:', error);
            throw error;
        }
    };

    const createOrder = async () => {
        try {
            await axios.post('https://6648b1ce4032b1331bec22b7.mockapi.io/order', {
                user: user?.id,
                product: basket.map(item => ({ id: item.product.id, quantity: item.quantity })),
                createdAt: Date.now(),
            });

            clearBasket();
        } catch (error) {
            console.error('Ошибка создания заказа:', error);
            throw error;
        }
    };


    const clearBasket = async () => {
        try {
            // Получаем все элементы корзины для текущего пользователя
            const response = await axios.get(`https://6648b1ce4032b1331bec22b7.mockapi.io/basket?user=${user?.id}`);
            const basketItems = response.data;
            // Для каждого элемента корзины отправляем запрос DELETE
            await Promise.all(basketItems.map(async (item: any) => {
                await axios.delete(`https://6648b1ce4032b1331bec22b7.mockapi.io/basket/${item.id}`);
            }));
    
            // После успешного удаления всех элементов, обновляем состояние корзины
            setBasket([]);
        } catch (error) {
            console.error('Ошибка очистки корзины:', error);
            throw error;
        }
    };
    


    return (
        <AuthContext.Provider value={{ user, login, logout, register, addToBasket, createOrder, basket, clearBasket }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };