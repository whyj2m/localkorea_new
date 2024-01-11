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
import { FaRegCommentDots } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import axios from "axios";
import { getMember } from "../../api/MemberApi";

function Mypage() {
  const [comp, setComp] = useState(BoardList);
  const [showModalCP, setShowModalCP] = useState(false);
  const [showModalCI, setShowModalCI] = useState(false);
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
  }, [showModalCI]);

  // 페이지 처음 로딩될 때 사용자 정보를 가져옴
  useEffect(() => {
    const fetchInitialUserInfo = async () => {
      try {
        const response = await getMember();
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching initial user info:", error);
      }
    };

    fetchInitialUserInfo();
  }, []); // 빈 의존성 배열을 사용하여 페이지가 처음 렌더링 될 때만 호출

  return (
    <Container className="mypage">
      <h2 className="title">마이페이지</h2>
      <div className="d-block d-lg-flex">
        <div className="tab d-lg-block d-flex col-lg-3 mb-5">
          <div className="board tab_inner" onClick={() => setComp(BoardList)}>
            <div className="icon d-lg-none">
              <BsFileRichtext />
            </div>
            게시글
          </div>
          <hr className="d-none d-lg-block" />
          <div className="reply tab_inner" onClick={() => setComp(ReplyList)}>
            <div className="icon d-lg-none">
              <FaRegCommentDots />
            </div>
            댓글
          </div>
          <hr className="d-none d-lg-block" />
          <div className="like tab_inner" onClick={() => setComp(LikeList)}>
            <div className="icon d-lg-none">
              <FaHeart />
            </div>
            좋아요
          </div>
        </div>
        <div className="content col-lg-9">
          <div className="profile d-flex">
            <div className="circle">
              <IoPerson />
            </div>
            <div className="inside">
              <div className="greeting mb-3">
                {userInfo.name}({userInfo.id})님 환영합니다!
              </div>
              <div className="menu">
                <Button
                  onClick={() => {
                    setShowModalCP(true);
                  }}
                >
                  비밀번호 변경
                </Button>
                <Button
                  onClick={() => {
                    setShowModalCI(true);
                  }}
                >
                  회원정보 변경
                </Button>
              </div>
            </div>
          </div>
          <hr />
          <div className="myrecord">
            <div children={comp} />
          </div>
        </div>
      </div>
      <ChangePw show={showModalCP} onHide={() => setShowModalCP(false)} />
      <ChangeInfo show={showModalCI} onHide={() => setShowModalCI(false)} />
    </Container>
  );
}

export default Mypage;
