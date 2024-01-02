import axios from "axios";
import "../../styles/Member.scss";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id:'', password:'', confirmPassword: '', name:'', phoneNum:'', email:''
  });
  const [errorMsg, setErrorMsg] = useState({
    id:'', password:'', confirmPassword: '', name:'', phoneNum:'', email:''
  });

  const handleBlur = (fieldName) => {
    // 각 필드에 대한 유효성 검사 로직을 수행
    switch (fieldName) {
      // ID 글자수 및 영문, 숫자 포함 여부
      case "id":
        const idRegex = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/;
        if (formData.id.length < 5 || !idRegex.test(formData.id)) {
          setErrorMsg({
            ...errorMsg,
            id: "ID는 5글자 이상이어야 하며, 영문과 숫자를 모두 포함해야 합니다.",
          });
        } else {
          setErrorMsg({ ...errorMsg, id: "" });
        }
        break;
      // 비밀번호 글자수
      case "password":
        if (formData.password.length < 8) {
          setErrorMsg({
            ...errorMsg,
            password: "비밀번호는 최소 8자 이상이어야 합니다.",
          });
        } else {
          setErrorMsg({ ...errorMsg, password: "" });
        }
        break;
      // 비밀번호 일치확인
      case "confirmPassword":
        if (formData.password !== formData.confirmPassword) {
          setErrorMsg({
            ...errorMsg,
            confirmPassword: "비밀번호가 일치하지 않습니다.",
          });
        } else {
          setErrorMsg({ ...errorMsg, confirmPassword: "" });
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    // id 중복확인
    // 나머지 필드에 대한 유효성 검사
    Object.keys(formData).forEach((fieldName) => {
      switch (fieldName) {
        case "id":
          const idRegex = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/;
          if (formData.id.length < 5 || !idRegex.test(formData.id)) {
            setErrorMsg({
              ...errorMsg,
              id: "ID는 5글자 이상이어야 하며, 영문과 숫자를 모두 포함해야 합니다.",
            });
            hasError = true;
          }
          break;

        case "password":
          if (formData[fieldName].length < 8) {
            setErrorMsg({
              ...errorMsg,
              password: "비밀번호는 최소 8자 이상이어야 합니다.",
            });
            hasError = true;
          }
          break;

        case "confirmPassword":
          if (formData.password !== formData.confirmPassword) {
            setErrorMsg({
              ...errorMsg,
              confirmPassword: "비밀번호가 일치하지 않습니다.",
            });
            hasError = true;
          }
          break;

        default:
          break;
      }
    });

    if (hasError) {
      // 유효성 검사에서 에러가 발생한 경우에는 회원가입 요청을 보내지 않음
      return;
    }

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
    setErrorMsg({ ...errorMsg, [e.target.name]: "" });
  }

  const formatPhoneNumber = (inputNumber) => {
    // 숫자만 추출하여 "-" 추가
    return inputNumber.replace(/\D/g, "").replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

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
                  name="id" onBlur={() => handleBlur("id")}
                  onChange={handleChange} value={formData.id}
                  isInvalid={!!errorMsg.id}
                />
                <Button>중복확인</Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errorMsg.id}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPW">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPW" required 
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your Password"
                name="password" onBlur={() => handleBlur("password")}
                onChange={handleChange} value={formData.password}
                isInvalid={!!errorMsg.password}
              />
              <Form.Control.Feedback type="invalid">
                {errorMsg.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPW2">Password Confirm</Form.Label>
              <Form.Control
                type="password"
                id="inputPW2" required 
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your Password"
                name="confirmPassword" onBlur={() => handleBlur("confirmPassword")}
                onChange={handleChange} value={formData.confirmPassword}
                isInvalid={!!errorMsg.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errorMsg.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputName">Name</Form.Label>
              <Form.Control
                type="text"
                id="inputName" required 
                placeholder="Enter your Name"
                name="name" onBlur={() => handleBlur("name")}
                onChange={handleChange} value={formData.name}
                isInvalid={!!errorMsg.name}
              />
              <Form.Control.Feedback type="invalid">
                {errorMsg.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPH">Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="inputPH" required 
                placeholder="Enter your Phone Number"
                name="phoneNum" onBlur={() => handleBlur("phoneNum")}
                onChange={(e) => {
                  const formattedNumber = formatPhoneNumber(e.target.value);
                  setFormData({ ...formData, phoneNum: formattedNumber });
                  setErrorMsg({ ...errorMsg, phoneNum: "" });
                }}
                value={formData.phoneNum}
                isInvalid={!!errorMsg.phoneNum}
              />
              <Form.Control.Feedback type="invalid">
                {errorMsg.phoneNum}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputEmail">Email Address</Form.Label>
              <InputGroup>
                <Form.Control
                  id="inputEmail" required 
                  placeholder="Enter your Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="email" onBlur={() => handleBlur("email")}
                  onChange={handleChange} value={formData.email}
                  isInvalid={!!errorMsg.email}
                />
                <Form.Control.Feedback type="invalid">
                {errorMsg.email}
              </Form.Control.Feedback>
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
