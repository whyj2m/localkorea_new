import axios from "axios";

const baseURL = "http://localhost:8081";
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLocalFestivals = async () => {
  try {
    const response = await axiosInstance.get("/localPlaces");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLocalPlace = async (localNo) => {
  try {
    const response = await axiosInstance.get(`/localPlaces/${localNo}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getLocalPlaceView = async (placeNo) => {
  try {
    const response = await axiosInstance.get(`/localPlace/${placeNo}`);
    return response;
  } catch (error) {
    throw error;
  }
};
