// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

import "../../styles/Main.css";
import SouthKoreaMap from "../common/SouthKoreaMap.js";
import Video from "./Video.js";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

//  스와이퍼 부분
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getTourBaordList } from "../../api/BoardApi.js";

function Section2Swiper({
  festivalData,
  localNo,
  handlePlaceUpdate,
  slidesPerView,
}) {
  return (
    <Swiper
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        backgroundColor: "white",
        paddingTop: "50px",
      }}
      modules={[Autoplay, Pagination]}
      spaceBetween={50}
      slidesPerView={slidesPerView}
      autoplay={{ delay: 3003330 }}
      loop={true}
      pagination={{ type: "bullets", clickable: true }}
    >
      {festivalData.slice(0, 5).map((festival, index) => (
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
                <span>{`정보: ${festival.content}`}</span>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function Section3Swiper({ foods, localNo, slidesPerView }) {
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
      // 조절가능! 슬라이더 갯수
      slidesPerView={slidesPerView + 1}
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
  const [tourBoardListData, setTourBoardListData] = useState([]);

  useEffect(() => {
    const fetchTourBoardListData = async () => {
      try {
        const response = await getTourBaordList();
        const data = response.data;

        // 이미지 URL을 가져오기 위해 각 아이템에 대해 fetchImage 호출
        const newData = await Promise.all(
          data.map(async (item) => {
            const imageUrl = await fetchImage(item.bno);
            return { ...item, imageUrl };
          })
        );

        console.log("TourBoardListData: ", newData);
        setTourBoardListData(newData);
      } catch (error) {
        console.error("Error fetching local data:", error);
      }
    };

    fetchTourBoardListData();
  }, []);

  const fetchImage = async (bno) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/images/${bno}`,
        { responseType: "arraybuffer" }
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const imageUrl = URL.createObjectURL(blob);
      console.log("Image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error(`에러 : ${bno}:`, error);
      return null;
    }
  };

  return (
    <Swiper
      style={{
        height: "100%",
        width: "1200px",
        position: "relative",
        backgroundColor: "white",
      }}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={0}
      slidesPerView={1}
    >
      {tourBoardListData.map((item, index) => (
        <SwiperSlide key={index}>
          {/* 여기에서 이미지 URL을 사용하여 이미지 표시 */}
          <ul className="tourisspotList">
            {/* 첫 번째 게시글 */}
            <li className="swiper-slide">
              <Link to={`/board/tourisSpot/${item.bno}`}>
                <div className="thumb-wrap">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={`Tourisspot ${index + 1}`} />
                  ) : (
                    <div>No Image</div>
                  )}
                </div>
                {/* 기타 필요한 정보 표시 */}
                <div className="text-wrap">
                  <span> 서울 </span>
                  <strong> 작성자 </strong>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <span className="viewcnt">
                    <IoEyeSharp /> <p>{item.views}</p>
                  </span>
                </div>
              </Link>
            </li>

            {/* 두 번째 게시글 */}
            {index + 1 < tourBoardListData.length && (
              <li className="swiper-slide">
                <Link
                  to={`/board/tourisSpot/${tourBoardListData[index + 1].bno}`}
                >
                  <div className="thumb-wrap">
                    {tourBoardListData[index + 1].imageUrl ? (
                      <img
                        src={tourBoardListData[index + 1].imageUrl}
                        alt={`Tourisspot ${index + 2}`}
                      />
                    ) : (
                      <div>No Image</div>
                    )}
                  </div>
                  <div className="text-wrap">
                    <span> 서울 </span>
                    <strong> 작성자 </strong>
                    <h3>{tourBoardListData[index + 1].title}</h3>
                    <p>{tourBoardListData[index + 1].content}</p>
                    <span className="viewcnt">
                      <IoEyeSharp /> <p>{tourBoardListData[index + 1].views}</p>
                    </span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
function Main() {
  const location = useLocation();
  const [locationData, setLocationData] = useState([]);
  const [festivalData, setFestivalData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [localNo, setLocalNo] = useState(1);
  // width값에 따라 슬라이더 몇개 보여줄지 정하는 코드
  const [slidesPerView, setSlidesPerView] = useState(calculateSlidesPerView);

  // 관광지 추천 게시판 글 가져오기
  const [TourBoardListData, setTourBoardListData] = useState([]);

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

  useEffect(() => {
    function handleResize() {
      setSlidesPerView(calculateSlidesPerView());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 의존성 배열은 이 효과가 초기 렌더링 이후 한 번 실행됨을 의미합니다.

  function calculateSlidesPerView() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1200) {
      return 3; // 창 폭이 1200 이상이면 3개의 슬라이드를 표시
    } else if (windowWidth >= 768) {
      return 2; // 창 폭이 768 이상이면서 1200 이하이면 2개의 슬라이드를 표시
    } else {
      return 1; // 더 작은 창 폭에는 1개의 슬라이드만 표시
    }
  }

  return (
    <div>
      <Video />
      <div className="mainpage container">
        <img
          src="/assets/etc/line.png"
          alt="line"
          id="pageline"
          style={{ paddingTop: "50px" }}
        />

        <div className="section1-headname">
          <h3>
            "지역으로 보는"
            <strong> 방방곡곡 관광지 </strong>
          </h3>
        </div>
        {/* 여기 구분선 */}
        <hr style={{ marginBottom: "25px", marginTop: "0" }} />
        <div className="section1 section">
          <div className="section1-item1">
            <div className="section1-place">
              <h3>
                {/* 지역 나타내는 곳 */}
                <strong>
                  {locationData.length > 0 && locationData[0].location}
                </strong>
                요즘뜨는 관광지
              </h3>
            </div>
            <ul className="section-place-info">
              {locationData.map((place, index) => {
                // 최대 3개의 요소만 렌더링
                if (index < 4) {
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
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                }
                return null; // index가 3 이상이면 렌더링하지 않음
              })}
            </ul>
            <Link to={`/place/${localNo}`}>
              <button className="section-place-more">더보기</button>
            </Link>
          </div>
          <div className="section1-item2">
            <strong className="section1-item2-title">
              조회할 지역을 선택하세요.
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
          <strong>{locationData.length > 0 && locationData[0].location}</strong>
          <h3> 방방곡곡 축제정보</h3>

          <img src="/assets/etc/line.png" alt="line" id="pageline" />
          <div>
            <Section2Swiper
              festivalData={festivalData}
              localNo={localNo}
              handlePlaceUpdate={handlePlaceUpdate}
              slidesPerView={slidesPerView}
            />
            {/* 일단 주석 */}
            {/* <button className="w-btn-neon2 section2-item-button" type="button">
              더보기
            </button> */}
          </div>
        </div>
        <hr />
        <div className="section3 section">
          <strong>{locationData.length > 0 && locationData[0].location}</strong>
          <h3> 방방곡곡 특산물'S </h3>
          <img src="/assets/etc/line.png" alt="line" id="pageline" />
          <div>
            <Section3Swiper
              foods={foodData}
              localNo={localNo}
              handlePlaceUpdate={handlePlaceUpdate}
              slidesPerView={slidesPerView}
            />
          </div>
          <Link to={`/localfoods/${localNo}`}>
            <button className="section-localfood-more">더보기</button>
          </Link>
          <hr style={{ marginTop: "0" }} />
        </div>

        <div className="section4 section">
          <h3> 방방곡곡 온누리 말 </h3>
          <img src="/assets/etc/line.png" alt="line" id="pageline" />
          <div className="board-section">
            <div className="board-Company">
              <div className="title">
                <p>여행 메이트</p>
              </div>
              <div className="tab-list">
                <ul className="loactionList">
                  <li className="loaction">
                    <a href="#">서울</a>
                  </li>
                  <li className="loaction">
                    <a href="#">대구</a>
                  </li>
                  <li className="loaction">
                    <a href="#">부산</a>
                  </li>
                </ul>
              </div>
              <div className="CompanyList">
                <ul>
                  <li>
                    <a href="#">
                      {" "}
                      <p>게시판 제목이 나옵니다! </p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <p> 여기에 어디 갈사람? </p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <p>게시판 제목이 나옵니다! </p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <p> 여기에 어디 갈사람? </p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <p> 여기에 어디 갈사람? </p>
                    </a>
                  </li>
                </ul>
                <a href="#" className="btn more">
                  {" "}
                  <span>여긴 더보기 (클릭하면 게시판목록으로이동)</span>
                </a>
              </div>
            </div>
            <div className="board-Tourisspot">
              <div className="title">
                <p>관광지 추천</p>
              </div>
              <Section4Swiper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
