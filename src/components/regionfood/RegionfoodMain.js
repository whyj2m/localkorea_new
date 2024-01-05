// API 함수호출
import { useEffect, useState } from "react";
import { getLocalFood, getLocalFoods } from "../../api/LocalFoodsApi";

import "../../styles/regionfood/RegionfoodMain.css";
import { Pagination } from "react-bootstrap";

//  스와이퍼 부분
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Location2 from "../common/Location2";
import { useParams } from "react-router-dom";
import { getLocation } from "../../api/locationApi";

function RegionfoodRandom({ localFoods, localNo, slidesPerView }) {
  return (
    <Swiper
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        backgroundColor: "white",
        paddingTop: "50px",
      }}
      modules={[Autoplay]} // Autoplay와 Navigation 모듈 추가
      spaceBetween={30}
      slidesPerView={slidesPerView}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {localFoods.map((food, index) => (
        <SwiperSlide key={index}>
          <div className="regionfood-slider-item">
            <img
              src={`/assets/regionfood/${localNo}/${index + 1}.jpg`}
              alt={food.name}
            />
            <div className="regionfood-slider-text">
              <strong>{food.name}</strong>
              <p>{food.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function RegionfoodMain() {
  const { localNo } = useParams();
  const [localFoods, setLocalFoods] = useState([]);
  const [localName, setLocalName] = useState(""); // 현재 지역 이름을 나타내는 상태

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 한 페이지당 보여질 아이템 수

  // width값에 따라 슬라이더 몇개 보여줄지 정하는 코드
  const [slidesPerView, setSlidesPerView] = useState(calculateSlidesPerView);
  // 로컬넘버 체크
  console.log("localNo:", localNo);

  const handleCategoryClick = async (localNo) => {
    console.log(`localfoods에서 ${localNo} 카테고리 클릭`);
    try {
      if (localNo === "all") {
        // const allFoodsResponse = await getLocalFoods();
        // setLocalFoods(allFoodsResponse.data);
        // console.log(" 카테고리 전체 : ", allFoodsResponse);
      } else {
        const localFoodResponse = await getLocalFood(localNo);
        console.log("카테고리 별별 :", localFoodResponse);
        setLocalFoods(localFoodResponse.data);
      }
    } catch (error) {
      console.error("음식 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // 선택한 지역에 따라 데이터를 불러와서 업데이트
        const localFoodResponse = await getLocalFood(localNo);
        setLocalFoods(localFoodResponse.data);
        console.log(`특산물 ${localName} 지역:`, localFoodResponse.data);

        // localNo가 "all"이 아닌 경우에만 실행
        if (localNo !== "all") {
          const localNameResponse = await getLocation(localNo);
          setLocalName(localNameResponse.data);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchFoods();
  }, [localNo]);

  // 페이지 번호를 계산하는 함수
  const calculatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(localFoods.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // 페이지 번호를 클릭할 때 호출되는 핸들러
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 렌더링할 페이지 번호 목록
  const pageNumbers = calculatePageNumbers();

  // 현재 페이지에 해당하는 아이템들을 추출
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = localFoods.slice(startIndex, endIndex);

  // 각 카드에 대한 확장 상태를 저장하는 배열
  const [expandedStates, setExpandedStates] = useState(
    Array(localFoods.length).fill(false)
  );

  //  해당페이지 width 값에 따른 스와이퍼 갯수 조절
  useEffect(() => {
    function handleResize() {
      setSlidesPerView(calculateSlidesPerView());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateSlidesPerView() {
    const windowWidth = document.documentElement.clientWidth;

    if (windowWidth >= 1200) {
      return 4;
    } else if (windowWidth >= 768) {
      return 3;
    } else {
      return 1;
    }
  }
  return (
    <>
      <div
        className="regionfood-title container"
        style={{ paddingTop: "200px" }}
      >
        <h3>방방곡곡 특산물</h3>
        <p>
          "비슷하게 뭘"
          <br />
          "넣으면"
          <br />
          "괜찮게"
        </p>
        {/* 전체가 가짜 데이터 컬럼명이라 이렇게 삼항으로 처리 */}
        <h3>{localName && localName.name} </h3>
      </div>
      {/* 카테고라 */}
      <div className="container">
        <Location2
          onCategoryClick={handleCategoryClick}
          basePath="/localFoods"
        />
      </div>
      {/* 과일 카드들 */}
      <div className="container regionfood-list">
        {currentItems.map((food, i) => (
          // 이게 클릭이벤트! 혹시 몰라서 모바일환경에서 호버가 이상할수있으니
          <div
            key={food.foodNo}
            className={`regionfood-item ${expandedStates[i] ? "expanded" : ""}`}
            onClick={() => {
              const newExpandedStates = [...expandedStates];
              newExpandedStates[i] = !newExpandedStates[i];
              setExpandedStates(newExpandedStates);
            }}
          >
            {/* 여기가 호버 이벤트 일단 주석 */}
            {/* <div
            key={food.foodNo}
            className={`regionfood-item ${expandedStates[i] ? "expanded" : ""}`}
            onMouseEnter={() => {
              const newExpandedStates = [...expandedStates];
              newExpandedStates[i] = true;
              setExpandedStates(newExpandedStates);
            }}
            onMouseLeave={() => {
              const newExpandedStates = [...expandedStates];
              newExpandedStates[i] = false;
              setExpandedStates(newExpandedStates);
            }}
          > */}
            <img
              src={`/assets/regionfood/${localNo}/${startIndex + i + 1}.jpg`}
              alt={food.name}
            />
            <div>
              <strong>{food.name}</strong>
              <span>{food.content}</span>
            </div>
          </div>
        ))}
      </div>
      {/* 페이징 */}
      <Pagination style={{ justifyContent: "center" }}>
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
      {/* 구분선 */}
      <hr className="container" />
      {/* 랜덤 특산물 */}
      <div className="regionfood-slider-list container">
        <h3>대한민국 특산물들</h3>
        <img src="/assets/etc/line.png" alt="line" className="pageline" />
        <div>
          <RegionfoodRandom
            localFoods={localFoods}
            localNo={localNo}
            slidesPerView={slidesPerView}
          />
        </div>
      </div>
    </>
  );
}

export default RegionfoodMain;
