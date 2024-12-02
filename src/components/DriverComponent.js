// src/component/DriverComponent.js
import React, { useState, useEffect } from "react";
import Driverservice from "../services/Driverservice";

const DriverComponent = () => {
    const [drivers, setDrivers] = useState([]);
    const [newDriver, setNewDriver] = useState({
        userName: "",
        password: "",
        address: "",
        mobileNumber: "",
        email: "",
        userRole: "Driver",
        licenceNo: "",
        rating: "",
        currLocation: "",
        currDriverStatus: "",
    });
    const [uuid, setUuid] = useState(localStorage.getItem("uuid"));
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSelectDriver = (selectedDriver) => {
        setSelectedDriver(selectedDriver);
      };

    useEffect(() => {
        loadBestDrivers();
    }, []);

    const loadBestDrivers = async () => {
        try {
            const data = await Driverservice.viewBestDrivers(uuid);
            setDrivers(data);
        } catch (error) {
            console.error("Failed to fetch drivers", error);
            setErrorMessage(error.response.data.message);

        }
    };

    const handleUpdateDriver = (e) => {
        e.preventDefault();
        if (selectedDriver) {
          Driverservice.updateDriver(selectedDriver,uuid)
            .then((response) => {
              alert("Driver updated successfully!");
            })
            .catch((error) => {
              console.error("Failed to update driver", error);
              setErrorMessage(error.response.data.message);
            });
        }
      };    

    const handleDelete = async (driverId) => {
        try {
            await Driverservice.deleteDriver(driverId, uuid);
            setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
        } catch (error) {
            console.error("Failed to delete driver", error);
            setErrorMessage(error.response.data.message);

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDriver((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addedDriver = await Driverservice.registerDriver(newDriver);
            setDrivers([...drivers, addedDriver]); // Add the new driver to the state
            // Reset form fields
            setNewDriver({
                userName: "",
                password: "",
                address: "",
                mobileNumber: "",
                email: "",
                userRole: "Driver",
                licenceNo: "",
                rating: "",
                currLocation: "",
                currDriverStatus: "",
            });
        } catch (error) {
            console.error("Failed to add driver", error);
        }
    };

    return (
        <div>
            <h2>Add New Driver</h2>
            <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={newDriver.userName}
              onChange={(e) => setNewDriver({ ...newDriver, userName: e.target.value })}
            />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newDriver.password}
            onChange={(e) => setNewDriver({ ...newDriver, password: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newDriver.address}
            onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={newDriver.mobileNumber}
            onChange={(e) => setNewDriver({ ...newDriver, mobileNumber: e.target.value })}
          />           
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newDriver.email}
              onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
            />   
         <input
            type="text"
            name="licenceNo"
            placeholder="Licence No"
            value={newDriver.licenceNo}
            onChange={(e) => setNewDriver({ ...newDriver, licenceNo: e.target.value })}
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            value={newDriver.rating}
            onChange={(e) => setNewDriver({ ...newDriver, rating: e.target.value })}
          />
          <input
            type="text"
            name="currLocation"
            placeholder="Current Location"
            value={newDriver.currLocation}
            onChange={(e) => setNewDriver({ ...newDriver, currLocation: e.target.value })}
          />           
            <input
              type="text"
              name="currDriverStatus"
              placeholder="Driver Status"
              value={newDriver.currDriverStatus}
              onChange={(e) => setNewDriver({ ...newDriver, currDriverStatus: e.target.value })}
            /> 
                <button type="submit">Add Driver</button>
            </form>

            <br></br>


            <h2>Best Drivers List</h2>
            <ul>
                {drivers.map((driver) => (
                    <li key={driver.driverId}>
                        {driver.userName} - {driver.licenceNo} - {driver.rating}{" "}
                        <button onClick={() => handleDelete(driver.driverId)}>Delete</button>
                        <button onClick={() => handleSelectDriver(driver)}>View</button>
                    </li>
                ))}
            </ul>

            <div>

        <br></br>        
        <h3>Update Details here:</h3>
        {selectedDriver && (
          <form onSubmit={handleUpdateDriver}>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={selectedDriver.userName}
              onChange={(e) => setSelectedDriver({ ...selectedDriver, userName: e.target.value })}
            />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={selectedDriver.password}
            onChange={(e) => setSelectedDriver({ ...selectedDriver, password: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={selectedDriver.address}
            onChange={(e) => setSelectedDriver({ ...selectedDriver, address: e.target.value })}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={selectedDriver.mobileNumber}
            onChange={(e) => setSelectedDriver({ ...selectedDriver, mobileNumber: e.target.value })}
          />           
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={selectedDriver.email}
              onChange={(e) => setSelectedDriver({ ...selectedDriver, email: e.target.value })}
            />   
         <input
            type="text"
            name="licenceNo"
            placeholder="Licence No"
            value={selectedDriver.licenceNo}
            onChange={(e) => setSelectedDriver({ ...selectedDriver, licenceNo: e.target.value })}
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            value={selectedDriver.rating}
            onChange={(e) => setSelectedDriver({ ...selectedDriver, rating: e.target.value })}
          />
          <input
            type="text"
            name="currLocation"
            placeholder="Current Location"
            value={selectedDriver.currLocation}
            onChange={(e) => setSelectedDriver({ ...selectedDriver, currLocation: e.target.value })}
          />           
            <input
              type="text"
              name="currDriverStatus"
              placeholder="Driver Status"
              value={selectedDriver.currDriverStatus}
              onChange={(e) => setSelectedDriver({ ...selectedDriver, currDriverStatus: e.target.value })}
            />                                 
            <button type="submit">Update</button>
          </form>
        )}
      </div>
      <br></br>             
      {errorMessage && <div className="error">{errorMessage}</div>}
   
        </div>

    );
};

export default DriverComponent;
