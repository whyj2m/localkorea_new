import axios from "axios";

const baseURL = "http://localhost:8081";
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLocalPlaces = async () => {
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

// 하트 클릭을 서버로 전송하는 함수
export const postHeart = async (data) => {
  try {
    const response = await axiosInstance.post("/heart", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
