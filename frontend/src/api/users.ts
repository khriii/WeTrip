import api from './client';

export interface UserSearchResult {
    id: number;
    username: string;
}

export const findUsers = async (query: string): Promise<UserSearchResult[]> => {
    try {
        if (query.length < 2) return [];

        const payload = { query };
        
        const response = await api.post('users/find-user.php', payload);
        
        if (Array.isArray(response.data)) {
            console.log(response.data);
            return response.data;
        }

        return [];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}