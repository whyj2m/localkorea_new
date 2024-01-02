import "../../styles/festival/FestivalView.css";

// 아이콘들
import { FaRegEye } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { SiNamebase } from "react-icons/si";

//  스와이퍼 부분
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  getLocalFestival,
  getLocalFestivalView,
} from "../../api/LocalFestivalApi";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Kakaomap from "../../api/Kakaomap";
import Kakaomap2 from "../../api/Kakaomap2";

function FestivalViewSwiper() {
  const { localNo } = useParams();
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        // localNo에 해당하는 축제 목록을 가져오는 API 함수를 호출
        const festivalsResponse = await getLocalFestival(parseInt(localNo));
        console.log(festivalsResponse);
        setFestivals(festivalsResponse.data);
      } catch (error) {
        console.error("축제 목록을 가져오는 중 오류 발생:", error);
      }
    };

    fetchFestivals();
  }, [localNo]);

  return (
    <Swiper
      style={{
        height: "300px",
        width: "100%",
        position: "relative",
        backgroundColor: "white",
        paddingTop: "50px",
      }}
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={4}
      autoplay={{ delay: "2000" }}
      loop={true}
    >
      {festivals.map((festival, index) => (
        <SwiperSlide key={festival.id}>
          <Link to={`/festival/${localNo}/${festival.festivalNo}`}>
            <div className="festivalViewswiper">
              <img
                src={`/assets/festival/${localNo}/${index + 1}.jpg`}
                className="festivalViewswiper-image"
              />
              <div className="festivalViewswiper-text">
                <strong>{festival.name}</strong>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function FestivalView() {
  const { localNo, festivalNo } = useParams();
  const [festivalData, setFestivalData] = useState(null);

  useEffect(() => {
    const fetchFestivalData = async () => {
      try {
        // 축제 상세 정보를 가져오는 API 함수를 사용하여 데이터를 가져옴
        const festivalResponse = await getLocalFestivalView(festivalNo);
        console.log("축제 상세 정보:", festivalResponse);

        // 가져온 데이터를 상태에 저장
        setFestivalData(festivalResponse.data);
      } catch (error) {
        console.error("데이터 못가져옴 :", error);
      }
    };

    fetchFestivalData();
  }, [festivalNo]);
  return (
    <div
      className="festivalView-main container"
      style={{ paddingTop: "150px" }}
    >
      <div className="festivalView-head">
        <div className="festivalView-content">
          <div className="inner container">
            <div className="festivalView-title">
              {festivalData && (
                <>
                  <span>{festivalData.localNo.name}</span>
                  <h2>{festivalData.name}</h2>
                </>
              )}
            </div>
            <div className="festivalView-date">
              {festivalData && <span>{festivalData.schedule}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="festivalView-viewcnt ">
        <span>
          {festivalData && (
            <>
              <FaRegEye />
              <p>{festivalData.viewCnt || 0}</p>
            </>
          )}
        </span>
      </div>
      <div className="festivalView-text ">
        <div className="fesivalView-text-content">
          {festivalData && <p>{festivalData.content}</p>}
        </div>
      </div>
      {/* 분할선 */}
      <hr style={{ margin: "0" }} />
      <div className="festivalView-detail ">
        <div className="festivalView-detail-img">
          {/* 이미지 경로를 festivalNo에 따라서 설정해야할거 같아서 이렇게 했습니다. 음.. */}
          <img
            src={`/assets/festival/${localNo}/${festivalNo}.jpg`}
            // src={`/assets/festival/${localNo}/${localNo}.jpg`} // 임시로 넣ㅇ어둔거
            alt={festivalData?.name}
          />
        </div>
        <div className="festivalView-detail-info">
          <ul>
            <li>
              {festivalData && (
                <>
                  <div className="icon">
                    <MdDateRange className="icons date" />
                  </div>
                  <p>{festivalData.schedule}</p>
                </>
              )}
            </li>
            <li>
              {festivalData && (
                <>
                  <div className="icon">
                    <FaLocationArrow className="icons where" />
                  </div>
                  <p>{festivalData.location}</p>
                </>
              )}
            </li>
            <li>
              {festivalData && (
                <>
                  <div className="icon">
                    <SiNamebase className="icons name" />
                  </div>
                  <p>{festivalData.name}</p>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* 분할선 */}
      <hr style={{ marginTop: "0" }} />
      <div className="festivalView-map">
        {festivalData && (
          <Kakaomap2
            location={festivalData.location}
            name={festivalData.name}
          />
        )}
      </div>
      {/* 분할선 */}
      <hr />
      <div className="section2 section">
        <h3> 이런 축제는 어때? </h3>
        <img src="/assets/etc/line.png" alt="line" id="pageline" />
        <div>
          <FestivalViewSwiper />
        </div>
      </div>
    </div>
  );
}
export default FestivalView;
