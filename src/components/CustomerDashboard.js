// src/component/CustomerDashboard.js

import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';

function CustomerDashboard() {
    const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    customerId: '',
    userName: '',
    email: '',
    address: '',
    mobileNumber: '',
    password: '',
    userRole: ''
  });
  const uuid = localStorage.getItem('uuid');
  const cusId = localStorage.getItem('currUserId');


 

  

  const handleView = () => {
    CustomerService.viewCustomer(cusId, uuid)
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error('Error viewing customer', error));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = () => {
    CustomerService.updateCustomer(form, uuid)
      .then((response) => {
        alert('Customer updated successfully');
        setForm(response.data);
      })
      .catch((error) => console.error('Error updating customer', error));
  };


  return (
    <div>
        <ul>
            {customers.map((customer) => (
            <li key={customer.customerId}>
                {customer.userName} - {customer.email}
            </li>
            ))}
        </ul>       
      <h2>Customer Dashboard</h2>
      <div>
        <label>Username:</label>
        <input type="text" name="userName" value={form.userName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={form.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={form.address} onChange={handleInputChange} />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={form.mobileNumber} onChange={handleInputChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleInputChange} />
      </div>
      <div>
        <label>User Role:</label>
        <input type="text" name="userRole" value={form.userRole} onChange={handleInputChange} />
      </div>      
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default CustomerDashboard;
