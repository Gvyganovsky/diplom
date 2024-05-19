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
    basket: BasketItem[];
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: Omit<User, 'id'>) => Promise<void>;
    addToBasket: (product: Product, quantity: number) => Promise<void>;
    loadBasket: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [basket, setBasket] = useState<BasketItem[]>([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            loadBasket();
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.get('https://6630f40fc92f351c03dbb255.mockapi.io/user');
            const users: User[] = response.data;
            const foundUser = users.find(user => user.email === email && user.password === password);
            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
                await loadBasket();
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
        setBasket([]);
        localStorage.removeItem('user');
    };

    const register = async (userData: Omit<User, 'id'>) => {
        try {
            const response = await axios.post('https://6630f40fc92f351c03dbb255.mockapi.io/user', userData);
            setUser(response.data);
            await loadBasket();
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
                count: quantity
            });
            console.log('Товар успешно добавлен в корзину:', response.data);
            await loadBasket();
        } catch (error) {
            console.error('Ошибка добавления товара в корзину:', error);
            throw error;
        }
    };

    const loadBasket = async () => {
        if (!user) return;
        try {
            const response = await axios.get(`https://6648b1ce4032b1331bec22b7.mockapi.io/basket?user=${user.id}`);
            const basketItems = response.data;
            const productRequests = basketItems.map((item: any) =>
                axios.get(`https://6630f40fc92f351c03dbb255.mockapi.io/product/${item.product}`)
            );
            const productsResponses = await Promise.all(productRequests);
            const loadedBasket = productsResponses.map((response, index) => ({
                product: response.data,
                quantity: basketItems[index].count
            }));
            setBasket(loadedBasket);
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, basket, login, logout, register, addToBasket, loadBasket }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
