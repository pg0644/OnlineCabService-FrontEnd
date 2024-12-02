import React, { useState, useEffect } from 'react';
import {
  searchCabsByLocation,
  requestTripBooking,
  assignDriverToTrip,
  viewTripBookingById,
  markTripAsCompleted
} from '../services/TripService';

const TripComponent = () => {
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
      setTripDetails(data);
    } catch (err) {
      setError('Error fetching trip booking details');
    }
  };

  // Assign driver to the trip
  const handleAssignDriver = async () => {
    try {
      const data = await assignDriverToTrip(currentTrip.tripBookingId, uuid);
      setTripDetails(data);
      setMsg("Trip in progress...");
      alert('Driver assigned successfully');
    } catch (err) {
      setError('Error assigning driver');
    }
  };

  // Mark the trip as completed
  const handleMarkTripCompleted = async () => {
    try {
      const data = await markTripAsCompleted(currentTrip.tripBookingId, uuid);
      setTripDetails({ ...tripDetails, tripStatus: 'Completed' });
      setMsg("Trip is completed. Book another ride!");
      alert(data);
    } catch (err) {
      setError('Error marking trip as completed');
    }
  };

  return (
    <div>
      <h1>Trip Management</h1>
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

      {/* {
        currentTrip &&(
          <div>
              <button onClick = {fetchTripBookingDetails}>view Trip</button>
          </div>  
        )
      } */}

      {/* Trip booking details */}
      {currentTrip && (
        <div>
          <h2>Trip Details</h2>
          <p>Pickup Location: {currentTrip.pickupLocation}</p>
          <p>Drop Location: {currentTrip.dropLocation}</p>
        </div>
      )}
    <br></br>
      {/* Display error messages */}
      {msg && <p>{msg}</p>}

      {/* Display error messages */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TripComponent;
