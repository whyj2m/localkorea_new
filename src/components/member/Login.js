import { postLogin } from "../../api/MemberApi";
import "../../styles/Member.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userId = data.get("id");
    const password = data.get("password");

    postLogin({id:userId, password:password})
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
                type="id"
                id="inputID" name="id"
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your ID"
              />
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPW">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPW" name="password"
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your Password"
              />
            </Form.Group>
            <Form.Check // prettier-ignore
              type="checkbox"
              id="keep-status"
              label="Remember for 30 days"
              className="grp chk"
            />
            <div className="d-grid">
              <Button variant="secondary" type="submit">Login</Button>
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
