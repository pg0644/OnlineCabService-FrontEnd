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
        rating: 0,
        currLocation: "",
        currDriverStatus: "",
    });
    const [uuid, setUuid] = useState("sample-uuid"); // Replace with actual UUID management

    useEffect(() => {
        loadBestDrivers();
    }, []);

    const loadBestDrivers = async () => {
        try {
            const data = await Driverservice.viewBestDrivers(uuid);
            setDrivers(data);
        } catch (error) {
            console.error("Failed to fetch drivers", error);
        }
    };

    const handleDelete = async (driverId) => {
        try {
            await Driverservice.deleteDriver(driverId, uuid);
            setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
        } catch (error) {
            console.error("Failed to delete driver", error);
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
                rating: 0,
                currLocation: "",
                currDriverStatus: "",
            });
        } catch (error) {
            console.error("Failed to add driver", error);
        }
    };

    return (
        <div>
            <h2>Driver List</h2>
            <ul>
                {drivers.map((driver) => (
                    <li key={driver.driverId}>
                        {driver.userName} - {driver.licenceNo} - {driver.rating}{" "}
                        <button onClick={() => handleDelete(driver.driverId)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Add New Driver</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name:</label>
                    <input
                        type="text"
                        name="userName"
                        value={newDriver.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={newDriver.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={newDriver.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={newDriver.mobileNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={newDriver.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Licence No:</label>
                    <input
                        type="text"
                        name="licenceNo"
                        value={newDriver.licenceNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={newDriver.rating}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Current Location:</label>
                    <input
                        type="text"
                        name="currLocation"
                        value={newDriver.currLocation}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Driver Status:</label>
                    <input
                        type="text"
                        name="currDriverStatus"
                        value={newDriver.currDriverStatus}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Driver</button>
            </form>
        </div>
    );
};

export default DriverComponent;
