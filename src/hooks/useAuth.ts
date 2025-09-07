// src/hooks/useAuth.ts - Authentication hook

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '../store/store';
import { loginAsync, logoutAsync, registerAsync, clearError } from '../store/slices/authSlice';

// Temporary interfaces until we have the actual store setup
interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Temporary placeholder hook structure
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch(loginAsync(credentials));
  }, [dispatch]);

  const register = useCallback(async (userData: RegisterData) => {
    dispatch(registerAsync(userData));
  }, [dispatch]);

  const logout = useCallback(async () => {
    dispatch(logoutAsync());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: clearAuthError,
  };
};
