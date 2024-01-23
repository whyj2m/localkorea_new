import axios from "axios";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { useState } from "react";

function Withdrawal(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleModalClose = () => {
        // 모달이 닫힐 때 상태값 초기화
        setId("");
        setPassword("");
        props.onHide();
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered className="findId"
            backdrop="static"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            회원 탈퇴
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            회원 탈퇴를 위해 사용자 정보를 확인합니다.
            <hr className="modalHr"/>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label htmlFor="chgPW">아이디</Form.Label>
                <Form.Control
                    type="text"
                    id="id"
                    placeholder="아이디를 입력해주세요."
                    value={id}
                    onChange={(e)=>setId(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label htmlFor="prevPW">비밀번호</Form.Label>
                <InputGroup>
                    <Form.Control
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </InputGroup>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>취소</Button>
            <Button className="modify_btn" onClick={handleModalClose}>탈퇴하기</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default Withdrawal;