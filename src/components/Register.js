import React, { useState, useRef,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";
import CustomerService from '../services/CustomerService';

function Register() {
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

// Existing validation functions...
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

// Additional validation functions
const validMobileNumber = (value) => {
  if (!/^[0-9]{10}$/.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter a valid 10-digit mobile number.
      </div>
    );
  }
};

  const handleRegister = () => {
    CustomerService.registerCustomer(form)
      .then((response) => {
        setCustomers([...customers, response.data]);
        setForm({ customerId: '', userName: '', email: '', address: '', mobileNumber: '', password: '', userRole: '' });
      })
      .catch((error) => console.error('Error registering customer', error));
  };
  
  return (
    <div>

      <div>
        <input type="text" name="userName" placeholder="Username" value={form.userName} onChange={handleInputChange} />
        <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleInputChange} />
        <input type="text" name="mobileNumber" placeholder="Mobile Number" value={form.mobileNumber} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleInputChange} />
        <input type="userRole" name="userRole" placeholder="userRole" value={form.userRole} onChange={handleInputChange} />
        <button onClick={handleRegister}>Register</button>
      </div>


    </div>
  );

}


export default Register;
