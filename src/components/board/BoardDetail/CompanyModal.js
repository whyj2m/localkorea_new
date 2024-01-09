// import React, { useState } from 'react';
import { useEffect, useState } from "react";
import { Button, Modal, Card } from 'react-bootstrap';

// 아이콘
import { FaPlane } from "react-icons/fa6";
import { MdOutlineLocationOn, MdDateRange } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";

// toast
import { ToastContainer, toast } from 'react-toastify';

// 시간
import moment from 'moment';

import { getCompanyBaordList } from '../../../api/BoardApi';

// css
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/board/companyModal.scss';


function CompanyModal() {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
      <ToastContainer // toast 설정
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Button className='apply-btn' onClick={handleShow}>
        자세히
        <FaPlane className='ariPlane-btn' />
      </Button>

      {CompanyBoardListData.map(item => (
        <div key={item.id} className='d-flex justify-content-center modal-'>
          <Modal className='companyModal' show={show} onHide={handleClose}>
            <Modal.Header className='modal-header' closeButton></Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row">
                  <div className="area-left col-md-6">
                    {/* 왼쪽 구역 */}
                    <div className="info">
                      <h2>{item.title}</h2>
                      <div className="detail">
                        <div>
                          <p className='modal-title'><MdOutlineLocationOn className='location-icon' />{item.location}</p>
                        </div>
                        <div className='date-info'>
                          <MdDateRange className='date-icon' />
                          <Card.Text>{moment(item.regDate).format('YYYY/MM/DD')}</Card.Text>
                        </div>
                        <div >
                          <Card.Text><IoPersonCircleOutline className="person-icno" />{item.id.id}</Card.Text>
                        </div>
                      </div>
                        <div>
                          {item.content}
                        </div>
                      <div className='Reply_div'>
                        <h4>댓글</h4>
                        <div className='Reply_write'>
                          <textarea
                            rows='3'
                            placeholder='100자 이내의 글을 입력해주세요.'
                            maxLength='100'
                            name='write_reply'
                          />
                          <input type='button' value='등록' id='reply_submit_button' />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 오른쪽 구역 */}
                  <div className="area-right col-md-6">
                    <div className="Reply-list">
                      <div className="Reply-nav">
                        <div className="nick-name">nick-name</div>
                        <div className="time">2018-3-2</div>
                        <Button className="delete" variant="link">삭제</Button>
                      </div>
                      {/* 댓글 */}
                      <div >
                        <div className="Reply-content">댓글입니다샬라샬라샬라샬라샬라</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>

        </div>
      ))}
    </>
  );
}
export default CompanyModal;