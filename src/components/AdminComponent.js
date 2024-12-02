// AdminComponent.js
import React, { useState, useEffect } from "react";
import AdminService from "../services/AdminService";
import {
  assignDriverToTrip,
  viewTripBookingById,
  markTripAsCompleted
} from '../services/TripService';

const AdminComponent = () => {
  const [admin, setAdmin] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    userRole: "Admin",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [uuid, setUuid] = useState(localStorage.getItem("uuid"));
  const [tripList, setTripList] = useState([]);
 
  // Get all trips when the component mounts
  useEffect(() => {
    if (uuid) {
      AdminService.getAllTrips(uuid)
        .then((response) => {
          setTripList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching trips:", error);
          setErrorMessage(error.response.data.message);
        });
    }
  }, [uuid]);

  // Assign driver to the trip
  const handleAssignDriver = async (tripId) => {

    assignDriverToTrip(tripId, uuid)
      .then((response) => {
        alert("Driver assigned successfully");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });    
  };

  
  const handleMarkTripCompleted = async (tripId) => {

    markTripAsCompleted(tripId, uuid)
      .then((response) => {
        alert("Trip is now completed");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });    
  };


  const handleRegisterAdmin = (e) => {
    e.preventDefault();
    AdminService.registerAdmin(admin)
      .then((response) => {
        alert("Admin registered successfully!");
        //history.push("/adminDashboard");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const handleUpdateAdmin = (e) => {
    e.preventDefault();
    AdminService.updateAdmin(admin, uuid)
      .then((response) => {
        alert("Admin updated successfully!");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const handleDeleteAdmin = (adminId) => {
    AdminService.deleteAdmin(adminId, uuid)
      .then((response) => {
        alert("Admin deleted successfully!");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <br></br>
      <div>
        <h3>Register New Admin</h3>
        <form onSubmit={handleRegisterAdmin}>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={admin.userName}
            onChange={(e) => setAdmin({ ...admin, userName: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={admin.mobileNumber}
            onChange={(e) => setAdmin({ ...admin, mobileNumber: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={admin.address}
            onChange={(e) => setAdmin({ ...admin, address: e.target.value })}
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <br></br>
      <br></br>
      <div>
        <h3>Update your details</h3>
        <form onSubmit={handleUpdateAdmin}>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={admin.userName}
            onChange={(e) => setAdmin({ ...admin, userName: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={admin.mobileNumber}
            onChange={(e) => setAdmin({ ...admin, mobileNumber: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={admin.address}
            onChange={(e) => setAdmin({ ...admin, address: e.target.value })}
          />          
          <button type="submit">Update</button>
        </form>
      </div>

      <br></br>
      <br></br>

      <div>
        <h3>Delete yourself</h3>
        <button onClick={() => handleDeleteAdmin(admin.id)}>
          Delete
        </button>
      </div>

      <br></br>

      <div>
        <h3>Manage Trips</h3>
        <div>
          <ul>
            {tripList.map((trip) => (
              <li key={trip.id}>
                {trip.pickupLocation} ({trip.dropLocation})
                <button onClick={() => handleAssignDriver(trip.tripBookingId)}>Assign Driver</button>
                <button onClick={() => handleMarkTripCompleted(trip.tripBookingId)}>Mark Completed</button>
              </li>
            ))}
          </ul>          
        </div>
      </div>      

      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default AdminComponent;
