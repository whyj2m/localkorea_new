import { Form, Button, Modal, InputGroup } from "react-bootstrap";

function ChangeInfo(props) {

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
                value="변경전 이름 불러오기"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="chgPH">Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="chgPH"
                placeholder="변경할 휴대폰번호를 입력하세요."
                value="010-3333-3222"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputEmail">Email Address</Form.Label>
              <InputGroup>
                <Form.Control
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
        <Button variant="primary" onClick={props.onHide}>
            변경
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangeInfo;