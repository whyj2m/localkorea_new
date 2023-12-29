import axios from "axios";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";

const userId = "test3";

function ChangePw(props) {

  const handlePasswordChange = async () => {
    try {
      const currentPassword = document.getElementById("prevPW").value;
      const password = document.getElementById("chgPW").value;
      const confirmPassword = document.getElementById("chkPW").value;

      // 값이 비어있는지 확인하고 빈 값이라면 오류 처리
      if (!currentPassword || !password || !confirmPassword) {
        throw new Error("비밀번호를 모두 입력하세요.");
      }

      // 새로운 비밀번호와 확인 비밀번호가 일치하는지 확인
      if (password !== confirmPassword) {
        throw new Error("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      }

      const response = await axios.put(`http://localhost:8081/mypage/${userId}/editPw`, {
        currentPassword,
        password,
      })

      // 응답 처리
      alert(response.data)
      props.onHide();
    } catch (error) {
      console.error("Error changing password:", error);
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
          비밀번호 변경
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="prevPW">기존 비밀번호</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  id="prevPW"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Enter your Password"
                />
                <Button>비밀번호 확인</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="chgPW">변경할 비밀번호</Form.Label>
              <Form.Control
                type="password"
                id="chgPW"
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="chkPW">비밀번호 다시 입력</Form.Label>
              <Form.Control
                type="password"
                id="chkPW"
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your Password"
              />
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>취소</Button>
        <Button variant="primary" onClick={handlePasswordChange}>변경</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePw;