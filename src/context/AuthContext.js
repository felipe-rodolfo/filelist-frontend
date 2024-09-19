import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(token ? jwtDecode(token) : null);

    useEffect(() => {
        if (token) {
            setUser(jwtDecode(token));
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'))
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:3003/api/auth/login', { email, password });
            setToken(res.data.token);
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
