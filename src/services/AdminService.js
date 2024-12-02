// AdminService.js
import axios from "axios";

const API_URL = "http://localhost:8080/admin";  // Modify with your actual backend URL

const registerAdmin = (admin) => {
  return axios.post(`${API_URL}/register`, admin);
};

const updateAdmin = (admin, uuid) => {
  return axios.put(`${API_URL}/Update?uuid=${uuid}`, admin);
};

const deleteAdmin = (adminId, uuid) => {
  return axios.delete(`${API_URL}/delete?adminId=${adminId}&uuid=${uuid}`);
};

const getAllTrips = (uuid) => {
  return axios.get(`${API_URL}/getAllTrips?uuid=${uuid}`);
};

const getTripsCabwise = (carType, uuid) => {
  return axios.get(`${API_URL}/getTripsCabwise/${carType}?uuid=${uuid}`);
};

const getTripsCustomerwise = (customerId, uuid) => {
  return axios.get(`${API_URL}/getTripsCustomerwise?customerId=${customerId}&uuid=${uuid}`);
};

const getAllTripsForDays = (customerId, fromDateTime, toDateTime, uuid) => {
  return axios.get(
    `${API_URL}/getAllTripsForDays/${fromDateTime}/${toDateTime}?customerId=${customerId}&uuid=${uuid}`
  );
};

export default {
  registerAdmin,
  updateAdmin,
  deleteAdmin,
  getAllTrips,
  getTripsCabwise,
  getTripsCustomerwise,
  getAllTripsForDays,
};
