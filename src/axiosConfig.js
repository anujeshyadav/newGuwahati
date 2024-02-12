import axios from "axios";

const instance = axios.create({
  // baseURL: "http://64.227.162.41:5000/",
  // baseURL: "http://174.138.68.198:5000",
  baseURL: "https://node.rupioo.com",
});

export default instance;
