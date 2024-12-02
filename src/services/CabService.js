import axios from 'axios';

const API_URL = 'http://localhost:8080/cab'; // Update with your backend URL

// Register a new cab
export const registerCab = async (cab) => {
  try {
    const response = await axios.post(`${API_URL}/register`, cab);
    return response.data;
  } catch (error) {
    console.error('Error registering cab:', error);
    throw error;
  }
};

// Update a cab's details
export const updateCab = async (cab, uuid) => {
  try {
    const response = await axios.put(`${API_URL}/update?uuid=${uuid}`, cab);
    return response.data;
  } catch (error) {
    console.error('Error updating cab:', error);
    throw error;
  }
};

// Delete a cab
export const deleteCab = async (cabId, uuid) => {
  try {
    const response = await axios.delete(`${API_URL}/delete?cabId=${cabId}&uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting cab:', error);
    throw error;
  }
};

// Get all cabs of a specific type
export const getCabsOfType = async (carType, uuid) => {
  try {
    const response = await axios.get(`${API_URL}/viewCabsOfType/${carType}?uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cabs of type:', error);
    throw error;
  }
};

// Get the count of cabs of a specific type
export const countCabsOfType = async (carType, uuid) => {
  try {
    const response = await axios.get(`${API_URL}/countCabsOfType/${carType}?uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error counting cabs of type:', error);
    throw error;
  }
};
