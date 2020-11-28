import axios from "axios";
import environment from "../environment";

const instance = axios.create({
  baseURL: environment.apiBase,
});

instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    console.log(error.response);
    return Promise.reject(error);
  }
);

export default instance;
