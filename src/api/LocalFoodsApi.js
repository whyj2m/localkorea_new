import axios from "axios";

const baseURL = "http://localhost:8081";
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLocalFoods = async () => {
  try {
    const response = await axiosInstance.get("/localFoods/all");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLocalFood = async (localNo) => {
  try {
    const response = await axiosInstance.get(`/localFoods/${localNo}`);
    return response;
  } catch (error) {
    throw error;
  }
};
