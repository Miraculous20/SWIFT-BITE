// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://swift-bite-production.up.railway.app/api",
});

export default API;
