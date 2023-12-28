import axios from "axios";
import "../../styles/Member.scss";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id:'', password:'', name:'', phoneNum:'', email:''
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/signup", formData)
      if(response.status === 200) {
        alert("회원 가입 완료");
        navigate("/login")
      } else {
        alert("회원가입 실패")
      }
    } catch (error) {
      alert("회원가입 실패")
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  return (
    <div className="signup">
      <div className="loginform">
        <div className="inside">
          <h3 className="title">Sign Up</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputID">ID</Form.Label>
              <InputGroup>
                <Form.Control
                  id="inputID" required 
                  placeholder="Enter your ID"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="id"
                  onChange={handleChange} value={formData.id}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid id.
                </Form.Control.Feedback>
                <Button>중복확인</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPW">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPW" required 
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your Password"
                name="password"
                onChange={handleChange} value={formData.password}
              />
              
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPW2">Password Confirm</Form.Label>
              <Form.Control
                type="password"
                id="inputPW2" required 
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your Password"
              />
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputName">Name</Form.Label>
              <Form.Control
                type="text"
                id="inputName" required 
                placeholder="Enter your Name"
                name="name"
                onChange={handleChange} value={formData.name}
              />
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPH">Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="inputPH" required 
                placeholder="Enter your Phone Number"
                name="phoneNum"
                onChange={handleChange} value={formData.phoneNum}
              />
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputEmail">Email Address</Form.Label>
              <InputGroup>
                <Form.Control
                  id="inputEmail" required 
                  placeholder="Enter your Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="email"
                  onChange={handleChange} value={formData.email}
                />
                <Button>인증번호 발송</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputVC">인증번호</Form.Label>
              <Form.Control
                type="text"
                id="inputVC" required 
                placeholder="Enter verification code"
              />
            </Form.Group>
            <Form.Check // prettier-ignore
              type="checkbox"
              id="keep-status" required 
              label="개인정보 수집 및 정보이용에 동의합니다."
              className="grp chk"
            />
            <div className="d-grid">
              <Button variant="secondary" type="submit">Sign Up</Button>
            </div>
          </Form>
          <hr />
          <div className="otherlogin">
            <div className="google">
              <div className="g-icon">
                <img src="../../assets/member/google.png" alt="" />
              </div>
              Sign with Google
            </div>
            <div className="kakao">
              <div className="k-icon">
                <img src="../../assets/member/kakao.png" alt="" />
              </div>
              Sign with Kakao
            </div>
          </div>
          <div className="help">
            <h4>
              Have an account? <a href="/login"><span>Login</span></a>
            </h4>
          </div>
        </div>
      </div>
      <div className="bgimage d-none d-lg-block"></div>
    </div>
  );
}

export default Signup;
