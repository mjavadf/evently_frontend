import axios, { CanceledError } from "axios";
import authHeader from "./auth-header";

export default axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
      "Authorization": authHeader(),
  }
});



export { CanceledError };