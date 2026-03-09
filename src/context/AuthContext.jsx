import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const response = await authService.getCurrentUser();
                let userData = null;
                if (response.data && response.data.length > 0) {
                    userData = response.data[0];
                } else {
                    userData = { id: decoded.user_id };
                }
                setUser(userData);
                setLoading(false);
                return userData;
            } catch (error) {
                console.error("Auth check failed", error);
                authService.logout();
                setUser(null);
                setLoading(false);
                return null;
            }
        }
        setLoading(false);
        return null;
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (username, password) => {
        try {
            await authService.login(username, password);
            return await checkAuthStatus();
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
