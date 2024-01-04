import { Link, useLocation } from "react-router-dom";
import "../../styles/Footer.css";

import { LuExternalLink } from "react-icons/lu";

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
            <strong className="tit_service_name">새하마노 방방곡곡</strong>
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
          <li style={{ width: "150px", paddingLeft: "50px" }}>
            <ul className="list_service">
              <li className="list_service_item">
                <Link as={Link} to="/local/1">
                  <span> 지역 </span>
                  <LuExternalLink />
                </Link>
              </li>
              <li className="list_service_item">
                <Link as={Link} to="/place/1">
                  <span> 관광지 </span>
                  <LuExternalLink />
                </Link>
              </li>
              <li className="list_service_item">
                <Link as={Link} to="/festival/1">
                  <span> 축제 </span>
                  <LuExternalLink />
                </Link>
              </li>
              <li className="list_service_item">
                <Link as={Link} to="/localFoods/1">
                  <span> 특산물 </span>
                  <LuExternalLink />
                </Link>
              </li>
              <li className="list_service_item">
                <Link as={Link} to="/board/company">
                  <span> 게시판 </span>
                  <LuExternalLink />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="info">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a href="#">
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