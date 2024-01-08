import '../../styles/board/boardView.scss';

import React from 'react';
import { useEffect, useState } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import moment from 'moment'; // 시간    
import 'moment/locale/ko'; // 시간 한글로

import { useNavigate } from 'react-router-dom';

import { getTourBaordDetail, getImg } from '../../api/BoardApi';
import { deleteBoard } from '../../api/BoardApi';
import BoardNav from './BoardNav';



function BoardView() {

    // 관광지 추천 게시판 상세 내용 가져오기
    const [TourBaordDetailData, setTourBaordDetailData] = useState([]);
    const { bno } = useParams();
    const [previews, setPreviews] = useState([]); // 이미지
    const [imageSrc, setImageSrc] = useState('');

    // bno를 사용하여 관광지 게시글 상세정보를 가져오기
    useEffect(() => {
        const fetchTourBaordDetailData = async () => {
            try {
                const response = await getTourBaordDetail(bno);
                const data = response.data;
                console.log(data);

                setTourBaordDetailData(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error fetching local data:", error);
            }
        };

        fetchTourBaordDetailData();
    }, []); // 빈 배열 한 번만 실행



    // 삭제
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteBoard(bno);
            alert("삭제되었습니다.");
            navigate('/board/tourisSpot');
        } catch (error) {
            console.error('Error deleting board:', error);
        } finally {
            setLoading(false);
        }
    };

    // 수정

    // 이미지 보여주기
    useEffect(() => {
        // 이미지를 가져오는 API 호출
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/images/${bno}`);
                if (response.ok) {
                    const blob = await response.blob(); // 이미지 데이터를 blob으로 변환
                    const imageUrl = URL.createObjectURL(blob); // blob URL 생성
                    setImageSrc(imageUrl); // 이미지 주소를 state에 저장
                } else {
                    console.error('Failed to fetch image');
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [bno]);


    return (
        <div>
            <BoardNav />

            <div className='container'>
                <div className='boardView-all'>

                    {TourBaordDetailData.map(item => (
                        <Row key={item.bno}>
                            <div className='boardView-bno'>{item.bno}번 추천글</div>

                            {/* 제목 */}
                            <Row>
                                <Col xs={4} md={2} className='boardView-title'>
                                    <p>제목</p>
                                </Col>
                                <Col xs={8} md={8} className='BoardContent'>
                                    <div>{item.title}</div>
                                </Col>
                                <div className="line" />
                            </Row>

                            {/* 시간 */}
                            <Row>
                                <Col xs={4} md={2} className='boardView-date'>
                                    <p>작성일</p>
                                </Col>
                                <Col xs={8} md={4} className='BoardContent'>
                                    <div>{moment(item.regDate).format('LLL')}</div>
                                </Col>
                                <Col xs={4} md={2} className='boardView-date'>
                                    <p>최종수정일</p>
                                </Col>
                                <Col xs={8} md={4} className='BoardContent'>
                                    <div>{moment(item.updateDate).format('LLL')}</div>
                                </Col>
                                <div className="line" />
                            </Row>

                            {/* 내용 */}
                            <Row>
                                <Col xs={4} md={2} className='boardView-content'>
                                    <p>내용</p>
                                </Col>
                                <Col xs={8} md={4} className='BoardContent'>
                                    <div>{item.content}</div>
                                </Col>
                                <div className="line" />
                            </Row>

                            {/* 사진 */}
                            <Row>
                                <Col xs={8} md={4} className='BoardContent'>
                                    <div>
                                        {imageSrc ? (
                                            <img
                                                src={imageSrc}
                                                alt={`Image ${bno}`}
                                                width={300}
                                                height={250}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div>등록된 이미지가 없습니다!</div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            <div className="line" />
                            {/* 버튼 */}
                            <Row className='justify-content-end'>
                                <Col xs={1} md={1} className='boardView-btn'>
                                    <Link to={`/board/edit/${item.bno}`}>
                                        <Button variant="link">수정</Button>
                                    </Link>
                                </Col>
                                <Col xs={1} md={1} className='boardView-btn'>
                                    <Button variant="link" disabled={loading} onClick={handleDelete}>
                                        삭제
                                    </Button>
                                </Col>
                                <Col xs={1} md={1} className='boardView-btn'>
                                    <Link to="/board/tourisSpot">
                                        <Button variant="link">목록</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Row>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BoardView;