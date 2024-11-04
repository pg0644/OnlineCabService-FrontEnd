// src/service/DriverService.js
import axios from "axios";

const BASE_URL = "http://localhost:8088/driver";

const Driverservice = {
    registerDriver: async (driver) => {
        const response = await axios.post(`${BASE_URL}/register`, driver);
        return response.data;
    },

    updateDriver: async (driver, uuid) => {
        const response = await axios.put(`${BASE_URL}/update`, driver, {
            params: { uuid: uuid }
        });
        return response.data;
    },

    deleteDriver: async (driverId, uuid) => {
        const response = await axios.delete(`${BASE_URL}/delete`, {
            params: { driverId: driverId, uuid: uuid }
        });
        return response.data;
    },

    viewBestDrivers: async (uuid) => {
        const response = await axios.get(`${BASE_URL}/viewBestDriver`, {
            params: { uuid: uuid }
        });
        return response.data;
    },

    viewDriver: async (driverId, uuid) => {
        const response = await axios.get(`${BASE_URL}/viewDriver`, {
            params: { driverId: driverId, uuid: uuid }
        });
        return response.data;
    },
};

export default Driverservice;
