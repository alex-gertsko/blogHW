import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['sessionId']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (cookies.sessionId) {
      setIsAuthenticated(true);
    }
  }, [cookies]);


  const login = (sessionId) => {
    if (typeof sessionId === 'string'){
        setCookie(sessionId)
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie()
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};