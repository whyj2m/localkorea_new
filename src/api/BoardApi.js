import axios from "axios";

const baseURL = 'http://localhost:8081'
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})

   // get tourisSpot 게시글 목록조회 
   export const getTourBaordList = async() => {
    try {
        const response = await axiosInstance.get("/board/tourisSpot")
        return response;
    } catch(error){
        throw error;
    }
   }


//    export const getBoard = async (course) => {
//     try {
//       const response = await axiosInstance.get("/board/list", {
//         params: course // 쿼리 파라미터 설정
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
