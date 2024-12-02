import axios from 'axios';

const API_URL = 'http://localhost:8080/tripBooking'; // Update with your backend URL

// Search for cabs by pickup location
export const searchCabsByLocation = async (pickUpLocation, uuid) => {
  try {
    const response = await axios.get(`${API_URL}/searchCab?pickUpLocation=${pickUpLocation}&uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error searching cabs by location:', error);
    throw error;
  }
};

// Request a trip booking
export const requestTripBooking = async (cabId, tripBooking, uuid) => {
  try {
    const response = await axios.post(`${API_URL}/BookRequest?cabId=${cabId}&uuid=${uuid}`, tripBooking);
    return response.data;
  } catch (error) {
    console.error('Error requesting trip booking:', error);
    throw error;
  }
};

// Assign a driver to a trip
export const assignDriverToTrip = async (tripBookingId, uuid) => {
  try {
    const response = await axios.put(`${API_URL}/AssignDriverByAdmin?TripBookingId=${tripBookingId}&uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error assigning driver to trip:', error);
    throw error;
  }
};

// View trip details by booking ID
export const viewTripBookingById = async (tripBookingId, uuid) => {
  try {
    const response = await axios.get(`${API_URL}/viewBookingbyId?TripBookingId=${tripBookingId}&uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error viewing trip booking:', error);
    throw error;
  }
};

// Mark the trip as completed
export const markTripAsCompleted = async (tripBookingId, uuid) => {
  try {
    const response = await axios.get(`${API_URL}/markCompleteTrip?TripBookingId=${tripBookingId}&uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error marking trip as completed:', error);
    throw error;
  }
};
