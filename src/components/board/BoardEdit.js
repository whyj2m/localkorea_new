import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/board/boardEdit.scss';

import { getTourBaordDetail } from '../../api/BoardApi';
import BoardUploadFile from './BoardFileUpload/BoardFileUpload';

import BoardNav from './BoardNav';

const BoardEdit = () => {
   const { bno } = useParams(); // URL에서 bno 가져오기
   const navigate = useNavigate(); // 페이지이동
   const [TourBaordDetailData, setTourBaordDetailData] = useState([]);
   const [isFileUploadDisabled, setIsFileUploadDisabled] = useState(true); // 파일업로드
   const [updateDate, setUpdateDate] = useState({
      title: '',
      content: '',
      boardCno: '1',
      locationCno: '1',
      location:'서울'
   });
   
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         //  const response = await putBoard(bno, updateDate); // 왜그런지 모르겠지만 put은 안됨
          const response = await axios.put(`http://localhost:8081/board/edit/${bno}`, updateDate);
          if (response.status === 200) {
              alert("게시글 수정 완료");
              navigate("/board/tourisSpot")
          } else {
              alert("게시글 수정 실패");
          }
      } catch (error) {
          alert("게시글 수정 오류");
      }
  };

   useEffect(() => {
      const fetchTourBaordDetailData = async () => {
         try {
            const response = await getTourBaordDetail(bno);
            const data = response.data;
            setTourBaordDetailData(Array.isArray(data) ? data : [data]);
         } catch (error) {
            console.error("오류 : ", error);
         }
      };
      fetchTourBaordDetailData();
   }, [bno]);

   // 초기값
   useEffect(() => {
      if (TourBaordDetailData.length > 0) {
         const initialData = TourBaordDetailData[0];
         setUpdateDate({
            title: initialData.title || '',
            content: initialData.content || '',
            boardCno: initialData.boardCno || '1',
            locationCno: initialData.locationCno || '1',
            location: initialData.location || '서울'
         });
      }
   }, [TourBaordDetailData]);

   // 업데이트
   const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdateDate((prevData) => ({
         ...prevData,
         [name]: value,
         // location: (name === 'locationCno') ? getLocationName(value) : prevData.location
         location: getLocationName(value)
      }));
   };
   
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
   
   // 파일업로드
   useEffect(() => {
      setIsFileUploadDisabled(false); // 처음 로드할 때 파일 업로드 활성화
   }, []);

   return (
      <div>
         <BoardNav />

         <div className="container">
            <div className='instructions'>
               <img src='../../assets/etc/pointbar.png' alt='pointbar' />
               <div className='instructions-explanation'>수정하기</div>
            </div>

            {TourBaordDetailData.map(item => (
               <div className='write' key={item.bno}>
                  <Form onSubmit={handleSubmit}  >
                     <Row className="align-items-center" >
                        <Col xs={4} md={1}>
                           <Form.Group controlId="title" className="mb-0" >
                              <Form.Label className="mr-2">제목 *</Form.Label>
                           </Form.Group>
                        </Col>
                        <Col xs={8} md={8}>
                           <Form.Control
                              type="text"
                              name="title"
                              value={updateDate.title || item.title}
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
                                 value={updateDate.boardCno || item.boardCno}
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
                              value={updateDate.locationCno || item.locationCno}
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

                     {/* <Col md={6} className='d-flex justify-content-end'>
                        <BoardUploadFile isDisabled={isFileUploadDisabled} />
                     </Col> */}


                     <div className='underline' />
                     <Form.Group controlId="content">
                        <Form.Label>내용 *</Form.Label>
                        <Form.Control
                           rows={10}
                           as="textarea"
                           name="content"
                           placeholder="내용을 입력하세요"
                           value={updateDate.content || item.content}
                           onChange={handleChange}
                        />
                     </Form.Group>
                     <Col className="d-flex justify-content-end">
                        <Button variant="primary" type="button" id="btn-save" onClick={handleSubmit}>
                           수정
                        </Button>
                     </Col>
                  </Form>
               </div>
            ))}
         </div>
      </div>
   );
};

export default BoardEdit;
