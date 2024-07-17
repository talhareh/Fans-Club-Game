import axios from 'axios';
import { handleResponse, handleErrors } from './responseHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createNSave = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/create`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error creating user:', error);
        handleErrors(error.response ? error.response.status : null);
    }
};

export const updateTaps = async (telegramId, tapsToAdd) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/updateTaps`, { telegramId, tapsToAdd }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error updating taps:', error);
        handleErrors(error.response ? error.response.status : null);
    }
};
