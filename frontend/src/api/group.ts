import api from './client';

export const create = async (groupName: string, creatorUsername: string): Promise<number | null> => {
  try {
    const payload = { groupName, creatorUsername };
    const response = await api.post('group/create-group.php', payload);
    const data = response.data;

    if (data.status === "success") {
      console.log(`Created group. groupName: ${groupName}, creatorUsername: ${creatorUsername}, groupId: ${data.id_group}`);
      return data.id_group;
    }

    return null;
  } catch (error) {
    return null;
  }
}
