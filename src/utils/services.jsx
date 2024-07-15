import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createNSave = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/create`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};
