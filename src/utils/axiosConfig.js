import get from "lodash/get";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

api.interceptors.response.use(
  response => response,
  error => {
    const err = get(error, ["response", "data", "err"]);

    return err ? Promise.reject(err) : Promise.reject(error.message);
  }
);

export default api;
