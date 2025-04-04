import axios from "axios";

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

// General function for making API requests
const apiService = {
    get: async (endpoint) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error("GET Error:", error);
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            console.error("POST Error:", error);
            throw error;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error("DELETE Error:", error);
            throw error;
        }
    },
};

export default apiService;
