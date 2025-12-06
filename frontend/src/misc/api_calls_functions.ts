import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});


const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const payload = {
      username: username,
      password: password
    }

    const response = await api.post('api-loginUser.php', payload);

    const data = response.data;

    console.log("Server Response:", data);

    if (data["status"] === "success") {
      return true;
    }
    console.log("Login failed:", data.message);
    return false;

  } catch (error) {
    console.log("Network or Server Error:", error);
    return false;
  }
}

const register = async (username: string, password: string): Promise<boolean> => {
  try {
    const payload = {
      username: username,
      password: password
    }

    const response = await api.post('api-registerUser.php', payload);

    const data = response.data;

    console.log("Server Response:", data);

    if (data["status"] === "success") {
      return true;
    }
    console.log("Registration failed:", data.message);
    return false;

  } catch (error) {
    console.log("Network or Server Error:", error);
    return false;
  }
}

export { login, register };
