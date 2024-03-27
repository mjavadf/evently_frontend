import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  user_id: number;
  exp: number;
  username: string;
}

const API_URL = "http://127.0.0.1:8000/auth/";

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "jwt/create/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = (
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
) => {
  return axios
    .post(API_URL + "users/", {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    })
    .then((response) => {
      return response.data;
    });
};

export const getCurrentUser: () => JWTPayload | null = () => {
  const userStr = localStorage.getItem("user");

  if (userStr) {
    let payload: JWTPayload = jwtDecode(JSON.parse(userStr).access);
    return {
      user_id: payload.user_id,
      exp: payload.exp,
      username: payload.username,
    }
  };

  return null;
};
