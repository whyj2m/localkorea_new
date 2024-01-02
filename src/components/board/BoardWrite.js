import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/board/boardWrite.scss';

import BoardNav from './BoardNav';
import BoardUploadFile from './BoardFileUpload/BoardFileUpload';

// import { postBoardWrite } from '../../api/BoardApi';

function BoardWrite() {
    const [isFileUploadDisabled, setIsFileUploadDisabled] = useState(true);

    useEffect(() => {
        setIsFileUploadDisabled(false); // 처음 로드할 때 파일 업로드 활성화
    }, []);

    // 카테고리 2(여행메이트)일 때 파일 업로드 비활성화
    const handleChange = (e) => {
        const { name, value } = e.target;

        // 실행하려는 로직
        if (name === 'boardCno') {
            if (value === '2') {
                setIsFileUploadDisabled(true); // 비활성화
            } else {
                setIsFileUploadDisabled(false);
            }
        }

        // 폼 데이터 업데이트
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        boardCno: '1', // 기본값 1로 설정
        locationCno: '1'
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post("http://localhost:8081/board/boardWrite", formData)
            if (response.status === 200) {
                alert("게시글 작성 완료");
                navigate("/board/tourisSpot")
            } else {
                alert("게시글 작성 실패")
            }
        } catch (error) {
            alert("게시글 작성 실패")
        }
    }

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value })
    // }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    //     // console.log("test : ",value);
    // };

    // // 카테고리 2(여행메이트)일 때 파일 업로드 비활성화
    // const handleSelectChange = (event) => {
    //     if (event.target.value === '2') {
    //         setIsFileUploadDisabled(true); // 비활성화
    //     } else {
    //         setIsFileUploadDisabled(false);
    //     }
    //     setFormData({ ...formData, [event.target.name]: event.target.value });
    // };










    return (
        <>
            <BoardNav />

            <div className="container">
                <div className='write'>
                    <div className='write-explanation'>작성 안내</div>
                    <div>
                        새하마노 방방곡곡은 대한민국의 문화와 자연을 사랑하는 이들에게 맞춤형 여행을 제공하고,
                        지역 문화와 자연환경을 소개합니다. 저희는 새로운 장소와 경험을 찾고, 좋은 곳을 알리며,
                        관심과 사랑으로 대한민국의 다양한 매력을 세계에 알리고자 합니다. 여러분의 많은 관심과 참여를 부탁드립니다.
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col xs={4} md={1}>
                                <Form.Group controlId="title" className="mb-0" >
                                    <Form.Label className="mr-2">제목 *</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={8} md={8}>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="제목을 입력하세요"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </Col>


                        </Row>
                        <div className='underline'></div>
                        <Row>
                            <Col xs={4} md={1}>
                                <Form.Group controlId="cate" className="mb-0">
                                    <Form.Label className="mr-2">구분 *</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={8} md={2}>
                                <div>
                                    <select
                                        className="form-select"
                                        name="boardCno"
                                        value={formData.boardCno}
                                        onChange={handleChange}
                                    >
                                        <option value="1">관광지 추천</option>
                                        <option value="2">여행 메이트</option>
                                    </select>
                                </div>
                            </Col>

                            <Col xs={4} md={1}>
                                <Form.Group controlId="cate" className="mb-0">
                                    <Form.Label className="mr-2">지역 *</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={8} md={2}>
                                <select className="form-select"
                                    id="localCate"
                                    name="locationCno"
                                    value={formData.locationCno}
                                    onChange={handleChange}
                                >
                                    <option value="1">서울</option>
                                    <option value="2">인천</option>
                                    <option value="3">대전</option>
                                    <option value="4">부산</option>
                                    <option value="5">경기</option>
                                    <option value="6">충천</option>
                                    <option value="7">강원</option>
                                    <option value="8">전라</option>
                                    <option value="9">경상</option>
                                </select>
                            </Col>
                        </Row>
                        <div className='underline'></div>

                        <Col md={6} className='d-flex justify-content-end'>
                            <BoardUploadFile isDisabled={isFileUploadDisabled} />
                        </Col>


                        <div className='underline'></div>
                        <Form.Group controlId="content">
                            <Form.Label>내용 *</Form.Label>
                            <Form.Control
                                rows={10}
                                as="textarea"
                                name="content"
                                placeholder="내용을 입력하세요"
                                value={formData.content}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" type="button" id="btn-save" onClick={handleSubmit}>
                                등록
                            </Button>
                        </Col>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default BoardWrite;
