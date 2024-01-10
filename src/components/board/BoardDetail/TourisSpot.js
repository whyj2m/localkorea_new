import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Col, Row, Pagination } from 'react-bootstrap';
import moment from 'moment'; // 시간

import { getTourBaordList } from '../../../api/BoardApi';
import { getImg } from "../../../api/BoardApi";
import BoardNav from '../BoardNav';

import '../../../styles/board/board.scss';
import '../../../styles/board/tourisSpot.scss';

// 검색창
// function SearchForm() {
//     return (
//         <>
//             <div className="container search">
//                 <div className="row justify-content-end">
//                     <Col md={3} sx={6}>
//                         <Form className="d-flex ">
//                             <Form.Control
//                                 type="search"
//                                 placeholder="Search"
//                                 className="me-2 form-control-sm border-0 border-bottom"
//                                 aria-label="zSearch"
//                             />
//                             <Button className='search-btn' as="input" type="submit" value="검색" />{' '}
//                         </Form>
//                     </Col>
//                 </div>
//             </div >
//         </>
//     );
// }


function TourisSpot() {
    const navigate = useNavigate();
    const { bno } = useParams();
    const [imageSrc, setImageSrc] = useState(''); // 이미지
    const [imageSrcMap, setImageSrcMap] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 한 페이지당 보여질 아이템 수

    // 글작성 버튼 입력시 boardWrite 페이지로 이동
    const handleButtonClick = () => {
        navigate('/board/boardWrite');
    };

    // 관광지 추천 게시판 글 가져오기
    const [TourBoardListData, setTourBoardListData] = useState([]);

    useEffect(() => {
        const fetchTourBoardListData = async () => {
            try {
                const response = await getTourBaordList();
                const data = response.data
                setImageSrc('../../assets/test/noImg.png');
                // console.log("TourBoardListData: ", response.data);
                setTourBoardListData(data);
            } catch (error) {
                setImageSrc('../../assets/test/noImg.png');
                // console.error("Error fetching local data:", error);
            }
        };

        fetchTourBoardListData();
    }, []);

    // 카테고리 필터링
    const [selectedLocation, setSelectedLocation] = useState(null); // 선택한 지역 값을 state로 관리

    const handleLocationChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedLocation(selectedValue); // 선택한 지역 값 업데이트
    };

    const filterItemsByLocation = () => {
        if (!selectedLocation || selectedLocation === 'all') {
            // 선택하지 않으면 전체
            return TourBoardListData;
        } else {
            return TourBoardListData.filter(item => item.location === selectedLocation);
        }
    };

    // 선택된 지역에 따라 필터링된 아이템을 계산
    const filteredItems = filterItemsByLocation();


    // 페이지 번호를 계산하는 함수
    const calculatePageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // 표시할 최대 페이지 수

        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        const currentPageIndex = Math.floor((currentPage - 1) / maxPagesToShow); // 현재 페이지가 속한 그룹의 인덱스

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
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 페이지 이동 버튼 클릭 시 계산된 페이지 목록
    const pageNumbers = calculatePageNumbers();

    // 현재 페이지에 해당하는 아이템 추출
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    // 이미지 보여주기
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const promises = currentItems.map(async (item) => {
                    if (!imageSrcMap[item.bno]) {
                        const response = await fetch(`http://localhost:8081/api/images/${item.bno}`);
                        if (response.ok) {
                            const blob = await response.blob();
                            const imageUrl = URL.createObjectURL(blob);
                            setImageSrcMap((prevImageSrcMap) => ({
                                ...prevImageSrcMap,
                                [item.bno]: imageUrl,
                            }));
                        } else {
                            console.error(`이미지가 없습니다 : ${item.bno}`);
                        }
                    }
                });

                await Promise.all(promises);
            } catch (error) {
                console.error('TouriaSpot.js images 오류 :', error);
            }
        };

        if (currentItems.length > 0) {
            fetchImages();
        }
    }, [currentItems, imageSrcMap]);

    return (
        <>
            <BoardNav />

            {/* 검색창 */}
            {/* <SearchForm /> */}

            {/* 관광지 카드 */}
            <div className="container">
                <div className="touriSpot-cotent">
                    <Row className='align-items-center'>
                        {/* 총건수 확인 */}
                        <Col md={8} className="place-total d-flex align-items-center">
                            <div className="total">
                                총<span>{filteredItems.length}</span>건
                            </div>
                        </Col>
                        {/* 필터링 */}
                        <Col xs={9} md={2}>
                            <Form.Select aria-label="지역을 선택하세요" onChange={handleLocationChange}>
                                <option value="all">전체 지역</option>
                                <option value="서울">서울</option>
                                <option value="인천">인천</option>
                                <option value="대전">대전</option>
                                <option value="부산">부산</option>
                                <option value="경기">경기</option>
                                <option value="충청">충청</option>
                                <option value="강원">강원</option>
                                <option value="전라">전라</option>
                                <option value="경상">경상</option>
                            </Form.Select>
                        </Col>
                        <Col xs={9} md={2} className="d-flex justify-content-end">
                            <Button className='write-btn' as="input" type="submit" variant="outline-primary" value="글작성" onClick={handleButtonClick} />
                        </Col>
                    </Row>
                    {/* 필터링된 결과를 출력 */}
                    {currentItems.map((item, index) => (
                        <Link to={`/boardView/${item.bno}`} key={item.bno} className="tour-board-link" >
                            <Card className='TourisSpot-Card'>
                                <Row>
                                    <Col xs={9} md={3}>
                                        {/* <img className='TourisSpot-Img' variant="top" src={item.imageSrc} alt="대표이미지" /> */}
                                        <div>
                                            {imageSrcMap[item.bno] ? (
                                                <img
                                                    className='TourisSpot-Img'
                                                    variant="top"
                                                    src={imageSrcMap[item.bno]}
                                                    alt={`Image ${item.bno}`}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                // <div>등록된 이미지가 없습니다!</div>
                                                <img src="../../assets/test/noImg.png" alt="No Image" 
                                                style={{width:230}}
                                                />
                                            )}
                                        </div>

                                    </Col>
                                    <Col xs={9} md={9}>
                                        <Row className="justify-content-between align-items-center">
                                            <Col xs={10} md={10} className="content-location">[{item.location}]</Col>
                                            <Col xs={3} md={2}><p>조회 {item.viewCnt || 0}</p></Col>
                                        </Row>
                                        <Col className="content-title" xs={7} md={4}>{item.title}</Col>
                                        <Row className="justify-content-end nickAndDate">
                                            <Col xs={6} md={2}><p>작성자:{item.id?.username}</p></Col>
                                            <Col xs={6} md={2}><div className="time">{moment(item.regDate).format('YYYY/MM/DD')}</div></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className="underline" />
                            </Card>
                        </Link>
                    ))}
                </div>
                {/* 페이징 */}
                <Pagination style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
                    <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} />
                    {pageNumbers.map((number) => (
                        <Pagination.Item
                            key={number}
                            active={number === currentPage}
                            onClick={() => handlePageClick(number)}
                        >
                            {number}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} />
                </Pagination>
            </div>
        </>
    );
}

export { TourisSpot };