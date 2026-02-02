import api from './client';

export const createCity = async (name: string, groupId: number | string): Promise<number | null> => {
    try {
        const payload = { name, id_group: groupId };
        const response = await api.post('cities/add-city.php', payload);
        const data = response.data;

        if (data.status === "success") {
            console.log(`Created city. Name: ${name}, GroupID: ${groupId}`);
            return data.city_id;
        }

        return null;
    } catch (error) {
        console.error("Error creating city:", error);
        return null;
    }
}

export interface CityData {
    id: number;
    name: string;
}

export const getGroupCities = async (groupId: number | string): Promise<CityData[]> => {
    try {
        const payload = { id_group: groupId };
        const response = await api.post('cities/get-all-cities-from-group.php', payload);
        const data = response.data;

        if (data.status === "success") {
            return data.cities;
        }
        return [];
    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
}
