import "../../styles/Main.css";
import SouthKoreaMap from "../common/SouthKoreaMap.js";
import Video from "./Video.js";
import axios from "axios";

import { FaRegEye } from "react-icons/fa";

//  스와이퍼 부분
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

function Section2Swiper() {
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
      autoplay={{ delay: 2000000 }}
      loop={true}
    >
      <SwiperSlide>
        <div className="section2-slider-item">
          <img src="/assets/local/slide1.jpg" alt="" />
          <div className="section2-slider-text">
            <strong>서울시 관광지1</strong>
            <p>날짜 : 2023.12.12 ~ 2023.12.19</p>
            <p>위치 : 서울시 구로디지털단지 어딘가역 4번출구</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section2-slider-item">
          <img src="/assets/local/slide2.jpg" alt="" />
          <div className="section2-slider-text">
            <strong>서울시 관광지2</strong>
            <p>날짜 : 2023.12.12 ~ 2023.12.19</p>
            <p>위치 : 서울시 구로디지털단지 어딘가역 4번출구</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section2-slider-item">
          <img src="/assets/local/slide3.jpg" alt="" />
          <div className="section2-slider-text">
            <strong>서울시 관광지3</strong>
            <p>날짜 : 2023.12.12 ~ 2023.12.19</p>
            <p>위치 : 서울시 구로디지털단지 어딘가역 4번출구</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section2-slider-item">
          <img src="/assets/local/slide4.jpg" alt="" />
          <div className="section2-slider-text">
            <strong>서울시 관광지4</strong>
            <p>날짜 : 2023.12.12 ~ 2023.12.19</p>
            <p>위치 : 서울시 구로디지털단지 어딘가역 4번출구</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
function Section3Swiper() {
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
      <SwiperSlide>
        <div className="section3-slider-item">
          <img src="/assets/regionfood/berry.jpg" alt="" />
          <div className="section3-slider-text">
            <strong>딸기</strong>
            <p>경상북도 - 울산시</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section3-slider-item">
          <img src="/assets/regionfood/section3-apple.jpg" alt="" />
          <div className="section3-slider-text">
            <strong>사과</strong>
            <p>경상북도 - 울산시</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section3-slider-item">
          <img src="/assets/regionfood/orange.jpg" alt="" />
          <div className="section3-slider-text">
            <strong>오렌지</strong>
            <p>경상북도 - 울산시</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section3-slider-item">
          <img src="/assets/regionfood/watermelon.jpg" alt="" />
          <div className="section3-slider-text">
            <strong>수박</strong>
            <p>경상북도 - 울산시</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section3-slider-item">
          <img src="/assets/test/dog.jpg" alt="" />
          <div className="section3-slider-text">
            <strong>강아지</strong>
            <p>경상북도 - 울산시</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section3-slider-item">
          <img src="/assets/test/cat.jpg" alt="" />
          <div className="section3-slider-text">
            <strong>고양이</strong>
            <p>경상북도 - 울산시</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="section3-slider-item">
          <img src="/assets/test/kapi.jpg" alt="" />
          <div className="section3-slider-text">
            <strong>카피바라</strong>
            <p>경상북도 - 부산시</p>
          </div>
        </div>
      </SwiperSlide>
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
      autoplay={{ delay: "3003330" }}
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
          {
            location: response.data,
            festival: festivalResponse.data,
            food: foodResponse.data,
          },
          festivalResponse.data, // 여기에 festival 데이터도 전달하도록 수정
          foodResponse.data, // 여기에 food 데이터도 전달하도록 수정
          localNo
        );

        console.log(" 로딩 지역 : ", response.data);
        console.log(" 로딩 축제: ", festivalResponse.data);
        console.log(" 로딩 특산물: ", foodResponse.data);
        console.log(" 로컬 지역 초기값:", localNo);
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
              {locationData.places &&
                locationData.places.slice(0, 3).map((place, index) => (
                  <li key={index}>
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
                  </li>
                ))}
            </ul>
          </div>
          <div className="section1-item2">
            <strong className="section1-item2-title">
              {" "}
              대한민국 방방곡곡 "Click!"{" "}
            </strong>
            <p className="section1-item2-name"> </p>
            <SouthKoreaMap
              onLocationClick={(data, localNo) =>
                handlePlaceUpdate(data, localNo)
              }
              className="koreamap"
            />
            {/* 서울 지도 불러오는부분 svg를 js로 변환해서 함 이유는 호환성문제? svg를 바로 import 할수가 없다고 했다..*/}
          </div>
        </div>
        <hr />
        <div className="section2 section">
          <h3> 방방곡곡 축제 정보 </h3>
          <img src="/assets/etc/line.png" alt="line" id="pageline" />
          <div>
            <Section2Swiper />
            <button className="w-btn-neon2 section2-item-button" type="button">
              더보기
            </button>
          </div>
        </div>
        <hr />
        <div className="section3 section">
          <h3> 방방곡곡 특산물'S </h3>
          <img src="/assets/etc/line.png" alt="line" id="pageline" />
          <div>
            <Section3Swiper />
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
