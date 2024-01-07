import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import moment from 'moment'; // 시간

import { getTourBaordList } from '../../../api/BoardApi';
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
                console.log("TourBoardListData: ", response.data);
                setTourBoardListData(data);
            } catch (error) {
                console.error("Error fetching local data:", error);
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
                                총<span>{TourBoardListData.length}</span>건
                            </div>
                        </Col>
                        {/* 필터링 */}
                        <Col xs={9} md={2}>
                            <Form.Select aria-label="지역을 선택하세요" onChange={handleLocationChange}>
                                <option value="all">전체 지역</option>
                                <option value="서울">서울</option>
                                <option value="인천">인천</option>
                                <option value="경기">대전</option>
                                <option value="경기">부산</option>
                                <option value="경기">경기</option>
                                <option value="경기">충청</option>
                                <option value="경기">강원</option>
                                <option value="경기">전라</option>
                                <option value="경기">경상</option>
                            </Form.Select>
                        </Col>
                        <Col md={2} className="d-flex justify-content-end">
                            <Button className='write-btn' as="input" type="submit" variant="outline-primary" value="글작성" onClick={handleButtonClick} />
                        </Col>
                    </Row>
                    {/* 필터링된 결과를 출력 */}
                    {filteredItems.map((item, index) => (
                        <Link to={`/boardView/${item.bno}`} key={item.bno}
                            className="tour-board-link"
                        >
                            <Card className='TourisSpot-Card'>
                                <Row>
                                    <Col xs={9} md={3}>
                                        <img className='TourisSpot-Img' variant="top" src={item.imageSrc} alt="대표이미지" />
                                    </Col>
                                    <Col xs={9} md={9}>
                                        <Row className="justify-content-between align-items-center">
                                            <Col xs={7} md={10} className="content-location">[{item.location}]</Col>
                                            <Col xs={2} md={2}><p>조회 {item.viewCnt || 0}</p></Col>
                                        </Row>
                                        <Col className="content-title" xs={7} md={4}>{item.title}</Col>
                                        <Row className="justify-content-end nickAndDate">
                                            <Col xs={2} md={1}><p>닉네임{item.id}</p> </Col>
                                            <Col xs={2} md={2}><div className="time">{moment(item.regDate).format('YYYY/MM/DD')}</div></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className="underline" />
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export { TourisSpot };