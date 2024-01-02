import { Link, useLocation } from "react-router-dom";
import "../../styles/Footer.css";

import { LuExternalLink } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
function Footer() {
  const location = useLocation();
  // 특정 페이지 일때에 헤더를 숨기는 조건을 확인하는 함수 ( 로그인,회원가입 사용)
  const isFooterHidden = () => {
    return location.pathname === "/login" || location.pathname === "/signup";
  };
  // 헤더가 보이는지 여부를 결정하는 함수
  const getFooterVisibility = () => {
    return isFooterHidden() ? "hidden" : "";
  };
  return (
    <div className={`footer ${getFooterVisibility()}`}>
      <div className="wrap-footer">
        <hr />
        <div className="service">
          <h2 className="screen-out">하단 메뉴</h2>
          <ul className="inner-service">
            <li className="wrap-service">
              <strong className="tit_service_name"> <img
                src="/assets/etc/logo.png"
                style={{ width: "120px", height: "100%" }}
              /></strong>
              <ul className="list_service">
                <li className="list_service_item">
                  <a href="#"> 대표자 : 백혜윤 백승현 윤주민</a>
                </li>
                <li className="list_service_item">
                  <a href="#">
                    주소 : 서울 구로구 디지털로 306 대륭포스트타워 2차 206호
                  </a>
                </li>
                <li className="list_service_item">
                  <a href="#">
                    운영시간 : 09:30 ~ 18:20 (점심시간: 13:20 ~ 14:30)
                  </a>
                </li>
              </ul>
            </li>
            <li className="wrap-service2" style={{ width: "170px" }}>
              <strong className="tit_service">
                <a href="#">고객센터</a>
              </strong>
              <ul className="list_service">
                <li className="list_service_item">
                  <a href="#">
                    방방곡곡 고객센터<span></span>
                    <LuExternalLink />
                  </a>
                </li>
              </ul>
            </li>
            <li
              className="wrap-service3"
              style={{ width: "150px", paddingLeft: "50px" }}
            >
              <li className="list_service_item">
                <Link as={Link} to="/local/1">
                  {" "}
                  <span> 지역 </span>
                  <LuExternalLink />
                </Link>
              </li>
              <li className="list_service_item">
                <Link as={Link} to="/place/1">
                  {" "}
                  <span> 관광지 </span>
                  <LuExternalLink />
                </Link>
              </li>
              <li className="list_service_item">
                <Link as={Link} to="/festival/1">
                  {" "}
                  <span> 축제 </span>
                  <LuExternalLink />
                </Link>
              </li>
              <li className="list_service_item">
                <Link as={Link} to="/localFoods/1">
                  {" "}
                  <span> 특산물 </span>
                  <LuExternalLink />
                </Link>
              </li>
              <li className="list_service_item">
                <Link as={Link} to="/board/company">
                  {" "}
                  <span> 게시판 </span>
                  <LuExternalLink />
                </Link>
              </li>
            </li>
          </ul>
        </div>
        <div className="info">
          {/* <div className="info-relation-container clearfix">
            <div className="inner-info">
              <ul className="clearfix">
                <li className="wrap-info">
                  <strong className="tit_info">
                    <a
                      href="https://korean.visitkorea.or.kr/main/main.do"
                      target="_blank"
                    >
                      대한민국 구석구석
                    </a>
                  </strong>
                </li>
                <li className="wrap-info">
                  <strong className="tit_info">
                    <a
                      href="https://english.visitkorea.or.kr/svc/main/index.do"
                      target="_blank"
                    >
                      VisitKorea
                    </a>
                  </strong>
                </li>
                <li className="wrap-info">
                  <strong className="tit_info">
                    <a href="https://www.durunubi.kr/" target="_blank">
                      두루누비
                    </a>
                  </strong>
                </li>
                <li className="wrap-info">
                  <strong className="tit_info">
                    <a
                      href="https://safestay.visitkorea.or.kr/usr/main/mainSelectList.kto"
                      target="_blank"
                    >
                      SafeStay
                    </a>
                  </strong>
                </li>
                <li className="wrap-info">
                  <strong className="tit_info">
                    <a
                      href="https://access.visitkorea.or.kr/main/main.do"
                      target="_blank"
                    >
                      열린관광
                    </a>
                  </strong>
                </li>
                <li className="wrap-info">
                  <strong className="tit_info">
                    <a
                      href="https://www.odii.kr/smarttour_web/iframe"
                      target="_blank"
                    >
                      Odii
                    </a>
                  </strong>
                </li>
                <li className="wrap-info">
                  <strong className="tit_info">
                    <a href="https://gocamping.or.kr/" target="_blank">
                      GoCamping
                    </a>
                  </strong>
                </li>
                <li className="wrap-info">
                  <strong className="tit_info">
                    <a href="http://hikr.visitkorea.or.kr/" target="_blank">
                      Hikr Ground
                    </a>
                  </strong>
                </li>
              </ul>
            </div>
            <div className="inner-relation">
              <div className="tit_relation">
                <a href="#">
                  <FaArrowUp style={{ fontSize: "25px" }} />
                </a>
              </div>
              <ul className="wrap-relation">
                <li className="list_relation">
                  <a href="#">
                    카카오 AI
                    <span></span>
                    <LuExternalLink />
                  </a>
                </li>
                <li className="list_relation">
                  <a href="#">
                    카카오 프라이버시
                    <span></span>
                    <LuExternalLink />
                  </a>
                </li>
                <li className="list_relation">
                  <a href="#">
                    카카오 디벨로퍼스
                    <span></span>
                    <LuExternalLink />
                  </a>
                </li>
                <li className="list_relation">
                  <a href="#">
                    다음 포털 사이트
                    <span></span>
                    <LuExternalLink />
                  </a>
                </li>
                <li className="list_relation">
                  <a href="#">
                    동반 성장 사이트
                    <span></span>
                    <LuExternalLink />
                  </a>
                </li>
                <li className="list_relation">
                  <a href="#">
                    제주 with kakao
                    <span></span>
                    <LuExternalLink />
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <a href="#">
              {/* <FaArrowUp style={{ fontSize: "25px" }} /> */}
              <img src="/assets/etc/ico_arrow_top.png" className="arrow_icon" />
            </a>
          </div>
          <small className="txt_copyright">
            © <a href="/">localkorea Corp.</a> All rights reserved.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Footer;
