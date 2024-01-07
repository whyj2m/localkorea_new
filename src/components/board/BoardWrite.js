import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/board/boardWrite.scss';

import BoardNav from './BoardNav';

import { postBoardWrite } from '../../api/BoardApi';
// import BoardFileUpload from './BoardFileUpload/BoardFileUpload';

function BoardWrite() {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]); // 이미지파일데이터
    const [isFileUploadDisabled, setIsFileUploadDisabled] = useState(true); // 파일 업로드
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        boardCno: '1', // 기본값 1로 설정
        locationCno: '1',
        location: '서울',
        files: []
    })



    // 파일업로드

    const handleUploadedFiles = (files) => {
        setUploadedFiles(files);
    };


    useEffect(() => {
        setIsFileUploadDisabled(false); // 처음 로드할 때 파일 업로드 활성화
    }, []);

    // 파일업로드
    const handleFileChange = (files) => {
        const newFiles = [];

        const onUpload = (file, reader) => {
            reader.onload = () => {
                const fileObject = {
                    name: file.name,
                    uuid: file.name,
                    origin: file.type,
                    src: reader.result,
                    file_path: '/images/' + file.name
                };
                newFiles.push(fileObject);

                if (newFiles.length === files.length) {
                    setUploadedFiles(newFiles); // Update uploadedFiles state
                    setFormData((prevData) => ({
                        ...prevData,
                        files: newFiles
                    }));
                    setIsFileUploadDisabled(false); // 파일 업로드 활성화
                    console.log('Selected Files:', newFiles); // 파일 선택 시 로그 출력
                }
            };
        };

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            onUpload(file, reader);
            reader.readAsDataURL(file);
        }
    };

    const handleTitleChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            title: value
        }));
    };
    
    const handleOtherFieldsChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            location: (name === 'locationCno') ? getLocationName(value) : prevData.location
        }));
    };
    
    // 이벤트 핸들러에서는 변경 사항에 따라 적절한 함수를 호출합니다.
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    
    //     if (name === 'title') {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             title: value
    //         }));
    //     } else {
    //         handleOtherFieldsChange(name, value);
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'title') {
            console.log('Title field changed:', value); // 'title' 필드 변경 시 콘솔에 출력
            setFormData((prevData) => ({
                ...prevData,
                title: value
            }));
        } else if (name === 'locationCno') {
            console.log('Location field changed:', value); // 'locationCno' 필드 변경 시 콘솔에 출력
            handleOtherFieldsChange(name, value);
        } else {
            handleOtherFieldsChange(name, value);
        }
    };
    
    


    // 선택한 값을 토대로 location 값을 반환하는 함수
    const getLocationName = (value) => {
        switch (value) {
            case '1':
                return '서울';
            case '2':
                return '인천';
            case '3':
                return '대전';
            case '4':
                return '부산';
            case '5':
                return '경기';
            case '6':
                return '충청';
            case '7':
                return '강원';
            case '8':
                return '전라';
            case '9':
                return '경상';
            default:
                return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formData.title);
            formData.append('content', formData.content);
            formData.append('boardCno', formData.boardCno);
            formData.append('locationCno', formData.locationCno);
            formData.append('location', formData.location);
    
            // 파일들 추가
            uploadedFiles.forEach((file, index) => {
                formData.append(`files[${index}]`, file);
            });
    
            const response = await postBoardWrite(formData);
            console.log('Response:', response);
    
            if (response.status === 200) {
                alert("게시글 작성 완료");
                navigate("/board/tourisSpot");
            } else {
                alert("게시글 작성 실패");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("게시글 작성 오류");
        }
    };
    
    
    

    

    return (
        <>
            <BoardNav />

            <div className="container">
                <div className='instructions'>
                    <img src='../../assets/etc/pointbar.png' alt='pointbar' />
                    <div className='instructions-explanation'>작성 안내</div>
                    <div className='instructions-content'>
                        새하마노 방방곡곡은 대한민국의 문화와 자연을 사랑하는 이들에게 맞춤형 여행을 제공하고,
                        지역 문화와 자연환경을 소개합니다. 저희는 새로운 장소와 경험을 찾고, 좋은 곳을 알리며,
                        관심과 사랑으로 대한민국의 다양한 매력을 세계에 알리고자 합니다. 여러분의 많은 관심과 참여를 부탁드립니다.
                    </div>
                </div>
                <div className='write'>
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
                        <div className='underline' />
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
                        <div className='underline' />

                        <Col md={6} className='d-flex justify-content-end'>
                          
                            {/* <BoardFileUpload isDisabled={isFileUploadDisabled}
                                uploadedFiles={uploadedFiles} // 업로드된 파일 상태 전달
                                // setUploadedFiles={setUploadedFiles }>
                                setUploadedFiles={handleUploadedFiles }>
                                <input
                                    type="file"
                                    multiple // 여러 파일을 선택할 수 있도록 multiple 속성 추가
                                    onChange={(e) => handleFileChange(e.target.files)} // 파일 변경 시 handleFileChange 함수 호출
                                />
                            </BoardFileUpload> */}


                            <div className="input-group mb-3">
                                <input
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={(e) => handleFileChange(e.target.files)}
                                    className="form-control"
                                    id="inputGroupFile02"
                                    disabled={isFileUploadDisabled}
                                />
                                <label className="input-group-text" htmlFor="inputGroupFile02">
                                    업로드
                                </label>
                            </div>

                            {/* 업로드된 이미지 미리보기 */}
                            {uploadedFiles.map((fileObject, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
                                    <img src={fileObject.src} alt='FileUpload' style={{ width: '200px', height: '200px', objectFit: 'cover', marginBottom: '5px' }} />
                                    <p>{fileObject.name}</p>
                                </div>
                            ))}
                        </Col>


                        <div className='underline' />
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
                            <Button variant="primary" type="submit" id="btn-save" onClick={handleSubmit}>
                                등록
                            </Button>
                        </Col>
                    </Form>
                </div>
            </div>
        </>
    );
}
{/* } */ }
export default BoardWrite;
