import "../../styles/local/LocalMain.css";

import Location from "../common/Location";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { GiFlowerEmblem } from "react-icons/gi";

//  스와이퍼 부분
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocation } from "../../api/locationApi";

function LocalmainSwiper() {
  return (
    <Swiper
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        backgroundColor: "white",
        paddingTop: "20px",
      }}
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={4}
      autoplay={{ delay: "3000" }}
      loop={true}
    >
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/local/cherry.jpg" alt="" />
          <div className="localmain-slider-text">
            <strong>서울</strong>
            <p>서울 여의도</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/local/main-board.jpg" alt="" />
          <div className="localmain-slider-text">
            <strong>서울</strong>
            <p>서울 경복궁 </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/local/main-board2.jpg" alt="" />
          <div className="localmain-slider-text">
            <strong>서울</strong>
            <p>서울 중구</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/local/main-board3.jpg" alt="" />
          <div className="localmain-slider-text">
            <strong>서울</strong>
            <p>서울 종로</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/local/main-sample1.jpg" alt="" />
          <div className="localmain-slider-text">
            <strong>서울</strong>
            <p>서울 영등포</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
function LocalmainSwiper2() {
  return (
    <Swiper
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        backgroundColor: "white",
        paddingTop: "20px",
      }}
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={4}
      autoplay={{ delay: "4000" }}
      loop={true}
    >
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/festival/seoul/K-푸드페스타 in 서울.jpg" alt="" />
          <div className="localmain-slider-text">
            <strong>K-푸드페스타 in 서울</strong>
            <span>2023.12.23 ~ 2023.12.25</span>
            <p>서울시 서초구</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/festival/seoul/강동북페스티벌.jpg" alt="" />
          <div className="localmain-slider-text">
            <strong>강동북페스티벌</strong>
            <span>2023.10.28, 10:00 ~ 17:00</span>
            <p>서울시 강동구</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/festival/seoul/대한민국청소년미디어대전.jpg" />
          <div className="localmain-slider-text">
            <strong>대한민국청소년미디어대전</strong>
            <span>2023.11.2부터 4.</span>
            <p>서울시 중구</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/festival/seoul/문화가 있는 날 10주년 페스타.jpg" />
          <div className="localmain-slider-text">
            <strong>문화 있는날 10주년 페스타</strong>
            <span>2023.10.1부터 31.</span>
            <p>서울시 종로구</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="localmain-slider-main">
          <img src="/assets/festival/seoul/밤의 석조전.jpg" />
          <div className="localmain-slider-text">
            <strong>밤의 석조전</strong>
            <span>2023.10.6부터 11.2</span>
            <p>서울시 중구</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
function LocalMain() {
  // localNo 이름으로 params 값 가져옴 로그확인 완료
  const { localNo } = useParams();
  console.log("localNo:", localNo);

  const [localData, setLocalData] = useState("");

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const response = await getLocation(localNo);
        const data = response.data;

        console.log(" localData: ", data);
        setLocalData(data);
      } catch (error) {
        console.error("Error fetching local data:", error);
      }
    };

    fetchLocalData();
  }, [localNo]);

  return (
    <div className="container">
      {/*지역 이미지 클릭  여기는 Local 하나라서 Location컴포넌트에 아무것도 추가 안해도 ok */}
      <Location />
      <div className="location container">
        <img
          src="/assets/etc/line.png"
          alt="line"
          id="location-pageline container"
          style={{ width: "100%" }}
        />
        <h3 className="location-title"> {localData.name} </h3>
        <p className="location-text"> location </p>
        <hr className="container" />
      </div>

      <div className="localmain-image">
        <img
          // src={`/assets/local/${localData.name}/${localData.name}1.jpg`} -- 한글경로
          img
          src={`/assets/local/${localNo}/1.jpg`}
        />
      </div>

      <div className="localmain-info">
        <span>
          <FaPeopleGroup className="icon" />
          <h3>인구</h3>
          <p>{localData.poplation}</p>
        </span>
        <span>
          <FaLocationDot />
          <h3>면적</h3>
          <p>{localData.area}km2</p>
        </span>
        <span>
          <GiFlowerEmblem />
          <h3>시화</h3>
          <p>{localData.flower}</p>
        </span>
      </div>
      <div className="localmain-content">
        <h2> 상세정보 </h2>
      </div>
      <div className="localmain-text">
        <p>{localData.content}</p>
      </div>
      {/* 스와이퍼 */}
      <div className="localmain-swiper-title">
        <h2> 추천 관광지 </h2>
      </div>
      <LocalmainSwiper />

      <hr style={{ marginBottom: "0" }} />
      {/* 스와이퍼 */}
      <div className="localmain-swiper-title">
        <h2> 추천 축제 </h2>
      </div>
      <LocalmainSwiper2 />
    </div>
  );
}

export default LocalMain;
