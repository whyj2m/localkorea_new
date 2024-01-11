import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { chgInfo, getMember } from "../../../api/MemberApi";

function ChangeInfo(props) {

  const [memberInfo, setMemberInfo] = useState({
    id:"", name:"", phoneNum:"", email:""
  })

  // 이메일로 발송된 코드
  const [codeFromEmail, setCodeFromEmail] = useState("");
  const [vcSuccess, setVcSuccess] = useState(null);

  const [verificationCode, setVerificationCode] = useState("");

  const [vcValid, setVcValid] = useState(true);

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
      // 이메일 인증 코드를 확인하고 검증합니다.
      if (!verificationCode) {
        alert("인증번호를 입력해주세요.");
        return;
      }
      const response = await axios.post("http://localhost:8081/signup/verifyCode", {
        verificationCode: verificationCode,
        }
      );

      if (response.data === "인증 성공") {
        setVcSuccess(true);
      } else {
        alert("인증 실패");
        return;
      }

      const changeInfoResponse  = await chgInfo();
      // 응답 처리
      alert(changeInfoResponse.data)
      props.onHide();
    } catch (error) {
      console.error("Error changing member info:", error);
      // 에러 처리 로직 추가
      alert("회원정보 변경 실패");
    }
  }

  const handleCancel = () => {
    setVerificationCode("");
    setVcSuccess(null);
    props.onHide();
  };

  // 이메일로 인증 코드를 보내는 함수
  const sendVerificationCode = async () => {
    try {
      const response = await axios.post("http://localhost:8081/signup/sendMail", {
          email: memberInfo.email,
        }
      );

      // 응답 로그를 출력하고 코드를 상태에 저장합니다.
      console.log(response);
      setCodeFromEmail(response.data);
    } catch (error) {
      // 오류 처리
      console.error("이메일 전송 에러:", error);
      alert("인증번호 전송 실패");
    }
  };

  // 인증번호 발송 버튼 
  const handleSendVC = async () => {
    try {
      await sendVerificationCode();
      setVcSuccess(null); // 인증번호 재발송 시 초기화
      alert("인증번호가 발송되었습니다.");
    } catch (error) {
      console.error("인증번호 발송 에러:", error);
      return;
    }
  }

  // 휴대폰번호 입력 형식
  const formatPhoneNumber = (inputNumber) => {
    // 숫자만 추출하여 "-" 추가
    return inputNumber.replace(/\D/g, "").replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered className="changeInfo"
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
                onChange={(e) => {
                  const formattedNumber = formatPhoneNumber(e.target.value);
                  setMemberInfo({ ...memberInfo, phoneNum: formattedNumber });
                }}
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
                <Button onClick={handleSendVC}>인증번호 발송</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="chgEmailVC">인증번호 확인</Form.Label>
              <Form.Control
                type="text"
                id="chgEmailVC" name="vc"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) =>{
                  setVerificationCode(e.target.value)
                }}
              />
            {vcSuccess && (
              <div className="success">
                인증에 성공했습니다.
              </div>
            )}
            {!vcValid && (
              <div className="error">
                * 인증번호가 일치하지 않습니다.
              </div>
            )}
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>취소</Button>
        <Button variant="primary" onClick={handleInfoChange}>
            변경
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangeInfo;