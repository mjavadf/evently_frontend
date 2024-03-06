import axios from "axios";

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
        return response.data
      }

      return {access: "", refresh: ""}
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
