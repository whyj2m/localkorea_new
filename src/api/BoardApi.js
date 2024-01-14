import axios from "axios";

const baseURL = 'http://localhost:8081'
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// tourisSpot API 시작
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

// get tourisSpot 게시글 bno별 상세조회 
export const getTourBaordDetail = async (bno) => {
    try {
        const response = await axiosInstance.get(`/board/tourisSpot/${bno}`);
        return response;
    } catch (error) {
        throw error;
    }
}
// tourisSpot API 끝

// company API 시작
// get company 게시글 목록조회 
export const getCompanyBaordList = async () => {
    try {
        const response = await axiosInstance.get("/board/company")
        return response;
    } catch (error) {
        throw error;
    }
}

// get company 게시글 bno별 상세조회
export const getCompanyDetail = async (bno) => {
    try {
      const response = await axiosInstance.get(`/board/companyView/${bno}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
 // company API 끝 

// tourisSpot 이미지
// 이미지 조회
// export const getImg = async (bno) => {
//     try {
//         const response = await axiosInstance.get(`/api/images/${bno}`);
//         return response.data; // 이미지 데이터 반환
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             // 이미지가 없는 경우, 빈 응답으로 처리
//             return null; // 빈 응답 반환
//         }
//         throw error; // 다른 오류는 그대로 throw
//     }
// }

// 이미지 (단일)조회
export const getImg = async (bno) => {
    try {
        const response = await axiosInstance.get(`/api/images/${bno}`);
        return [response.data]; // 이미지 데이터를 배열로 감싸서 반환
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // 이미지가 없는 경우, 빈 배열로 처리
            return []; // 빈 배열 반환
        }
        throw error; // 다른 오류는 그대로 throw
    }
}

// export const getImg = async (bno) => {
//     try {
//         const response = await axiosInstance.get(`/api/images/${bno}`);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }


// 게시글 작성
export const postBoardWrite = async (formData) => {
    try {
        const response = await axiosInstance.post("/board/boardWrite", formData, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        });
        
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

// company 댓글 API 시작
// 댓글 작성
export const postReply = async (replyData) => {
    try {
        const response = await axiosInstance.post(`/board/companyView/reply`, replyData)
        return response;
    } catch (error) {
        throw error;
    }
}

// 댓글 조회
export const getReply = async (bno) => {
    try {
        // console.log("bno 테스트: ", bno)
        const response = await axiosInstance.get(`/board/companyView/reply/${bno}`)
        return response;
    } catch (error) {
        throw error;
    }
}
// company 댓글 API 끝