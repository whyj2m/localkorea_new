import "../../styles/Member.scss";
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getMember } from "../../api/MemberApi";

function Unregister() {
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
    });
    
    const fetchUserInfo = async () => {
        try {
          const response = await getMember();
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
      fetchUserInfo();
    }, []);

    return (
        <Container className="mypage">
        <h2 className="title">새하마노 방방곡곡 회원 탈퇴</h2>
        <div className="d-block">
            <div className="content">
            <div className="profile d-flex">
                <div className="inside">
                <div className="greeting mb-3">
                    {userInfo.name}({userInfo.id})님 환영합니다!
                </div>
                </div>
            </div>
            </div>
        </div>
        </Container>
    );
}

export default Unregister;