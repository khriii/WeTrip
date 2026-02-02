import api from './client';

export const createStop = async (stopName: string, stopDescription: string, stopPrice: number, cityId: number): Promise<number | null> => {
  try {
    const payload = {
      name: stopName,
      description: stopDescription,
      price: stopPrice,
      id_city: cityId
    };
    const response = await api.post('stops/add-stop.php', payload);
    const data = response.data;

    if (data.status === "success") {
      console.log(`Created stop. id: ${data.stop_id}`);
      return data.stop_id;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export interface StopData {
  id: number;
  id_city: number;
  name: string;
  description: string;
  price: number;
  city_name?: string;
}


export const getCityStops = async (cityId: number | string): Promise<StopData[]> => {
  try {
    const payload = { city_id: cityId };
    const response = await api.post('stops/get-all-stops-from-city.php', payload);
    const data = response.data;

    if (data.status === "success") {
      return data.stops;
    }
    return [];
  } catch (error) {
    console.error("Error fetching stops for city:", error);
    return [];
  }
}

