// src/service/CustomerService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8088/customer';

class CustomerService {
  registerCustomer(customer) {
    return axios.post(`${BASE_URL}/register`, customer);
  }

  updateCustomer(customer, uuid) {
    return axios.put(`${BASE_URL}/update`, customer, { params: { uuid } });
  }

  deleteCustomer(customerId, uuid) {
    return axios.delete(`${BASE_URL}/delete`, { params: { customerId, uuid } });
  }

  viewAllCustomers(uuid) {
    return axios.get(`${BASE_URL}/viewAllCustomer`, { params: { uuid } });
  }

  viewCustomer(customerId, uuid)
  {
    const response = axios.get(`${BASE_URL}/viewCustomer`, {
      params: { customerId, uuid }
    });
    return response.data;
  }


};

export default new CustomerService();
