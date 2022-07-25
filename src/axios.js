import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

export const api = axios.create({
  baseURL: isDev
    ? "http://localhost:5000/api/v1"
    : "https://moolre-test.herokuapp.com/api/v1",
});
