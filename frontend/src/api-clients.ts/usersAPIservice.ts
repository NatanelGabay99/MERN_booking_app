import axios from "axios";
import UserAPI from "../usersApiService/api.user.url";
import { RegisterFormData } from "../pages/register/RegisterPage";

export const register = async (data: RegisterFormData) => {
    try {
      const response = await axios.post(
        UserAPI.register, 
        JSON.stringify(data), 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data; // Return the data from the response
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed"); // Throw an error if the request fails
    }
  };