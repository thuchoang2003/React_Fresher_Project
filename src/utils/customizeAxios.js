import axios from "axios";
import NProgress from "nprogress";
import { store } from "../../src/redux/store.js";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  withCredentials: true,
});
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers["Authorization"] = "Bearer " + access_token;
    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    NProgress.done();
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();

    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
