import axios from "axios";
import "../../styles/Member.scss";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// ID 유효성 검사 함수 (전역 선언)
const validateId = (id) => {
  const idRegex = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/;
  return id.length >= 5 && idRegex.test(id);
};

function Signup() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 409) {
        // 중복 확인 에러 처리
        setErrorMsg({ ...errorMsg, id: "이미 존재하는 ID입니다." });
      }
      return Promise.reject(error);
    }
  );
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id:'', password:'', confirmPassword: '', name:'', phoneNum:'', email:'', vc:''
  });
  const [errorMsg, setErrorMsg] = useState({
    id:'', password:'', confirmPassword: '', name:'', phoneNum:'', email:'', vc:''
  });
  // 인증코드 상태
  const [vc, setVc] = useState("");
  // 이메일로 발송된 코드
  const [codeFromEmail, setCodeFromEmail] = useState("");

  // id 중복확인
  const [duplicateError, setDuplicateError] = useState("");
  const handleCheckDuplicate = async () => {
    try {
      const response = await axios.post("http://localhost:8081/signup/checkId", { id: formData.id });
  
      if (response.data) {
        // 이미 존재하는 ID
        setDuplicateError("이미 존재하는 ID입니다.");
        setErrorMsg({ ...errorMsg, id: "" });
      } else {
        // 사용 가능한 ID
        setDuplicateError("");
        setErrorMsg({ ...errorMsg, id: "사용 가능한 ID입니다." });
      }
    } catch (error) {
      console.error("중복 확인 에러:", error);
      if (error.response && error.response.status === 409) {
        // 이미 존재하는 ID
        setDuplicateError("이미 존재하는 ID입니다.");
      } else {
        setDuplicateError("중복 확인 중 오류가 발생했습니다.");
      }
    }
  };

  // 각 필드에 대한 유효성 검사 로직을 수행
  const validateField = (fieldName) => {
    switch (fieldName) {
      case "id":
        setErrorMsg({
          ...errorMsg,
          id: validateId(formData.id)
            ? ""
            : "ID는 5글자 이상이어야 하며, 영문과 숫자를 모두 포함해야 합니다."
        });
        break;

      case "password":
        setErrorMsg({
          ...errorMsg,
          password:
            formData.password.length >= 8
              ? ""
              : "비밀번호는 최소 8자 이상이어야 합니다."
        });
        break;

      case "confirmPassword":
        setErrorMsg({
          ...errorMsg,
          confirmPassword:
            formData.password === formData.confirmPassword
              ? ""
              : "비밀번호가 일치하지 않습니다."
        });
        break;

      case "vc":
        setErrorMsg({
          ...errorMsg,
          vc:
            formData.vc === codeFromEmail
              ? ""
              : "인증번호가 일치하지 않습니다."
        });
        break;

      default:
        break;
    }
  };

  const handleBlur = (fieldName) => {
    validateField(fieldName);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
    setErrorMsg({ ...errorMsg, [e.target.name]: "" });
  }

  const formatPhoneNumber = (inputNumber) => {
    // 숫자만 추출하여 "-" 추가
    return inputNumber.replace(/\D/g, "").replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 인증번호 검증
    try {
      await sendEmail(); // sendEmail 함수를 호출하여 codeFromEmail 값을 업데이트
      if (vc !== codeFromEmail) {
        alert("인증번호가 일치하지 않습니다.");
        return;
      }
    } catch (error) {
      console.error("이메일 전송 에러:", error);
      return;
    }

    // 중복 확인
    try {
      await handleCheckDuplicate();
  
      if (duplicateError) {
        setErrorMsg({ ...errorMsg, id: duplicateError });
        return;
      }
    } catch (error) {
      console.error("중복 확인 에러:", error);
    }

    // 나머지 유효성 검사
    let hasError = false;
    Object.keys(formData).forEach((fieldName) => {
      validateField(fieldName);
      if (errorMsg[fieldName] !== "") {
        hasError = true;
      }
    });

    if (hasError) {
      // 유효성 검사에서 에러가 발생한 경우에는 회원가입 요청을 보내지 않음
      return;
    }

    // 회원가입 요청
    try {
      const signupResponse = await axios.post("http://localhost:8081/signup", formData);

      if (signupResponse.status === 200) {
        alert("회원 가입 완료");
        navigate("/login");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      // 회원가입 에러 처리
      alert("회원가입 실패");
    }
  };

  // 이메일 발송 함수
  const sendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8081/signup/sendMail", {
        email: formData.email,
      });
  
      // 확인: 서버 응답 로그
      console.log(response);
      // 이메일로부터 받은 코드를 상태에 저장
      setCodeFromEmail(response.data);
    } catch (error) {
      // 오류 처리
      console.error("이메일 전송 에러 : ", error);
      throw error;
    }
  }
  
  // 인증번호 발송 버튼 
  const handleSendVC = async () => {
    try {
      await sendEmail();
      alert("인증번호가 발송되었습니다.");
    } catch (error) {
      console.error("인증번호 발송 에러:", error);
    }
  }
  useEffect(() => {
    console.log("Code from Email:", codeFromEmail);
  }, [codeFromEmail]);

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
                <Button type="button" onClick={handleCheckDuplicate}>중복확인</Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errorMsg.id}
                {duplicateError}
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
                <Button onClick={handleSendVC}>인증번호 발송</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputVC">인증번호</Form.Label>
              <Form.Control
                type="text"
                id="inputVC" required 
                placeholder="Enter verification code"
                name="vc" onBlur={() => handleBlur("vc")}
                onChange={handleChange} value={formData.vc}
                isInvalid={!!errorMsg.vc}
              />
              <Form.Control.Feedback type="invalid">
                {errorMsg.vc}
              </Form.Control.Feedback>
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