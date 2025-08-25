import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiService from "../../services/api";
import axiosInstance from "../../utils/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check session
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await apiService.getProfile();

        if (res.data?.success) {
          setUser(res.data.data);
          setIsAuthenticated(true);
        }
      } catch {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // ✅ Memoized OAuth login
  const loginWithOAuth = useCallback(async ({ token, user }) => {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    setIsAuthenticated(true);
  }, []);

  // Regular login
  const login = useCallback(async (email, password) => {
    try {
      const res = await apiService.login(email, password);
      if (res.data?.success) {
        const { token, user } = res.data.data;
        localStorage.setItem("token", token);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try { await apiService.logout(); } catch {}
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = { user, isAuthenticated, loading, login, loginWithOAuth, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
