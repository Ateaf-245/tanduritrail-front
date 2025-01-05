import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/users",
});

const registerCustomer = async (customerDetails) => {
  try {
    const response = await api.post("/register", customerDetails);
    UserContext.setUser(response.data.details);
    UserContext.setToken(response.data.token);
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      if (error.code === "ERR_NETWORK") {
        throw new Error("Network Error: Please check your connection or try again later.");
      } else if (error.response) {
        // Server responded with a status other than 200 range
        throw new Error(error.response.data);
      } else if (error.request) {
        // No response was received from the server
        throw new Error("Unable to connect to the server. Please check your internet connection.");
      } else {
        // Something else happened while setting up the request
        throw new Error("An unexpected error occurred. Please try again later.");
      }
    } else {
      // Non-Axios errors
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const updateAddresService = async (address) => {
  const userDetails = UserContext.user;
  console.log(userDetails);
  if (!userDetails) {
    const requestData = {
      id: userDetails.id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      address,
    };

    console.log(requestData);
    try {
      const response = await api.post(`${userDetails.id}`, requestData);
      UserContext.setUser(response.data.details);
      console.log("response : " + response.data);
      return 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          throw new Error("Network Error: Please check your connection or try again later.");
        } else if (error.response) {
          throw new Error(error.response.data);
        } else if (error.request) {
          throw new Error("Unable to connect to the server. Please check your internet connection.");
        } else {
          throw new Error("An unexpected error occurred. Please try again later.");
        }
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    }
  }

  //userDetails = userDetails   -----> update the address in user details or get user id and full name
};

export { registerCustomer, updateAddresService };
