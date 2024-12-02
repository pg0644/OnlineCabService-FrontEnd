import React, { useEffect, useCallback } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import DriverComponent from "../components/DriverComponent";
import CustomerComponent from '../components/CustomerComponent';
import TripComponent from "../components/TripComponent";
import AdminComponent from '../components/AdminComponent';
import CabComponent from "../components/CabComponent";

const AdminDashboard = () => {
    return (
        <div>
           <nav className="navbar-expand bg-dark" align= "center">
                  <Link to={"/admin"} className="nav-link" align= "center">
                  Manage Admin
                  </Link>
          </nav>

          <br></br>

          <nav className="navbar-expand bg-dark">
                  <Link to={"/customers"} className="nav-link" align= "center">
                  Manage Customer
                  </Link>
          </nav>
          <br></br>
          <nav className="navbar-expand bg-dark">
                  <Link to={"/drivers"} className="nav-link" align= "center">
                    Manage Drivers
                  </Link>
          </nav>
          <br></br>         
          <nav className="navbar-expand bg-dark">
                  <Link to={"/cabs"} className="nav-link" align= "center" >
                  Manage Cabs
                  </Link>
          </nav>
          <br></br>


          <nav className="navbar-expand bg-dark">
                  <Link to={"/trips"} className="nav-link" align= "center">
                  Manage Trips
                  </Link>
          </nav>
          <br></br>

    
    
          <div className="container mt-3">
            <Routes>
              <Route path="/drivers" element={<DriverComponent />} />
              <Route path="/customers" element={<CustomerComponent />} />
              <Route path="/cabs" element={<CabComponent />} />
              <Route path="/trips" element={<TripComponent />} />
              <Route path="/admin" element={<AdminComponent />} />
            </Routes>
          </div>
        </div>
      );
};

export default AdminDashboard;





