import api from './client';

export const create = async (name: string, username: string, role: string): Promise<boolean> => {
    try {
        const payload = { name, username, role };
        const response = await api.post('group/create-group.php', payload);
        const data = response.data;

        if (data.status === "success") {
            return true;
        } else {
            return data;
        }
    } catch (error) {
        return false;
    }
}