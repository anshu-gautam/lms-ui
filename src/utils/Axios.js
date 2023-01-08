import Axios from "axios";

function authRequestInterceptor(config) {
  config.headers["Accept"] = "application/json";
  config.headers["content-type"] = "application/json";
  config.headers["Authorization"] = JSON.parse(
    localStorage.getItem("user-data")
  )?.token;

  return config;
}

export const axios = Axios.create({
  baseURL: "http://localhost:3000", //import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
