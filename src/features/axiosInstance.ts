import axios from "axios";

export const JsonPlaceHolderURL = "https://jsonplaceholder.typicode.com/";

const axiosInstance = axios.create({
  baseURL: JsonPlaceHolderURL,
  timeout: 1000,
  headers: { "Content-type": "application/json; charset=UTF-8" },
});

export default axiosInstance;
