import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("mediconnectUser"));
  const savedToken = localStorage.getItem("mediconnectToken");
  const [user, setUser] = useState(savedUser || null);
  const [token, setToken] = useState(savedToken || null);

  // Setup axios interceptor to add auth token header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("mediconnectToken", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("mediconnectToken");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("mediconnectUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("mediconnectUser");
    }
  }, [user]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
