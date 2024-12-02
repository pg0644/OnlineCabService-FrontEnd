import React, { useState, useEffect } from 'react';
import {
  registerCab,
  updateCab,
  deleteCab,
  getCabsOfType,
  countCabsOfType,
} from "../services/CabService";


const CabComponent = () => {
  const [uuid, setUuid] = useState(localStorage.getItem("uuid"));
  const [carType, setCarType] = useState('');
  const [cabs, setCabs] = useState([]);
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);
  const [cab, setCab] = useState({
    carName: '',
    carNumber: '',
    carType: '',
    perKmRate: '',
    currLocation:'',
    cabCurrStatus:''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch cabs by type
  // useEffect(() => {
  //   if (carType) {
  //     fetchCabs();
  //   }
  // }, [carType]);

  // Function to handle fetching cabs of a specific type
  const fetchCabs = async () => {
    try {
      const data = await getCabsOfType(carType, uuid);
      setCabs(data);
    } catch (err) {
      setError('Could not fetch cabs');
    }
  };

  // Function to handle getting the count of cabs of a specific type
  const fetchCabCount = async () => {
    try {
      const data = await countCabsOfType(carType, uuid);
      setCount(data);
    } catch (err) {
      setError('Could not fetch cab count');
    }
  };

  // Handle changes in the cab form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCab({ ...cab, [name]: value });
  };

  // Handle form submission for registering or updating cab
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateCab(cab, uuid);
        alert('Cab updated successfully!');
      } else {
        await registerCab(cab);
        alert('Cab registered successfully!');
      }
      clearForm();
    } catch (error) {
      alert('Error submitting cab data');
    }
  };

  // Handle deleting a cab
  const handleDelete = async (cabId) => {
    try {
      await deleteCab(cabId, uuid);
      setCabs(cabs.filter((cab) => cab.id !== cabId));
      alert('Cab deleted successfully');
    } catch (error) {
      alert('Error deleting cab');
    }
  };

  // Clear the form state
  const clearForm = () => {
    setCab({
      carName: '',
      carNumber: '',
      carType: '',
      perKmRate: '',    
      currLocation:'',
      cabCurrStatus:''
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Cab Management</h1>

      {/* Form for registering or updating a cab */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="carName"
          placeholder="Car Name"
          value={cab.carName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="carNumber"
          placeholder="Car Number"
          value={cab.carNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="carType"
          placeholder="Car Type"
          value={cab.carType}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="perKmRate"
          placeholder="Per Km Rate"
          value={cab.perKmRate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="currLocation"
          placeholder="Current Location"
          value={cab.currLocation}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cabCurrStatus"
          placeholder="Cab current Status"
          value={cab.cabCurrStatus}
          onChange={handleInputChange}
          required
        />        
        <button type="submit">{isEditing ? 'Update Cab' : 'Register Cab'}</button>
        {isEditing && <button type="button" onClick={clearForm}>Cancel</button>}
      </form>
      <br></br>
      <br></br>

      {/* Fetch cabs by type */}
      <input
        type="text"
        placeholder="Enter Car Type"
        value={carType}
        onChange={(e) => setCarType(e.target.value)}
      />
      <button onClick={fetchCabs}>Fetch Cabs</button>
      <button onClick={fetchCabCount}>Get Count</button>
      <br></br>


      <br></br>
      {/* Display error messages */}
      {error && <p>{error}</p>}
      <br></br>


      <br></br>
      {/* Display the cab count */}
      {count !== null && <p>Total Cabs: {count}</p>}
      <br></br>


      <br></br>
      {/* Display the list of cabs */}
      <ul>
        {cabs.map((cab) => (
          <li key={cab.id}>
            {cab.carName} - {cab.carNumber} - {cab.carType} - {cab.perKmRate} per km
            <button onClick={() => handleDelete(cab.id)}>Delete</button>
            <button onClick={() => {
              setCab(cab);  // Pre-fill the form for editing
              setIsEditing(true);
            }}>
              Edit
            </button>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default CabComponent;
