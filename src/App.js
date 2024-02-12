import React, { useEffect } from "react";
import Router from "./Router";
import "./components/@vuexy/rippleButton/RippleButton";
import axiosConfig from "../src/axiosConfig";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";

const App = (props) => {
  // important function for token passing

  // const requestInterceptor = axiosConfig?.interceptors.request.use(
  //   (config) => {
  //     // Get the token from your authentication mechanism (e.g., localStorage)
  //     let token = JSON.parse(localStorage.getItem("userData"))?.token;

  //     // If a token exists, add it to the request headers
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }

  //     return config;
  //   },
  //   (error) => {
  //     // Handle request error
  //     return Promise.reject(error);
  //   }
  // );
  // const responseInterceptor = axiosConfig?.interceptors.response.use(
  //   (config) => {
  //     // Get the token from your authentication mechanism (e.g., localStorage)
  //     let token = JSON.parse(localStorage.getItem("userData"))?.token;

  //     // If a token exists, add it to the request headers
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }

  //     return config;
  //   },
  //   (error) => {
  //     // Handle request error
  //     return Promise.reject(error);
  //   }
  // );

  return <Router />;
};

export default App;
