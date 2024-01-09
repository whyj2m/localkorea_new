import { useEffect, useState } from "react";
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill } from "react-icons/bs"; // 아이콘
import moment from 'moment'; // 시간

import { getCompanyBaordList } from '../../../api/BoardApi';
import Modal from './CompanyModal';
import BoardNav from '../BoardNav';

import '../../../styles/board/company.scss';

function Company() {

    // modal
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true); // 모달 열기 
    const handleCloseModal = () => setShowModal(false); // 모달 닫기

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/board/boardWrite'); // 절대 경로 '/board/boardWrite'로 이동
    };

    // 여행메이트 게시판 글 가져오기
    const [CompanyBoardListData, setCompanyBoardListData] = useState([]);

    useEffect(() => {
        const fetchCompanyBoardListData = async () => {
            try {
                const response = await getCompanyBaordList();
                const data = response.data
                console.log("CompanyBoardListData: ", response.data);
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
                {CompanyBoardListData.map(item => (

                    <div key={item.id} className='d-flex justify-content-center'>
                        <Row className="align-items-center">
                            <Col xs={12} md={3} >
                                <Card className='Company-card'>
                                    <Row className="g-0 align-items-center">
                                        <Col xs={9} md={9}>
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <div>
                                                    <p>{item.location}</p>
                                                </div>
                                                <Card.Text>{moment(item.regDate).format('YYYY/MM/DD')}</Card.Text>
                                                {/* <Card.Text className='tag'>#모든 성별 #20대 #산책</Card.Text> */}
                                            </Card.Body>
                                        </Col>
                                        <Col xs={3} md={3}>
                                            <div className="d-flex flex-column align-items-center">
                                                <BsPeopleFill className='pepole-icon' />
                                                <Card.Text>1/4</Card.Text>
                                                <Modal showModal={showModal} closeModal={handleCloseModal} />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Container>
        </>
    )
}

export default Company;