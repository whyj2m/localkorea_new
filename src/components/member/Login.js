import "../../styles/Member.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Login() {
  return (
    <div className="login">
      <div className="loginform">
        <div className="inside">
          <h3 className="title">Login</h3>
          <Form>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputID">ID</Form.Label>
              <Form.Control
                type="id"
                id="inputID"
                aria-describedby="passwordHelpBlock"
                placeholder="Enter your ID"
              />
            </Form.Group>
            <Form.Group className="grp">
              <Form.Label htmlFor="inputPW">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPW"
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
              <Button variant="secondary">Login</Button>
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
