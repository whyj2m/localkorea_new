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

// get tourisSpot 게시글 상세조회 
export const getTourBaordDetail = async (bno) => {
    try {
        const response = await axiosInstance.get(`/board/tourisSpot/${bno}`);
        return response;
    } catch (error) {
        throw error;
    }
}

// 이미지 조회
export const getImg = async (bno) => {
    try {
        const response = await axiosInstance.get(`/api/images/${bno}`);
        return response;
    } catch (error) {
        throw error;
    }
}

// get company 게시글 목록조회 
export const getCompanyBaordList = async () => {
    try {
        const response = await axiosInstance.get("/board/company")
        return response;
    } catch (error) {
        throw error;
    }
}

// // post 게시글 작성 
// export const postBoardWrite = async (formData) => {
//     try {
//         const response = await axiosInstance.post("/board/boardWrite", formData)
//         console.log(response);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// 이미지 조회
export const postBoardWrite = async (formData) => {
    try {
        const response = await axiosInstance.post("/board/boardWrite", formData, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        });
        // console.log(formData);
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};



// put 게시글 수정
export const putBoard = async (bno, updateDate, location) => {
    try {
        const response = await axiosInstance.put(`/board/edit/${bno}`, {...updateDate, location})
        return response;
    } catch (error) {
        throw error;
    }
}

// put 게시글 삭제
export const deleteBoard = async (bno) => {
    try {
        const response = await axiosInstance.delete(`/board/delete/${bno}`)
        return response;
    } catch (error) {
        throw error;
    }
}
