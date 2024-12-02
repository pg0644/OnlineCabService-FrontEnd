import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import DriverComponent from "./components/DriverComponent";
import CustomerComponent from './components/CustomerComponent';
import TripComponent from "./components/TripComponent";
import AdminComponent from './components/AdminComponent';

import { useNavigate } from 'react-router-dom';
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import EventBus from "./common/EventBus";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import CabComponent from "./components/CabComponent";


const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  //const logOut = useCallback(() => {
    //dispatch(logout());
  //}, [dispatch]);

  const logOut = useCallback(() => {
    const uuid = localStorage.getItem("uuid"); // Retrieve the UUID from localStorage
    console.log("the UUId is : " ,uuid)
    dispatch(logout(uuid)).then(() => {
      navigate("/login"); // Redirect after logout
    });
  }, [dispatch, navigate]);


  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Online Cab Booking
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/customerprofile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/logout"} className="nav-link" onClick={logOut}>
                Log Out
              </Link>
            </li>            

          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/drivers" element={<DriverComponent />} />
          <Route path="/customers" element={<CustomerComponent />} />
          <Route path="/customerprofile" element={<CustomerDashboard />} />
          <Route path="/adminprofile" element={<AdminDashboard />} />
          <Route path="/cabs" element={<CabComponent />} />
          <Route path="/trips" element={<TripComponent />} />
          <Route path="/admin" element={<AdminComponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
