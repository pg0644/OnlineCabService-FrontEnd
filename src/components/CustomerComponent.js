// src/component/Customer.js

import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerId: '',
    userName: '',
    email: '',
    address: '',
    mobileNumber: '',
    password: '',
  });
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    if (uuid) fetchAllCustomers();
  }, [uuid]);

  const fetchAllCustomers = () => {
    CustomerService.viewAllCustomers(uuid)
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error('Error fetching customers', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = () => {
    CustomerService.registerCustomer(form)
      .then((response) => {
        setCustomers([...customers, response.data]);
        setForm({ customerId: '', userName: '', email: '', address: '', mobileNumber: '', password: '' });
      })
      .catch((error) => console.error('Error registering customer', error));
  };

  const handleUpdate = () => {
    CustomerService.updateCustomer(form, localStorage.getItem("uuid"))
      .then((response) => {
        setCustomers(customers.map((cust) => (cust.customerId === response.data.customerId ? response.data : cust)));
        setForm({ customerId: '', userName: '', email: '', address: '', mobileNumber: '', password: '', userRole: '' });
      })
      .catch((error) => console.error('Error updating customer', error));
  };

  const handleDelete = (customerId) => {
    CustomerService.deleteCustomer(customerId, uuid)
      .then(() => setCustomers(customers.filter((cust) => cust.customerId !== customerId)))
      .catch((error) => console.error('Error deleting customer', error));
  };

  const handleView = (customerId) => {
    CustomerService.viewCustomer(customerId, localStorage.getItem("uuid"))
      .then((response) => setForm(response.data))
      .catch((error) => console.error('Error viewing customer', error));
  };

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <div>
        <input type="text" name="userName" placeholder="Username" value={form.userName} onChange={handleInputChange} />
        <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleInputChange} />
        <input type="text" name="mobileNumber" placeholder="Mobile Number" value={form.mobileNumber} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleInputChange} />
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>
      </div>
      <h3>Your List</h3>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customerId}>
            {customer.userName} - {customer.email}
            <button onClick={() => handleView(customer.customerId)}>View</button>
            <button onClick={() => handleDelete(customer.customerId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customer;
