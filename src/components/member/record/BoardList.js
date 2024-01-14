import { Pagination } from "react-bootstrap";
import { BsEye } from "react-icons/bs";
import { FaExclamationCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getMyTourspotList, getMyTravelmateList } from "../../../api/MemberApi";

function BoardList() {
  const [tourspotList, setTourspotList] = useState([]);
  const [travelmateList, setTravelmateList] = useState([]);

  const [totalItems, setTotalTourspotItems] = useState(0);
  const [totalItems2, setTotalTravelmateItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지당 보여질 아이템 수

  useEffect(() => {
    const fetchTourspotData = async () => {
      try {
        const response = await getMyTourspotList();
        setTotalTourspotItems(response.data.length); // 총 게시글 수 반영
        setTourspotList(response.data); // API에서 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error("Error fetching tourspot list:", error);
      }
    };

    const fetchTravelmateData = async () => {
      try {
        const response = await getMyTravelmateList();
        setTotalTravelmateItems(response.data.length); // 총 게시글 수 반영
        setTravelmateList(response.data); // API에서 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error("Error fetching tourspot list:", error);
      }
    };

    fetchTourspotData();
    fetchTravelmateData(); 
  }, []);

  // 관광지 소개 게시판의 페이지 번호를 계산하는 함수
  const calculatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // 표시할 최대 페이지 수

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPageIndex = Math.floor((currentPage - 1) / totalItems); // 현재 페이지가 속한 그룹의 인덱스

    let startPage = currentPageIndex * maxPagesToShow + 1; // 시작 페이지
    let endPage = (currentPageIndex + 1) * maxPagesToShow; // 끝 페이지

    if (startPage < 1) {
        startPage = 1;
    }

    if (endPage > totalPages) {
        endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // 여행 메이트 게시판의 페이지 번호를 계산하는 함수
  const calculateTravelmatePageNumbers  = () => {
    const pageNumbers2 = [];
    const maxPagesToShow = 5; // 표시할 최대 페이지 수

    const totalPages = Math.ceil(totalItems2 / itemsPerPage);
    const currentPageIndex = Math.floor((currentPage - 1) / totalItems2); // 현재 페이지가 속한 그룹의 인덱스

    let startPage = currentPageIndex * maxPagesToShow + 1; // 시작 페이지
    let endPage = (currentPageIndex + 1) * maxPagesToShow; // 끝 페이지

    if (startPage < 1) {
        startPage = 1;
    }

    if (endPage > totalPages) {
        endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers2.push(i);
    }

    return pageNumbers2;
  };

  // 페이지 번호를 클릭할 때 호출되는 핸들러
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 페이지로 이동하는 핸들러
  const handlePreviousPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 핸들러
  const handleNextPage = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
  };

  // 페이지 이동 버튼 클릭 시 계산된 페이지 목록
  const pageNumbers = calculatePageNumbers();
  const pageNumbers2 = calculateTravelmatePageNumbers();

  // 현재 페이지에 해당하는 아이템 추출
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tourspotList.slice(startIndex, endIndex);
  const currentItems2 = travelmateList.slice(startIndex, endIndex);

  

  return (
    <>
      <h3 className="title">나의 활동 - 게시글</h3>
      
      <h4 className="title">관광지 추천</h4>
      {totalItems > 0 ? (
      <>
      <table className="boardlist recommendAttraction">
        <thead>
          <tr>
            <th>지역</th>
            <th>제목</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((tourspot) => (
            <tr key={tourspot.bno}>
               <td>
                <Link to={`/board/tourisSpotView/${tourspot.bno}`}>
                  {tourspot.location}
                </Link>
              </td>
              <td>
                <Link to={`/board/tourisSpotView/${tourspot.bno}`}>
                  {tourspot.title}
                </Link>
              </td>
              <td>
                <Link to={`/board/tourisSpotView/${tourspot.bno}`}>
                  <BsEye />
                  {tourspot.viewCnt}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="pagination justify-content-center">
        <Pagination.First onClick={() => handlePageClick(1)}/>
        <Pagination.Prev onClick={handlePreviousPage} />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={()=>handlePageClick(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNextPage} />
        <Pagination.Last onClick={() => handlePageClick(pageNumbers.length)}/>
      </Pagination>
      </>
      ): (<div className="no_data">
      <div className="emptyIcon">
        <FaExclamationCircle />
      </div>
      <h3>관광지 추천 활동 내역이 없습니다.</h3>
      </div>)}
      <h4 className="title">여행 메이트</h4>
      {totalItems2 > 0 ? (
      <>
      <table className="boardlist travel_mate">
        <thead>
          <tr>
            <th>지역</th>
            <th>제목</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {currentItems2.map((tourspot) => (
            <tr key={tourspot.bno}>
              <td>
                <Link to={`/board/company/${tourspot.bno}`}>
                  {tourspot.location}
                </Link>
              </td>
              <td>
                <Link to={`/board/company/${tourspot.bno}`}>
                  {tourspot.title}
                </Link>
              </td>
              <td>
                <Link to={`/board/company/${tourspot.bno}`}>
                  <BsEye />
                  {tourspot.viewCnt}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="pagination justify-content-center">
        <Pagination.First onClick={() => handlePageClick(1)}/>
        <Pagination.Prev onClick={handlePreviousPage} />
        {pageNumbers2.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={()=>handlePageClick(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNextPage} />
        <Pagination.Last onClick={() => handlePageClick(pageNumbers2.length)}/>
      </Pagination>
      </>
    ) : (<div className="no_data">
      <div className="emptyIcon">
        <FaExclamationCircle />
      </div>
      <h3>여행 메이트 활동 내역이 없습니다.</h3>
      </div>)}
    </>
  );
}

export default BoardList;
