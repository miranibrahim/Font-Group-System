import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
});

// General function for making GET requests
export const getFonts = async (endpoint) => {
    try {
        console.log(`Fetching from: ${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
};

// General function for uploading files
export const uploadFontFile = async (endpoint, formData) => {
    try {
        const response = await axiosInstance.post(endpoint, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error(`Error uploading to ${endpoint}:`, error);
        throw error;
    }
};

// General function for making DELETE requests
export const deleteFont = async (endpoint) => {
    try {
        const response = await axiosInstance.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Error deleting from ${endpoint}:`, error);
        throw error;
    }
};

export default axiosInstance;
