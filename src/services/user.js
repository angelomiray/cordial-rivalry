import api from './api';
import { sha256 } from '../utils/hash';
import { showAlert } from '../utils/alerts';

export async function saveUser(userData) {
    try {
        const responseData = await api.post('users', userData);
        return responseData.name; // Retorna a chave gerada pelo Firebase
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        throw error; // Re-lança o erro para ser capturado na função submitUser
    }
}

export async function fastUpdateUser(key, userData) {
    try {
        await api.put(`users/${key}`, userData);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error; // Re-lança o erro para ser capturado na função submitUser
    }
}

export async function getUserByEmail(email) {
    try {
        const users = await api.get('users');
        return Object.values(users).find(user => user.email === email);
    } catch (error) {
        console.error('Erro ao buscar usuário por email:', error);
        throw error;
    }
}
