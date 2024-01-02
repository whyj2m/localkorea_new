import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../styles/Header.css";

import { FaSearch } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import { getWeatherData } from "../../api/Weather";
import { useEffect, useState } from "react";

// 라우터  uselocation으로  경로에 따른 색상변경, usenavigate로 경로를 설정 Navdropdown< 원래 페이지이동 불가
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();

  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);

  // 스크롤링 이벤트 처리
  const [logoImage, setLogoImage] = useState("logonew.png");

  const handleMouseOverBoardDropdown = () => {
    setShowBoardDropdown(true);
  };
  const handleMouseOutBoardDropdown = () => {
    setShowBoardDropdown(false);
  };

  // 특정 페이지 일때에 헤더를 숨기는 조건을 확인하는 함수 ( 로그인,회원가입 사용)
  const isHeaderHidden = () => {
    return location.pathname === "/login" || location.pathname === "/signup";
  };
  // 헤더가 보이는지 여부를 결정하는 함수
  const getHeaderVisibility = () => {
    return isHeaderHidden() ? "hidden" : "";
  };

  // Y축 스크롤 상태에 따라서 스타일 변하는 함수
  const [scrolling, setScrolling] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 550) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 스크롤에 따라 로고 이미지 변경
  useEffect(() => {
    setLogoImage(scrolling ? "logo.png" : "logonew.png");
  }, [scrolling]);

  // 마우스 호버 상태에 따라 로고 이미지 변경
  const handleMouseOver = () => {
    setLogoImage("logo.png");
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setLogoImage("logonew.png");
    setIsHovering(false);
  };

  // 현재 경로에 따라 스크롤링을 하면 색상이 변하는 함수 (메인페이지사용) 스크롤 이벤트도
  const getHeaderColor = () => {
    if (location.pathname === "/") {
      return scrolling ? "header-dark" : "";
    } else {
      return "header-dark";
    }
  };

  //  날씨 데이터 받아오는 함수
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherInfo(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <div
      className={`header-main-all ${getHeaderColor()} ${
        isHovering ? "hovered" : ""
      } ${getHeaderVisibility()}`}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <div className={`header-top ${getHeaderColor()} `}>
        {weatherInfo && (
          <div className={`weather-info ${isHovering ? "hovered" : ""}`}>
            <img
              src={weatherInfo.icon}
              alt="Weather Icon"
              style={{ height: "80px", zIndex: "1" }}
            />
            <p>{weatherInfo.temp}°C</p>
            <p>{weatherInfo.name}</p>
            <p>{weatherInfo.currentDate}</p>
          </div>
        )}
      </div>

      <Navbar
        collapseOnSelect
        expand="lg"
        className={`header-main ${getHeaderColor()} ${
          isHovering ? "hovered" : ""
        }`}
      >
        <Navbar.Brand as={Link} to="/" className="header-logo">
          <img
            src={`/assets/etc/${logoImage}`}
            style={{ width: "120px", height: "100%" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          id="mobile-toggle"
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ justifyContent: "space-around" }}
        >
          <Nav className="header-category">
            <Nav.Link as={Link} to="/local/1">
              지역
            </Nav.Link>
            <Nav.Link as={Link} to="/place/1">
              관광지
            </Nav.Link>
            <Nav.Link as={Link} to="/festival/1">
              축제
            </Nav.Link>
            <Nav.Link as={Link} to="/localFoods/1">
              특산물
            </Nav.Link>
            <NavDropdown
              title="게시판"
              id="board-dropdown"
              className={"dropdown"}
              show={showBoardDropdown}
              onMouseEnter={handleMouseOverBoardDropdown}
              onMouseLeave={handleMouseOutBoardDropdown}
            >
              <NavDropdown.Item as={Link} to="/board/tourisSpot">
                관광지 추천
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/board/company">
                여행 메이트
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/board/notice">
                공지사항
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <div className="header-main-icon">
          <Nav as={Link} to="/mypage">
            <IoPeople />
          </Nav>
          <FaHeart style={{ margin: "0 20px" }} />
          <Nav as={Link} to="/search/whole">
            <FaSearch />
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
