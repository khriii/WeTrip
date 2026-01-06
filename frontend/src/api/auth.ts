import api from './client';
import { isAxiosError } from 'axios';

export interface User {
  id: number;
  username: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Login function
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const payload = { username, password };
    const response = await api.post('auth/login.php', payload);
    const data = response.data;

    if (data.status === "success" && data.user) {
      return { 
        success: true, 
        user: data.user as User 
      };
    }

    return { 
      success: false, 
      error: data.message || "Credenziali non valide" 
    };

  } catch (error) {
    let errorMessage = "Errore di connessione al server";
    
    if (isAxiosError(error) && error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    return { 
      success: false, 
      error: errorMessage 
    };
  }
}

// Register function
export const register = async (username: string, password: string): Promise<boolean> => {
  try {
    const payload = { username, password };
    const response = await api.post('auth/register.php', payload);
    const data = response.data;

    if (data.status === "success") {
      return true;
    }

    return false;

  } catch (error) {
    return false;
  }
}

// Check authentication status
export const checkAuth = async (): Promise<User | null> => {
  try {
    const response = await api.get('auth/check.php');

    if (response.data.isAuthenticated && response.data.user) {
      return response.data.user as User;
    }

    return null;
  } catch (error) {
    return null;
  }
}

// Logout function
export const logout = async (): Promise<boolean> => {
  try {
    await api.post('auth/logout.php');
    return true;
  } catch (error) {
    return false;
  }
}