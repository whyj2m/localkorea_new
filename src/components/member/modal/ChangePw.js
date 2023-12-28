import { Form, Button, Modal, InputGroup } from "react-bootstrap";

function ChangePw(props) {

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
        <Button variant="primary" onClick={props.onHide}>변경</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePw;