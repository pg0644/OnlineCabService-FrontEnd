import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password,role) => (dispatch) => {
  return AuthService.login(username, password,role).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      localStorage.setItem("currUserId", data.currUserId);
      localStorage.setItem("uuid", data.uuid);
      localStorage.setItem("currRole", data.currRole);
      localStorage.setItem("currStatus", data.currStatus);
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

//export const logout = () => (dispatch) => {
 // AuthService.logout();

  //dispatch({
    //type: LOGOUT,
 // });
//};


export const logout = (uuid) => (dispatch) => {
  return AuthService.logout(uuid)
    .then((response) => {
      // Dispatch the LOGOUT action on successful logout
      dispatch({
        type: LOGOUT,
      });

      // Optionally clear local storage or any other necessary cleanup
      localStorage.removeItem("currUserId");
      localStorage.removeItem("uuid");
      localStorage.removeItem("currRole");
      localStorage.removeItem("currStatus");

      return Promise.resolve(response.data); // Return response data if needed
    })
    .catch((error) => {
      // Handle any errors that might occur
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(); // Return promise reject on error
    });
};
