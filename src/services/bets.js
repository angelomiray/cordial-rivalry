import api from './api';

export async function saveBet(betData) {
    try {
        const responseData = await api.post('bets', betData);
        return responseData.name; // Retorna a chave gerada pelo Firebase
    } catch (error) {
        console.error('Erro ao salvar sala:', error);
        throw error; // Re-lança o erro para ser capturado na função submitbet
    }
}

export async function updateBet(key, betData) {
    try {
        await api.put(`bets/${key}`, betData);
    } catch (error) {
        console.error('Erro ao atualizar sala:', error);
        throw error; // Re-lança o erro para ser capturado na função submitbet
    }
}

export async function deleteBet(key, betData) {
    try {
        await api.delete(`bets/${key}`, betData);
    } catch (error) {
        console.error('Erro ao deletar sala:', error);
        throw error; // Re-lança o erro para ser capturado na função submitbet
    }
}

export async function getBets() {
    try {
        const bets = await api.get('bets');
        return bets;
    } catch (error) {
        console.error('Erro ao buscar salas:', error);
        throw error;
    }
}

export async function getBetById(betId) {
    try {
        const bet = await api.get(`bets/${betId}`);
        return bet;
    } catch (error) {
        console.error('Erro ao buscar sala por ID:', error);
        throw error;
    }
}
