import api from './client';

export interface GroupMember {
    id: number;
    username: string;
    role: string;
}

export interface UserGroup {
    id: number;
    name: string;
    role: string;
}



export const create = async (groupName: string, creatorUsername: string): Promise<number | null> => {
	try {
		const payload = { groupName, creatorUsername };
		const response = await api.post('group/create-group.php', payload);
		const data = response.data;

		if (data.status === "success") {
			console.log(`Created group: ${groupName}, ID: ${data.id_group}`);
			return data.id_group;
		}

		return null;
	} catch (error) {
		console.error("Error creating group:", error);
		return null;
	}
}



export const getGroupName = async (groupId: number): Promise<string | null> => {
	try {
		const response = await api.post('group/get-group-name.php', { groupId });
		const data = response.data;

		if (data.status === "success") {
			return data.groupName;
		}

		return null;
	} catch (error) {
		return null;
	}
}



export const addUser = async (groupId: number, username: string, role: string = "default"): Promise<boolean> => {
	try {
		const payload = { 
			group_id: groupId, 
			username: username,
			role: role 
		};

		const response = await api.post('group/add-user.php', payload);
		const data = response.data;

		if (data.status === "success") {
			return true;
		}

		return false;
	} catch (error) {
		console.error(`Error adding user ${username}:`, error);
		return false;
	}
}



export const checkMembership = async (groupId: number): Promise<boolean> => {
    try {
        const response = await api.post('group/check-membership.php', { group_id: groupId });
        
        if (response.data.status === "success" && response.data.isMember === true) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Membership check failed:", error);
        return false;
    }
}




export const getGroupMembers = async (groupId: number): Promise<GroupMember[]> => {
    try {
        const response = await api.post('group/get-group-members.php', { groupId });
        
        if (response.data.status === "success") {
            return response.data.members;
        }
        return [];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}



export const getUserGroups = async (userId: number): Promise<UserGroup[]> => {
    try {
        const payload = { user_id: userId };
        
        const response = await api.post('group/get-all-groups-from-user.php', payload);
        
        if (response.data.status === "success") {
            return response.data.groups;
        }
        return [];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}