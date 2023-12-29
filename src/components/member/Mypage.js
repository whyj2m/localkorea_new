import "../../styles/Member.scss";
import { Container, Button, Pagination } from "react-bootstrap";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";
import BoardList from "./record/BoardList";
import ReplyList from "./record/ReplyList";
import LikeList from "./record/LikeList";
import ChangePw from "./modal/ChangePw";
import ChangeInfo from "./modal/ChangeInfo";
import { BsFileRichtext } from "react-icons/bs";

import axios from "axios";

const userId = "test3";

function Mypage() {
  const [comp, setComp] = useState(BoardList);
  const [showModalCP, setShowModalCP] = useState(false);
  const [showModalCI, setShowModalCI] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id:"", name:""
  });

  useEffect(()=> {
    async function fetchUserInfo() {
      try {
        const response = await axios.get(`http://localhost:8081/mypage/${userId}`)
        setUserInfo(response.data)
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <Container className="mypage">
      <h2 className="title">마이페이지</h2>
      <div className="d-block d-lg-flex">
        <div className="tab d-lg-block d-flex col-lg-3 mb-5">
          <div className="board" onClick={() => setComp(BoardList)}>
          <BsFileRichtext />게시글
          </div>
          <hr className="d-none d-lg-block" />
          <div className="reply" onClick={() => setComp(ReplyList)}>
            댓글
          </div>
          <hr className="d-none d-lg-block" />
          <div className="like" onClick={() => setComp(LikeList)}>좋아요</div>
        </div>
        <div className="content col-lg-9">
          <div className="profile d-flex">
            <div className="circle">
              <IoPerson />
            </div>
            <div className="inside">
              <div className="greeting mb-3">{userInfo.name}({userInfo.id})님 환영합니다!</div>
              <div className="menu">
                <Button onClick={()=>{setShowModalCP(true)}}>비밀번호 변경</Button>
                <Button onClick={()=>{setShowModalCI(true)}}>회원정보 변경</Button>
              </div>
            </div>
          </div>
          <hr />
          <div className="myrecord">
            <div children={comp} />
          </div>
        </div>
      </div>
      <ChangePw
        show={showModalCP}
        onHide={() => setShowModalCP(false)}
      />
      <ChangeInfo show={showModalCI}
        onHide={() => setShowModalCI(false)}/>
    </Container>
  );
}

export default Mypage;
