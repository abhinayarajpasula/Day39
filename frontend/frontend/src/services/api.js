import axios from 'axios';

const API_URL = 'http://localhost:5001/students';

export const getStudents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};