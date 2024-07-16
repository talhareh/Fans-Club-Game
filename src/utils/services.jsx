import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createNSave = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/create`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //console.log('Response:', response.data);
        return response
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const updateTaps = async (telegramId, tapsToAdd) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/updateTaps`, { telegramId, tapsToAdd }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response
        //console.log('Response:', response.data);
    } catch (error) {
        console.error('Error updating taps:', error);
    }
};