import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/board/boardWrite.scss';

import BoardNav from './BoardNav';
import BoardUploadFile from './BoardFileUpload/BoardFileUpload';

function BoardWrite() {
    const [isFileUploadDisabled, setIsFileUploadDisabled] = useState(true);

    useEffect(() => {
        setIsFileUploadDisabled(false); // 처음 로드할 때 파일 업로드 활성화
    }, []);

    // 카테고리 2(여행메이트)일 때 파일 업로드 비활성화
    const handleSelectChange = (event) => {
        if (event.target.value === '2') {
            setIsFileUploadDisabled(true); // 비활성화
        } else {
            setIsFileUploadDisabled(false);
        }
    };

    return (
        <>
            <BoardNav />

            <div className="container">
                <div className='write'>
                    <h2>게시글 작성</h2>
                    <Form>
                        <Row className="align-items-center">
                            <Col xs={4} md={1}>
                                <Form.Group controlId="title" className="mb-0">
                                    <Form.Label className="mr-2">제목 *</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={8} md={8}>
                                <Form.Control type="text" placeholder="제목을 입력하세요" />
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
                                <select class="form-select" id="inputGroupSelect01" onChange={handleSelectChange}>
                                    <option value="1">관광지 추천</option>
                                    <option value="2">여행 메이트</option>
                                </select>
                            </Col>
                            
                            <Col xs={4} md={1}>
                                <Form.Group controlId="cate" className="mb-0">
                                    <Form.Label className="mr-2">지역 *</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={8} md={2}>
                                <select class="form-select" id="localCate">
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
                            <Form.Control as="textarea" rows={10} placeholder="내용을 입력하세요" />
                        </Form.Group>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" type="button" id="btn-save">
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
