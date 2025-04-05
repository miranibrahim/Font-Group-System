import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// General function for making GET requests
export const getData = async (endpoint) => {
  try {
    // console.log(`Fetching from server`);
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// General function for uploading files
export const postData = async (endpoint, formData) => {
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
export const deleteData = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error deleting from ${endpoint}:`, error);
    throw error;
  }
};

// Create Font Group
export const createFontGroup = async (endpoint, formData) => {
  try {
    const response = await axiosInstance.post(
      endpoint,
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Post error:", error.response?.data || error.message);
    return {
      error: true,
      message: error.response?.data?.error || "Unknown error",
    };
  }
};

// Update data
export const updateData = async (endpoint, id, data) => {
  try {
    const response = await axiosInstance.put(
      `${endpoint}/${id}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating ${endpoint}/${id}:`, error);
    throw error;
  }
};

export default axiosInstance;
