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

export async function getRooms() {
    try {
        const rooms = await api.get('rooms');
        return rooms;
    } catch (error) {
        console.error('Erro ao buscar salas:', error);
        throw error;
    }
}

export async function getRoomById(roomId) {
    try {
        const room = await api.get(`rooms/${roomId}`);
        return room;
    } catch (error) {
        console.error('Erro ao buscar sala por ID:', error);
        throw error;
    }
}
