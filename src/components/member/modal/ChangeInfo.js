import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { chgInfo, getMember } from "../../../api/MemberApi";

function ChangeInfo(props) {

  const [memberInfo, setMemberInfo] = useState({
    id:"", name:"", phoneNum:"", email:""
  })

  useEffect(()=>{
    async function fetchMemberInfo() {
      try {
        const response = await getMember()
        setMemberInfo(response.data)
      } catch (error) {
        console.error("Error fetching member info:", error);
      }
    }
    fetchMemberInfo();
  }, []);

  const handleInfoChange = async () => {
    try {
      

      const response = await chgInfo();
      // 응답 처리
      alert(response.data)
      props.onHide();
    } catch (error) {
      console.error("Error changing member info:", error);
      // 에러 처리 로직 추가
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          회원정보 변경
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="chgName">이름</Form.Label>
              <Form.Control
                type="text"
                id="chgName"
                placeholder="변경할 이름을 입력하세요."
                value={memberInfo.name}
                onChange={(e) => setMemberInfo({ ...memberInfo, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="chgPH">Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="chgPH"
                placeholder="변경할 휴대폰번호를 입력하세요."
                value={memberInfo.phoneNum}
                onChange={(e) => setMemberInfo({ ...memberInfo, phoneNum: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputEmail">Email Address</Form.Label>
              <InputGroup>
                <Form.Control
                  id="chgEmail"
                  placeholder="Enter your Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button>인증번호 발송</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="chgEmailVC">인증번호 확인</Form.Label>
              <Form.Control
                type="text"
                id="chgEmailVC"
                placeholder="Enter verification code"
              />
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>취소</Button>
        <Button variant="primary" onClick={handleInfoChange}>
            변경
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangeInfo;