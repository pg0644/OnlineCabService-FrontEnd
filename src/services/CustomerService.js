// CustomerService.js
import axios from "axios";

const API_URL = "http://localhost:8080/customer";  // Modify with your actual backend URL

const registerCustomer = (customer) => {
  return axios.post(`${API_URL}/register`, customer);
};

const updateCustomer = (customer, uuid) => {
  return axios.put(`${API_URL}/update?uuid=${uuid}`, customer);
};

const deleteCustomer = (customerId, uuid) => {
  return axios.delete(`${API_URL}/delete?customerId=${customerId}&uuid=${uuid}`);
};

const viewCustomer = (uuid) => {
  return axios.get(`${API_URL}/viewAllCustomer?uuid=${uuid}`);
};

const viewCustomerById = (customerId, uuid) => {
  return axios.get(`${API_URL}/viewCustomer?customerId=${customerId}&uuid=${uuid}`);
};

export default {
  registerCustomer,
  updateCustomer,
  deleteCustomer,
  viewCustomer,
  viewCustomerById,
};
