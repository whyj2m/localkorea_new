// import React, { useState } from 'react';
import { useEffect, useState } from "react";
import { Button, Modal, Card } from 'react-bootstrap';

// 아이콘
import { FaPlane } from "react-icons/fa6"; 
import { MdOutlineLocationOn, MdDateRange } from "react-icons/md";

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

  const handleClick = () => { // toast
    toast.info('신청되었습니다!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true, // 프로그래스바 안 보이도록
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: 'light'
    });
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
        <div key={item.id} className='d-flex justify-content-center'>
          <Modal className='companyModal' show={show} onHide={handleClose}>
            <Modal.Header className='modal-header' closeButton>
              {/* <Modal.Title className='modal-title'>??</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <div>
                <h2>{item.title}</h2>
                <div>
                  <p className='modal-title'><MdOutlineLocationOn className='location-icon' />{item.location}</p>
                </div>
                <div>
                  <MdDateRange className='date-icon' /><Card.Text>{moment(item.regDate).format('YYYY/MM/DD')}</Card.Text>
                </div>
              </div>
              <div className='tag'>
                #20대 #여행 #제주도 #한달살기 
              </div>
              <div>
                {item.content}
              </div>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
              <Button variant="secondary" onClick={handleClick} >
                신청하기
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ))}
    </>
  );
}
export default CompanyModal;