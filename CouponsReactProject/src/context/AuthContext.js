import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

    const login = (role) => {
        setUserRole(role);
        localStorage.setItem("role", role);
    };

    const logout = () => {
        setUserRole(null);
        localStorage.removeItem("role");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
