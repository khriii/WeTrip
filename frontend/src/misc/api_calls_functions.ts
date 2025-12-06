import axios from 'axios';

export interface User {
  id: number;
  username: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const login = async (username: string, password: string): Promise<User | null> => {
  try {
    const payload = { username, password };
    const response = await api.post('api-loginUser.php', payload);
    const data = response.data;

    if (data.status === "success" && data.user) {
      return data.user as User;
    }

    return null;

  } catch (error) {
    return null;
  }
}

const register = async (username: string, password: string): Promise<boolean> => {
  try {
    const payload = { username, password };
    const response = await api.post('api-registerUser.php', payload);
    const data = response.data;

    if (data.status === "success") {
      return true;
    }

    return false;

  } catch (error) {
    return false;
  }
}

const checkAuth = async (): Promise<User | null> => {
  try {
    const response = await api.get('api-checkAuth.php');

    if (response.data.isAuthenticated && response.data.user) {
      return response.data.user as User;
    }

    return null;
  } catch (error) {
    return null;
  }
}

const logout = async (): Promise<boolean> => {
  try {
    await api.post('api-logout.php');
    return true;
  } catch (error) {
    return false;
  }
}

export { login, register, checkAuth, logout };
