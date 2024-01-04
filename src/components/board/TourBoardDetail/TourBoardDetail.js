// boardEdit.js랑 boardView.js 두 곳에 사용해서 따로 하려고했으나 모르겠다!

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // 또는 해당 페이지에서 사용하는 라우터 모듈 import

// const TourBoardDetail = () => {
//     const [tourBoardDetailData, setTourBoardDetailData] = useState([]);
//     const { bno } = useParams();

//     useEffect(() => {
//         const fetchTourBoardDetailData = async () => {
//             try {
//                 // 여기서 getTourBoardDetail은 해당 API 호출 함수 또는 관련 서비스 메소드로 가정합니다.
//                 const response = await getTourBoardDetail(bno);
//                 const data = response.data;

//                 setTourBoardDetailData(Array.isArray(data) ? data : [data]);
//             } catch (error) {
//                 console.error("Error fetching local data:", error);
//             }
//         };

//         fetchTourBoardDetailData();
//     }, [bno]); // bno 값이 변경될 때마다 실행

//     return tourBoardDetailData;
// };

// export default TourBoardDetail;
