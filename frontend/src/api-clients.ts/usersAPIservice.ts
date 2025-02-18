import axios from "axios";
import UserAPI from "../usersApiService/api.user.url";
import { RegisterFormData } from "../forms/registerFormData.types";


export const register = async (data: RegisterFormData) => {
  try {
    const response = await axios.post(UserAPI.register, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Registration failed");
    }
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed"); // Throw an error if the request fails
  }
};

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift()!;
  return null;
}


export const validateToken = async () => {
  const authToken = getCookie("auth-token");
  const response = await axios.post(UserAPI.validateToken, authToken,{
    withCredentials: true,
    
  });

  if (response.status !== 200) {
    throw new Error("Token is invalid");
  }
  return response.data;
};
