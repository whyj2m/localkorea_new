// import React, { useState } from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import { createBrowserHistory } from 'history'; // 모달주소이동

// 아이콘
import { FaPlane } from "react-icons/fa6";
import { MdOutlineLocationOn, MdDateRange } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";

// toast
// import { ToastContainer, toast } from 'react-toastify';

// 시간
import moment from 'moment';

import { postReply } from "../../../api/BoardApi";
import { getReply } from "../../../api/BoardApi";
import { getCompanyDetail } from "../../../api/BoardApi";
import BoardNav from '../BoardNav';

// css
// import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/board/companyView.scss';


function CompanyView() {

//   const [show, setShow] = useState(false);

//   const handleShow = (bno) => {
//     setShow(true);
//     setSelectedItem(bno);
//     history.push(`/board/company/${bno}`);
//   };

//   const handleClose = () => {
//     setShow(false);
//     setSelectedItem(null);
//     history.push('/board/company');
//   };

  const [commentContent, setCommentContent] = useState('');

  // const handleClick = () => { // toast
  //   toast.info('신청되었습니다!', {
  //     position: "bottom-center",
  //     autoClose: 1000,
  //     hideProgressBar: true, // 프로그래스바 안 보이도록
  //     newestOnTop: false,
  //     closeOnClick: true,
  //     rtl: false,
  //     pauseOnFocusLoss: true,
  //     draggable: true,
  //     pauseOnHover: true,
  //     theme: 'light'
  //   });
  // };



  // 댓글 가져오기
  const [replyList, setReplyList] = useState([]);

  

  useEffect(() => {
    const fetchReplyData = async () => {
      try {
        const response = await getReply(); // 댓글을 가져오는 함수 호출
        const data = response.data;
        console.log("ReplyData: ", data);
        setReplyList(data); // 반환된 데이터 배열을 상태로 설정 (댓글 목록)
      } catch (error) {
        console.error("Error fetching reply data:", error);
      }
    };

    fetchReplyData(); // 댓글 가져오기 함수 호출
  }, []);




  // 여행메이트 게시판 글 가져오기
//   const [CompanyBoardListData, setCompanyBoardListData] = useState([]);

  // 여행메이트 bno별 게시글 가져오기
  const [CompanyBoardDetail, setCompanyBoardDetail] = useState([]);
  const { bno } = useParams();

  useEffect(() => {
    const fetchCompanyBoardDetail = async () => {
      try {
        const response = await getCompanyDetail(bno);
        const data = [response.data]; // 단일 객체를 배열로 감싸줌
        console.log("응답 데이터:", data);
        setCompanyBoardDetail(data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchCompanyBoardDetail();
  }, [bno]);







  const handleSubmit = async (e, bno) => {
    e.preventDefault();

    try {
      const commentData = {
        content: commentContent,
        bno: bno
      };

      const response = await postReply(commentData);
      console.log(response);
      alert('댓글 작성 완료');
    } catch (error) {
      console.log("댓글 작성 실패");
      alert('댓글 작성 실패');
    }
  }

  // textarea의 값을 상태로 업데이트하는 함수
  const handleChange = (e) => {
    setCommentContent(e.target.value);
  }

  return (
    <>
  
  <BoardNav />

      {CompanyBoardDetail.map(item => (
        <div key={item.bno} className='d-flex justify-content-center modal-'>
          {/* <Button className='apply-btn' >
            자세히
            <FaPlane className='ariPlane-btn' />
          </Button> */}
          <div className='companyView'>
            <div className='view-closeButton' closeButton></div>
            <div>
              <div className="container">
                <div className="row">
                  <div className="area-left col-md-6">

                    {/* 왼쪽 구역 */}
                    <div className="info-left">
                      <h2>{item.title}</h2>
                      <div className="nav">
                        <div>
                          <p className='nav-location'><MdOutlineLocationOn className='nav-location-icon' />{item.location}</p>
                        </div>
                        <div className='nav-date'>
                          <MdDateRange className='nav-date-icon' />
                          <p className="nave-date-regDate">{moment(item.regDate).format('YYYY/MM/DD')}</p>
                        </div>
                        <div>
                          <p className='nav-writer'><IoPersonCircleOutline className="nav-person-icno" />{item.id.id}</p>
                        </div>
                      </div>
                      <div>
                        {item.content}
                      </div>
                      <div className='Reply_div'>



                        <div className='Reply_write'>
                          <textarea
                            rows='3'
                            type="text"
                            id="write_reply" // ID 변경
                            placeholder='100자 이내의 글을 입력해주세요.'
                            maxLength='100'
                            name='write_reply'
                            value={commentContent} // 상태와 연결
                            onChange={handleChange} // 값이 변경될 때마다 상태 업데이트
                          />
                          <input type='submit' value='등록' id='reply_submit_button'
                            onClick={(e) => handleSubmit(e, item.bno)} />
                        </div>

                        {/* <Form.Control
                          rows='3'
                          type="text"
                          id="title"
                          placeholder='100자 이내의 글을 입력해주세요.'
                          maxLength='100'
                          name='write_reply'
                        onChange={handleChange}
                        /> */}
                        {/* <input type='submit' value='등록' id='reply_submit_button' onClick={handleSubmit}/> */}
                        {/* <Button type="submit" id="reply_submit_button" onClick={handleSubmit}>
                          등록
                        </Button> */}
                      </div>
                    </div>
                  </div>
                  {/* 오른쪽 구역 */}
                  <div className="area-right col-md-6">
                    <div className="Reply-list">
                      {replyList.map((reply, index) => (
                        <div key={index}>
                          <div className="Reply-nav">
                            <div className="nick-name">{reply.id}</div>
                            <div className="time">{reply.regDate}</div>
                            <Button className="delete" variant="link">삭제</Button>
                          </div>
                          <div>
                            <div className="Reply-content">{reply.content}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      ))}
    </>
  );
}
export default CompanyView;