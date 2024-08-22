import api from './api';

export async function saveRoom(roomData) {
    try {
        const responseData = await api.post('rooms', roomData);
        return responseData.name; // Retorna a chave gerada pelo Firebase
    } catch (error) {
        console.error('Erro ao salvar sala:', error);
        throw error; // Re-lança o erro para ser capturado na função submitRoom
    }
}

export async function updateRoom(key, roomData) {
    try {
        await api.put(`rooms/${key}`, roomData);
    } catch (error) {
        console.error('Erro ao atualizar sala:', error);
        throw error; // Re-lança o erro para ser capturado na função submitRoom
    }
}
export const getRooms = async () => {
    try {
        return await api.get('rooms');
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};

export const getUserRooms = async (userId) => {
    try {
        const user = await api.get(`users/${userId}`);
        return user.rooms || [];
    } catch (error) {
        console.error('Error fetching user rooms:', error);
        throw error;
    }
};

export async function getRoomById(roomId) {
    try {
        const room = await api.get(`rooms/${roomId}`);
        return room;
    } catch (error) {
        console.error('Erro ao buscar sala por ID:', error);
        throw error;
    }
}

