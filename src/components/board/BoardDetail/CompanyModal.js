import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaPlane } from "react-icons/fa6";
import { MdOutlineLocationOn, MdDateRange } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
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

      <Modal className='companyModal' show={show} onHide={handleClose}>
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title className='modal-title'>??</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h2>저녁밥 같이 드실분?</h2>
            <div>
              <p className='modal-title'><MdOutlineLocationOn className='location-icon' />서울</p>
            </div>
            <div>
              <MdDateRange className='date-icon' />2023.12.31
            </div>
          </div>
          <div className='tag'>
            #모든 성별 #20대 #산책
          </div>
          <div>
            구로디지털단지 형제특수부위 육회 무료 이벤트라는데 함께 가실 20대 구합니다!
          </div>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <Button variant="secondary" onClick={handleClick} >
            신청하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CompanyModal;