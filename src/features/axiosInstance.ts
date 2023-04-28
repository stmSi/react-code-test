import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
  headers: { "Content-type": "application/json; charset=UTF-8" },
});

export default axiosInstance;
