import "../../styles/Main.css";
import SouthKoreaMap from "../common/SouthKoreaMap.js";
import Video from "./Video.js";
import axios from "axios";
import { Link } from "react-router-dom";

import { FaRegEye } from "react-icons/fa";

//  스와이퍼 부분
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

function Section2Swiper({ festivalData, localNo, handlePlaceUpdate }) {
  return (
    <Swiper
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        backgroundColor: "white",
        paddingTop: "50px",
      }}
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={3}
      slidesPerGroup={1}
      autoplay={{ delay: 2000 }}
      loop={true}
    >
      {festivalData.map((festival, index) => (
        <SwiperSlide key={index}>
          <Link to={`/festival/${localNo}/${festival.festivalNo}`}>
            {/* Link를 사용하여 클릭 시 라우팅 경로 설정 */}
            <div
              className="section2-slider-item"
              onClick={() => handlePlaceUpdate(festival, localNo)}
            >
              <img
                src={`/assets/festival/${localNo}/${index + 1}.jpg`}
                alt=""
              />
              <div className="section2-slider-text">
                <strong>{festival.name}</strong>
                <p>{`날짜: ${festival.schedule}`}</p>
                <p>{`위치: ${festival.location}`}</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function Section3Swiper({ foods, localNo, handlePlaceUpdate }) {
  return (
    <Swiper
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        backgroundColor: "white",
        paddingTop: "50px",
      }}
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={5}
      autoplay={{ delay: "3000" }}
      loop={true}
    >
      {foods && foods.length > 0 ? (
        foods.map((food, index) => (
          <SwiperSlide
            key={index}
            // 여긴 클릭이벤트가 필요없다.. 그냥 정보만 보여준다
            // onClick={() => handlePlaceUpdate(food, localNo)}
          >
            <div className="section3-slider-item">
              <img
                src={`/assets/regionfood/${localNo}/${index + 1}.jpg`}
                alt=""
              />
              <div className="section3-slider-text">
                <strong>{food.name}</strong>
                <p>{localNo.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p>No data available</p>
      )}
    </Swiper>
  );
}

function Section4Swiper() {
  return (
    <Swiper
      style={{
        height: "500px",
        width: "100%",
        position: "relative",
        backgroundColor: "white",
        paddingTop: "50px",
      }}
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: "3333" }}
      loop={true}
    >
      <SwiperSlide>
        <div className="section4-slider-item">
          <img src="/assets/local/main-board.jpg" alt="" />
          <div className="section4-slider-text">
            <strong>
              {" "}
              가족여행 첫 유럽여행이었슴다. 인솔자 김병만 가이드님. 저희가족땜에
              너무너무 애쓰셨습니다. 매일 다양한 사고로 당황하게
              만들어서...죄송하고 감사합니다. 늘 궁금하고 몰랐던 서유럽 여행을
              기점으로~ 많은 볼꺼리와 문화의 차이를 느끼고 왔슴다 지금은 바로
              현실로 복귀하여 열일하고 있슴다. 담의 또다른 여행을 기약하며~~~
            </strong>
            <p>콩이</p>
            <div className="board-view">
              <FaRegEye className="board-view-icon" />
              <span> 321 </span>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section4-slider-item">
          <img src="/assets/local/main-board2.jpg" alt="" />
          <div className="section4-slider-text">
            <strong>
              {" "}
              우린 늙어가는것이 아니라 조금씩 익어가는겁니다~
              보스박성옥가이드님을 만나 즐거운 여행을 마치고 이아침을
              맞이했습니다 너무나 아름답고 좋은분들 만나 행복했고 즐거웠습니다
              짐찾고나올때 이모님의 밝은모습보고 안심 했습니다 .27명 사고없이
              끝까지 무사히 여행을 해서 기쁘고 다시한번 가이드님및라니! 다시한번
              고개숙여 감사드립니다
            </strong>
            <p>순삼이</p>
            <div className="board-view">
              <FaRegEye className="board-view-icon" />
              <span> 99999 </span>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
function Main() {
  const [locationData, setLocationData] = useState([]);
  const [festivalData, setFestivalData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [localNo, setLocalNo] = useState(1);

  const handlePlaceUpdate = (location, festivals, foods, localNo) => {
    setLocationData(location);
    setFestivalData(festivals);
    setFoodData(foods);
    setLocalNo(localNo);
    console.log("Data updated. LocalNo:", localNo);
  };

  useEffect(() => {
    const fetchSeoulData = async () => {
      try {
        // 기본 지역 데이터 가져오기
        const response = await axios.get(
          `http://localhost:8081/localPlaces/${localNo}`
        );

        // 축제 데이터 가져오기
        const festivalResponse = await axios.get(
          `http://localhost:8081/localFestivals/${localNo}`
        );

        // 특산물 데이터 가져오기
        const foodResponse = await axios.get(
          `http://localhost:8081/localFoods/${localNo}`
        );

        // 데이터와 localNo를 업데이트
        handlePlaceUpdate(
          response.data,
          festivalResponse.data,
          foodResponse.data,
          localNo
        );

        console.log("로딩 지역 : ", response.data);
        console.log("로딩 축제: ", festivalResponse.data);
        console.log("로딩 특산물: ", foodResponse.data);
        console.log("로컬 지역 초기값:", localNo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSeoulData(); // 초기 호출
  }, [localNo]);

  return (
    <div>
      <Video />{" "}
      {/* 비디오 처리 위해서 Import 각자 지역별로 Video 넣을수 있습니다! */}
      <div className="mainpage container">
        <h3>{locationData.length > 0 && locationData[0].location}</h3>
        <img
          src="/assets/etc/line.png"
          alt="line"
          id="pageline"
          style={{ paddingTop: "50px" }}
        />

        {/* 여기만 구분주려고 paddingtop 50px만 줬습니다 이상하면 뺄예정 */}
        <div className="section1 section">
          <div className="section1-item1">
            <div className="section1-place">
              <h2>요즘뜨는 관광지</h2>
              <p>Trendings Places</p>
            </div>
            <ul className="section-place-info">
              {locationData.map((place, index) => {
                // 최대 3개의 요소만 렌더링
                if (index < 3) {
                  return (
                    <li key={index}>
                      <Link to={`/place/${localNo}/${place.placeNo}`}>
                        {/* Link를 사용하여 클릭 시 라우팅 경로 설정 */}
                        <div className="place-info">
                          <img
                            src={`/assets/place/${localNo}/${index + 1}.jpg`}
                            alt={place.name}
                          />
                          <div className="place-info-text">
                            <strong>{place.name}</strong>
                            <p>{place.address}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                }
                return null; // index가 3 이상이면 렌더링하지 않음
              })}
            </ul>
          </div>
          <div className="section1-item2">
            <strong className="section1-item2-title">
              {" "}
              대한민국 방방곡곡 "Click!"{" "}
            </strong>
            <p className="section1-item2-name"> </p>
            {/* 빈배열로 festival 과 foods 데이터 그리고 마지막으로 localNo를 받아온답니다.. 초기화? 대박 */}
            <SouthKoreaMap
              onLocationClick={(data, localNo) =>
                handlePlaceUpdate(data, [], [], localNo)
              }
              className="koreamap"
            />
            {/* 서울 지도 불러오는부분 svg를 js로 변환해서 함 이유는 호환성문제? svg를 바로 import 할수가 없다고 했다..*/}
          </div>
        </div>
        <hr />
        <div className="section2 section">
          {/* 로케이션데이터에 지역정보가 있어서 [0]번 베열 이용해서 지역이름 설정 */}
          <h3>{locationData.length > 0 && locationData[0].location}</h3>
          <h3> 방방곡곡 축제정보</h3>

          <img src="/assets/etc/line.png" alt="line" id="pageline" />
          <div>
            <Section2Swiper
              festivalData={festivalData}
              localNo={localNo}
              handlePlaceUpdate={handlePlaceUpdate}
            />
            {/* 일단 주석 */}
            {/* <button className="w-btn-neon2 section2-item-button" type="button">
              더보기
            </button> */}
          </div>
        </div>
        <hr />
        <div className="section3 section">
          <h3>{locationData.length > 0 && locationData[0].location}</h3>
          <h3> 방방곡곡 특산물'S </h3>
          <img src="/assets/etc/line.png" alt="line" id="pageline" />
          <div>
            <Section3Swiper
              foods={foodData}
              localNo={localNo}
              handlePlaceUpdate={handlePlaceUpdate}
            />
          </div>
          <hr />
        </div>
        <div className="section4 section">
          <h3> 방방곡곡 온누리 말 </h3>
          <img src="/assets/etc/line.png" alt="line" id="pageline" />
          <div>
            <Section4Swiper />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
