// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// css
import { Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/board/boardWrite.scss';

// 컴포넌트
import BoardNav from './BoardNav';

// API
import { postBoardWrite } from '../../api/BoardApi';

// 토큰
import { jwtDecode } from "jwt-decode";

function BoardWrite() {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]); // 이미지파일데이터
    const [isFileUploadDisabled, setIsFileUploadDisabled] = useState(true); // 파일 업로드

    // 글 작성 값
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [boardCno, setBoardCno] = useState('1');
    const [locationCno, setLocationCno] = useState('1');

    // 토큰 가져오기
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const decodedToken = jwtDecode(accessToken); // jwt 디코딩하여 페이로드에 엑세스
    const userId = decodedToken.id; // 사용자id에 엑세스

        useEffect(() => {
            if (boardCno === '2') { // 여행 메이트 카테고리 선택 시
                setIsFileUploadDisabled(true); // 파일 업로드 비활성화
            } else {
                setIsFileUploadDisabled(false); // 다른 카테고리 선택 시 파일 업로드 활성화
            }
        }, [boardCno]);

    const handleChange = (e) => {
        const { name, value } = e.target;



        if (name === 'title') {
            setTitle(value);
        } else if (name === 'content') {
            setContent(value);
        } else if (name === 'boardCno') {
            setBoardCno(value);
        } else if (name === 'locationCno') {
            setLocationCno(value);
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

    // 파일 업로드
    const handleFileChange = (files) => {
        if (files && files.length > 0) {
            const newFiles = [];
    
            const readFile = (file, index) => {
                const reader = new FileReader();
    
                reader.onload = () => {
                    const fileObject = {
                        name: file.name,
                        uuid: file.name,
                        origin: file.type,
                        src: reader.result,
                        file_path: '/images/' + file.name,
                        file: file // 파일 객체 정보를 추가
                    };
    
                    newFiles.push(fileObject);
    
                    if (newFiles.length === files.length) {
                        setUploadedFiles(newFiles); // 파일 로드가 완료되면 업로드된 파일 목록 업데이트
                    }
                };
    
                reader.readAsDataURL(file);
            };
    
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                readFile(file, i);
            }
        } else {
            setUploadedFiles([]);
        }
    };
    


    // 0110새벽까지 됐는데 왜 안 될까
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const formData = new FormData();
    
    //     // 빈 배열을 전송하여 파일이 없는 경우에도 files를 전송
    //     formData.append('files', []);
    
    //     // 파일이 있는 경우에만 파일을 추가
    //     if (uploadedFiles.length > 0) {
    //         uploadedFiles.forEach((fileObject, index) => {
    //             formData.append(`files`, fileObject.file);
    //         });
    //     }

    //     else{
    //         alert('이미지를 첨부해야합니다!'); 
    //         return;
    //     }
    
    //     formData.append('title', title);
    //     formData.append('content', content);
    //     formData.append('boardCno', boardCno);
    //     formData.append('locationCno', locationCno);
    //     formData.append('location', getLocationName(locationCno));
    
    //     try {
    //         const response = await postBoardWrite(formData);
    //         console.log(response);
    //         alert('게시글 작성 성공');
    //         window.location.href = '/board/tourisSpot';
    //     } catch (error) {
    //         console.log("게시글 작성 실패");
    //         alert('게시글 작성 실패');
    //     }
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (boardCno === '1' && uploadedFiles.length === 0) {
            alert('여행 메이트 카테고리는 이미지를 첨부해야합니다!');
            return;
        }
    
        const formData = new FormData();
    
        if (uploadedFiles.length > 0) {
            uploadedFiles.forEach((fileObject, index) => {
                formData.append(`files`, fileObject.file);
            });
        } else {
            formData.append('files', []); // 빈 배열 전송
        }
    
        formData.append('title', title);
        formData.append('content', content);
        formData.append('boardCno', boardCno);
        formData.append('locationCno', locationCno);
        formData.append('location', getLocationName(locationCno));
        formData.append('id', userId);

    //    try {
    //     // 토큰을 Authorization 헤더에 추가
    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `Bearer ${accessToken}` // 토큰 추가
    //         }
    //     };

    //     // API 요청 시에 헤더를 함께 전송
    //     const response = await postBoardWrite(formData, config);

    //     console.log("성공", response);
    //     alert('게시글 작성 성공');
    //     navigate('/board/tourisSpot'); // useNavigate 사용하여 경로 변경
    // } catch (error) {
    //     console.log("게시글 작성 실패");
    //     alert('게시글 작성 실패');
    // }
    try {
        // API 요청 시에 헤더를 함께 전송할 필요 없음
        const response = await postBoardWrite(formData);

        console.log("성공 : ", response);
        alert('게시글 작성 성공');
        navigate('/board/tourisSpot'); // useNavigate 사용하여 경로 변경
    } catch (error) {
        console.log("게시글 작성 실패");
        alert('게시글 작성 실패');
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
                                <Form.Group id="title" className="mb-0" >
                                    <Form.Label className="mr-2">제목 *</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={8} md={8}>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="제목을 입력하세요"
                                    value={title}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <div className='underline' />
                        <Row>
                            <Col xs={4} md={1}>
                                <Form.Group id="cate" className="mb-0">
                                    <Form.Label className="mr-2">구분 *</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={8} md={2}>
                                <div>
                                    <select
                                        className="form-select"
                                        name="boardCno"
                                        id="boardCno"
                                        value={boardCno}
                                        onChange={handleChange}
                                    >
                                        <option value="1">관광지 추천</option>
                                        <option value="2">여행 메이트</option>
                                    </select>
                                </div>
                            </Col>
                            <Col xs={4} md={1}>
                                <Form.Group id="locationCno" className="mb-0">
                                    <Form.Label className="mr-2">지역 *</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={8} md={2}>
                                <select className="form-select"
                                    // id="localCate"
                                    name="locationCno"
                                    id="locationCno"
                                    value={locationCno}
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
                            <div className="input-group mb-3">
                                <input
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={(e) => handleFileChange(e.target.files)}
                                    className="form-control"
                                    // id="inputGroupFile02"
                                    id="file"
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
                        <Form.Group id="content">
                            <Form.Label>내용 *</Form.Label>
                            <Form.Control
                                rows={10}
                                as="textarea"
                                name="content"
                                placeholder="내용을 입력하세요"
                                id="content"
                                value={content}
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
