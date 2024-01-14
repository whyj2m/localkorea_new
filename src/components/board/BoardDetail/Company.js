// react
import { useEffect, useState } from "react";

// css
import '../../../styles/board/company.scss';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill } from "react-icons/bs"; // 아이콘
import { CiHeart } from "react-icons/ci";

// 시간
import moment from 'moment';

// API
import { getCompanyBaordList } from '../../../api/BoardApi';

// component
import BoardNav from '../BoardNav';


function Company() {
    // 글 작성 페이지로 이동
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/board/boardWrite'); // 절대 경로 '/board/boardWrite'로 이동
    };

    // 상세 페이지로 이동
    const handleButtonView = (bno) => {
        navigate(`/board/CompanyView/${bno}`);
    };


    // 여행메이트 게시판 글 가져오기
    const [CompanyBoardListData, setCompanyBoardListData] = useState([]);

    useEffect(() => {
        const fetchCompanyBoardListData = async () => {
            try {
                const response = await getCompanyBaordList();
                const data = response.data
                console.log("CompanyBoardListData: ", response.data);
                data.sort((a, b) => new Date(b.regDate) - new Date(a.regDate)); // 최근 등록댓글이 상단으로
                setCompanyBoardListData(data);
            } catch (error) {
                console.error("Error fetching local data:", error);
            }
        };

        fetchCompanyBoardListData();
    }, []);



    return (
        <>
            <BoardNav />

            <Container>
                <Row className='justify-content-end'>
                    <Col md={1} >
                        <Button className='write-btn' as="input" type="submit" value="글작성" onClick={handleButtonClick} />
                    </Col>
                </Row>

                {/* 여행메이트 카드 */}
                <Row xs={1} md={3} className="g-4">
                    {/* 여행메이트 카드 */}
                    {CompanyBoardListData.map(item => (
                        <Col key={item.bno}>
                            <Card className='Company-card'>
                                <Row className="g-0 align-items-center">
                                    <Col xs={12} md={12}>
                                        <div className="body-header">
                                            <div className="body-location">
                                                <p className="body-location-name">{item.location}</p>
                                            </div>
                                            {/* <div className="heartIcon"> */}
                                            <CiHeart style={{ fontSize: '2em', marginTop: '15px' }} />
                                            {/* </div> */}
                                        </div>

                                        <div className="body-title">{item.title}</div>

                                        <Card.Text>{moment(item.regDate).format('YYYY/MM/DD')}</Card.Text>
                                        <Button className='write-btn' as="input" type="submit" value="자세히 보기" onClick={() => handleButtonView(item.bno)} />


                                    </Col>
                                    {/* <Col xs={3} md={3}>
                                        <div className="d-flex flex-column align-items-center">
                                            <BsPeopleFill className='pepole-icon' />
                                            <Card.Text>1/4</Card.Text>
                                            <Button className='write-btn' as="input" type="submit" value="자세히 보기" onClick={() => handleButtonView(item.bno)} />
                                        </div>
                                    </Col> */}
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Company;