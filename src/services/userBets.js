// src/services/bets.js
import api from './api';

// Função para criar uma nova aposta
export const createBet = async (userId, roomId, betId, amount, selectedOption) => {
    try {
        const userBet = {
            userId,         // ID do usuário que fez a aposta
            roomId,         // ID da sala à qual a aposta pertence
            betId,          // ID da aposta
            amount,         // Valor da aposta
            selectedOption  // Opção selecionada para a aposta
        };
        
        // Adicionar a aposta no Firebase
        await api.post('userBets', userBet);

        // Implementar a lógica para atualizar os pontos do usuário no Firebase, se necessário
    } catch (error) {
        console.error('Error creating bet:', error);
        throw error;
    }
};

// Função para buscar todas as apostas de um usuário específico
export const getUserBets = async (userId) => {
    try {
        // Busca todas as userBets
        const response = await api.get('userBets');
        
        // Filtra as userBets para retornar apenas as que possuem o userId do currentUser
        const filteredBets = response.data.filter(bet => bet.userId === userId);
        
        return filteredBets;
    } catch (error) {
        console.error('Error fetching user bets:', error);
        throw error;
    }
};

// Função para buscar todas as apostas de uma sala específica
export const getRoomBets = async (roomId) => {
    try {
        const response = await api.get(`userBets?roomId=${roomId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching room bets:', error);
        throw error;
    }
};
