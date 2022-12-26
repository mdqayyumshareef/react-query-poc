import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.response.use(
//   (response) => {
//     // returning the api response data instead of axios response object on view
//     return response.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
