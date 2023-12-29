import axios from "axios";

const baseURL = 'http://localhost:8081'
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// get tourisSpot 게시글 목록조회 
export const getTourBaordList = async () => {
    try {
        const response = await axiosInstance.get("/board/tourisSpot")
        return response;
    } catch (error) {
        throw error;
    }
}

// get tourisSpot 게시글 목록조회 
export const getCompanyBaordList = async () => {
    try {
        const response = await axiosInstance.get("/board/company")
        return response;
    } catch (error) {
        throw error;
    }
}

// post 게시글 작성 
export const postBoardWrite = async (formData) => {
    try {
        const response = await axiosInstance.post("/board/boardWrite", formData)
        return response;
    } catch (error) {
        throw error;
    }
}

