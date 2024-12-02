import axios from "axios";


const API_URL = "http://localhost:8080";

const register = (customer) => {
  // return axios.post(API_URL + "/customer/register", {
  //   username,
  //   email,
  //   password,
  //   userRole
  // })    
  // .then((response) => {
  //   if (response.data.accessToken) {
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //   }

  //   return response.data;
  // });
   return axios.post(`${API_URL}/customer/register`, customer);
};

const login = (username, password,role) => {
  return axios
    .post(API_URL + "/Userlogin/Login", {
      email:username,
      password,
      role

    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

//const logout = () => {
 // localStorage.removeItem("user");
//};

const logout = (uuid) =>{
  return axios.get(`${API_URL}/Userlogin/logout`,{params : {uuid}}) // Adjust the endpoint as necessary
    .then((response) => {
      return response.data; // Return the response if needed
    });
};



export default {
  register,
  login,
  logout,
};
