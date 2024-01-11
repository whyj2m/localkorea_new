import { useNavigate } from "react-router-dom";
import { googleLogin, postLogin } from "../../api/MemberApi";
import "../../styles/Member.scss";
import { Form, Button } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userId = data.get("id");
    const password = data.get("password");

    try {
      await postLogin({id:userId, password:password})
      // 로그인 성공 시 메인 페이지로 이동
      // navigate("/");
      window.location.href="/"
    } catch (error) {
      if (error.response && error.response.data.message === "Incorrect password.") {
      
      } else {
      
      }
    }
  }

  return (
    <div className="login">
      <div className="loginform">
        <div className="inside">
          <h3 className="title">Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputID">ID</Form.Label>
              <Form.Control
                type="text" required
                id="inputID" name="id"
                aria-describedby="idHelpBlock"
                placeholder="Enter your ID"
              />
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPW">Password</Form.Label>
              <Form.Control
                type="password" required
                id="inputPW" name="password"
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your Password"
              />
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="30일 동안 로그인 상태 유지"
              className="grp chk"
            />
            <div className="d-grid">
              <Button type="submit">로그인</Button>
            </div>
          </Form>
          <hr />
          <div className="otherlogin">
            <a href="http://localhost:8081/oauth2/authorization/google" onClick={googleLogin}>
              <div className="google">
                <div className="g-icon">
                  <img src="../../assets/member/google.png" alt="" />
                </div>
                Sign with Google
              </div>
            </a>
            <div className="kakao">
              <div className="k-icon">
                <img src="../../assets/member/kakao.png" alt="" />
              </div>
              Sign with Kakao
            </div>
          </div>
          <div className="help">
            <h4>
              Don't have an account?{" "}
              <a href="/signup">
                <span>Sign Up</span>
              </a>
            </h4>
            <h4>
              Forgot{" "}
              <span>
                <a href="#!">ID</a> / <a href="#!">Password</a>
              </span>
            </h4>
          </div>
        </div>
      </div>
      <div className="bgimage d-none d-lg-block"></div>
    </div>
  );
}

export default Login;