import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  user: null,
  role: null, // 'customer' | 'provider'
  login: () => {},
  logout: () => {},
  setRole: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
