// src/component/CustomerDashboard.js

import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import {
  searchCabsByLocation,
  requestTripBooking,
  assignDriverToTrip,
  viewTripBookingById,
  markTripAsCompleted
} from '../services/TripService';

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
  const custId = localStorage.getItem("currUserId");
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [tripBooking, setTripBooking] = useState({
    pickupLocation: '',
    dropLocation: '',
    fromDateTime: '',
    toDateTime: '',
    distanceInKm: 0
  });
  const [cabs, setCabs] = useState([]);
  const [cab, setCab] = useState([]);
  const [currentTrip, setCurrentTrip] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [isTripBooking, setIsTripBooking] = useState(false);
  const [uuid, setUuid] = useState(localStorage.getItem("uuid"));
  const [tripBookingId, setTripBookingId] = useState(null);
  const [isfetchCabsByLocationExecuted, setIsfetchCabsByLocationExecuted] = useState(false);
  
  useEffect(() => {
    handleViewTrips();
}, []);  


const handleViewTrips = async () => {
  //get customer object from his id;
  const response = await CustomerService.viewCustomerById(custId,uuid);
  const currg = response.data;
  return (
    <div>
      <ul>
        <li>currg.userName</li>
        <li>currg.email</li>
      </ul>
    </div>
  );
  //get trip object from customer.getTrips(0);


  // if(trips){
  //   alert('Trip entered successfully');

  //   const curTrip = trips.get(0);
  //   if(curTrip.currStatus.equalsIgnoreCase("confirmed")){
  //     const data=viewTripBookingById(curTrip.tripBookingId,uuid);
  //     setTripDetails(data);
  //   }
  // }
};

  // Search for available cabs by location
  const fetchCabsByLocation = async (pickUpLocation,uuid) => {
    if (isfetchCabsByLocationExecuted) return;

    try {

      const data = await searchCabsByLocation(pickUpLocation, uuid);
      setCabs(data);
      setIsfetchCabsByLocationExecuted(true); // Set flag to true after first execution

    } catch (err) {
      setError('Error fetching available cabs');
    }
  };


  // Handle trip booking form submission
  const handleTripBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await requestTripBooking(cab.cabId, tripBooking, uuid);  // '1' here is the `cabId`, modify based on UI logic
      setIsTripBooking(false);
      setCurrentTrip(data);
      localStorage.setItem("tripId", data.tripBookingId);
      setMsg("Trip is waiting for nearest Driver. Please wait..");
      alert('Trip booked successfully');
    } catch (err) {
      setError('Error booking trip');
    }
  };



  // View the trip booking details by tripBookingId
  const fetchTripBookingDetails = async () => {
    try {
     const data = await viewTripBookingById(currentTrip.tripBookingId, uuid);
    // const data = await viewTripBookingById(4, uuid);
      setTripDetails(data);
    } catch (err) {
      setError('Error fetching trip booking details');
    }
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
    <div>
    <h2>Manage Trip</h2>
      <br></br>
      {/* Search for cabs */}
      <input
        type="text"
        value={pickUpLocation}
        onChange={(e) => setPickUpLocation(e.target.value)}
        placeholder="Enter pickup location"
      />
      <button onClick={
        () => fetchCabsByLocation(pickUpLocation, uuid)

      }>Search for Cabs</button>

      {/* Display available cabs */}
      <ul>
        {cabs.map((cab) => (
          <li key={cab.id}>
            {cab.carName} - {cab.carType} - {cab.carNumber} - {cab.perKmRate} per km
            {/* Add a button for booking a cab */}
            <button onClick={() => {
              setTripBooking({ ...tripBooking, pickupLocation: cab.currLocation });
              setIsTripBooking(true);
              setCab(cab);
            }}>
              Book this Cab
            </button>
          </li>
        ))}
      </ul>
      <br></br>

      {/* Trip booking form */}
      {isTripBooking && (
        <form onSubmit={handleTripBookingSubmit}>
          <input
            type="text"
            placeholder="Drop location"
            value={tripBooking.dropLocation}
            onChange={(e) => setTripBooking({ ...tripBooking, dropLocation: e.target.value })}
          />
          <input
            type="text"
            value={tripBooking.fromDateTime}
            onChange={(e) => setTripBooking({ ...tripBooking, fromDateTime: e.target.value })}
          />
          <input
            type="text"
            value={tripBooking.toDateTime}
            onChange={(e) => setTripBooking({ ...tripBooking, toDateTime: e.target.value })}
          />
          <input
            type="number"
            value={tripBooking.distanceInKm}
            onChange={(e) => setTripBooking({ ...tripBooking, distanceInKm: e.target.value })}
          />
          <button type="submit" >Book Trip</button>
        </form>
      )}
      <br></br>

      {
        currentTrip &&(
          <div>
              <button onClick = {fetchTripBookingDetails}>view Trip</button>
          </div>  
        )
      }

      {/* Trip booking details */}
      {tripDetails && (
        <div>
          <h2>Trip Details</h2>
          <p>Pickup Location: {tripDetails.pickupLocation}</p>
          <p>Drop Location: {tripDetails.dropLocation}</p>
          <p>Driver Name: {tripDetails.driverName}</p>
          <p>Rating For Driver : {tripDetails.rating}</p>
          <p>Car Name : {tripDetails.carName}</p>
          <p>Car Number: {tripDetails.carNumber}</p>
          <p>PerKMRate: {tripDetails.perKmRate} </p>
          <p>BookingID: {tripDetails.tripBookingId}</p>
        </div>
      )}
    <br></br>
      {/* Display error messages */}
      {msg && <p>{msg}</p>}

      {/* Display error messages */}
      {error && <p>{error}</p>}
    </div>      
      <h2>Update your profile details</h2>
        <label>Username:</label>
        <input type="text" name="userName" value={form.userName} onChange={handleInputChange} />
        <label>Email:</label>
        <input type="text" name="email" value={form.email} onChange={handleInputChange} />
        <label>Address:</label>
        <input type="text" name="address" value={form.address} onChange={handleInputChange} />
        <label>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={form.mobileNumber} onChange={handleInputChange} />
        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleInputChange} />
        <label>User Role:</label>
        <input type="text" name="userRole" value={form.userRole} onChange={handleInputChange} />
      <button onClick={handleUpdate}>Update</button>





    </div>
    
    

  );
}

export default CustomerDashboard;
