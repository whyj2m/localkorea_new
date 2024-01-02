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
        const response = await axiosInstance.get("/board/tourisSpot");
        const reversedData = response.data.reverse(); // 데이터를 역순으로 정렬
        return response;
    } catch (error) {
        throw error;
    }
}
// export const getTourBaordList = async () => {
//     try {
//         const response = await axiosInstance.get("/board/tourisSpot");
//         const reversedData = [...response.data].reverse(); // 데이터를 역순으로 정렬하여 새 배열 생성
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }



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

