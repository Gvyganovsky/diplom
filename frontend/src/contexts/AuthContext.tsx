import React, { ReactNode, createContext, useState } from "react";
import axios from "axios";

interface User {
    login: string;
    email: string;
    phone: string;
    address: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    signUp: (userData: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    signUp: async () => { }
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const signUp = async (userData: User) => {
        try {
            const response = await axios.post("https://dp-viganovsky.xn--80ahdri7a.site/api/signup", userData);
            setUser(userData);
        } catch (error) {
            console.log("Ошибка регистрации:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
