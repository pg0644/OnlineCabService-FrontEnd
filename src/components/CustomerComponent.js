// CustomerComponent.js
import React, { useState, useEffect } from "react";
import CustomerService from "../services/CustomerService";
import AdminService from "../services/AdminService";
const CustomerComponent = () => {
  const [customer, setCustomer] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    userRole: "Customer",
  });

  const [customerList, setCustomerList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [uuid, setUuid] = useState(localStorage.getItem("uuid"));
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [tripHistory, setTripHistory] = useState([]);

  

  // Get all customers when the component mounts
  useEffect(() => {
    if (uuid) {
      CustomerService.viewCustomer(uuid)
        .then((response) => {
          console.log("Customer List:", response.data);
          setCustomerList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
          setErrorMessage(error.response.data.message);
        });
    }
  }, [uuid]);

  const handleRegisterCustomer = (e) => {
    e.preventDefault();
    CustomerService.registerCustomer(customer)
      .then((response) => {
        alert("Customer registered successfully!");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    if (selectedCustomer) {
      CustomerService.updateCustomer(selectedCustomer, uuid)
        .then((response) => {
          alert("Customer updated successfully!");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    }
  };

  const handleDeleteCustomer = (customerId) => {
    CustomerService.deleteCustomer(customerId, uuid)
      .then((response) => {
        alert("Customer deleted successfully!");
        setCustomerList(customerList.filter(cust => cust.id !== customerId)); // Remove from list
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleTripHistory = (customerId) => {
    AdminService.getTripsCustomerwise(customerId, uuid)
    .then((response) => {
      if (response.data && response.data.length > 0) {
        console.log("Trip History:", response.data);
        setTripHistory(response.data); 
      } else {
        console.log("No trips available for this customer.");
        setTripHistory([]);
      }
    })
      .catch((error) => {
        setTripHistory([]);
      });
  };

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <br></br>
      <div>
        <h3>Register New Customer</h3>
        <form onSubmit={handleRegisterCustomer}>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={customer.userName}
            onChange={(e) => setCustomer({ ...customer, userName: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={customer.password}
            onChange={(e) => setCustomer({ ...customer, password: e.target.value })}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={customer.mobileNumber}
            onChange={(e) => setCustomer({ ...customer, mobileNumber: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <br></br>
      <br></br>

      <br></br>
      <br></br>

      <div>
        <h3> Manage Customers </h3>
        <ul>
          {customerList.map((customer) => (
            <li key={customer.id}>
              {customer.userName} ({customer.email})
              <button onClick={() => handleSelectCustomer(customer)}>View</button>
              <button onClick={() => {handleDeleteCustomer(customer.customerId)}}>Delete</button>
              <button onClick={() => handleTripHistory(customer.customerId)}>Trip History</button>
            </li>
          ))}
        </ul>
      </div>

      <br></br>

      <div>
        <h3>Update details here:</h3>
        {selectedCustomer && (
          <form onSubmit={handleUpdateCustomer}>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={selectedCustomer.userName}
              onChange={(e) => setSelectedCustomer({ ...selectedCustomer, userName: e.target.value })}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={selectedCustomer.email}
              onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
            />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={selectedCustomer.password}
            onChange={(e) => setSelectedCustomer({ ...selectedCustomer, password: e.target.value })}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={selectedCustomer.mobileNumber}
            onChange={(e) => setSelectedCustomer({ ...selectedCustomer, mobileNumber: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={selectedCustomer.address}
            onChange={(e) => setSelectedCustomer({ ...selectedCustomer, address: e.target.value })}
          />                        
            <button type="submit">Update</button>
          </form>
        )}
      </div>
      <br></br>     

      <div>
      <h3> Trip History </h3>
      {tripHistory.length > 0 ? (
        <ul>
          {tripHistory.map((trip) => (
            <li>
              <p>BookingId: {trip.tripBookingId}</p>
              <p>Pickup: {trip.pickupLocation}</p>
              <p>destination: {trip.dropLocation}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trip history available for this customer.</p>
      )}
      </div>

      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
    
  );
};

export default CustomerComponent;
