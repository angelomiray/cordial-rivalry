// src/services/api.js

const BASE_URL = 'https://cordial-rivalry-default-rtdb.firebaseio.com/';

const api = {
    async post(path, data) {
        const response = await fetch(`${BASE_URL}${path}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    },

    async put(path, data) {
        const response = await fetch(`${BASE_URL}${path}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    },

    async get(path) {
        const response = await fetch(`${BASE_URL}${path}.json`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    },

    async delete(path) {
        const response = await fetch(`${BASE_URL}${path}.json`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Firebase returns an empty body on a successful delete request.
        // Return a success message or empty object to indicate successful deletion.
        return {}; 
    }
};

export default api;
