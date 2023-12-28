import { Link, useParams } from "react-router-dom";
import "../../styles/festival/FestivalMain.css";
import Location2 from "../common/Location2";
import {
  getLocalFestival,
  getLocalFestivals,
} from "../../api/LocalFestivalApi";
import { useEffect, useState } from "react";
import { getLocation } from "../../api/locationApi";

function FestivalMain() {
  // FestivalMain에서 필요한 페이지 이동 로직을 추가
  const handleCategoryClick = (localNo) => {};

  // localNo 이름으로 params 값 가져옴 로그확인 완료
  const { localNo } = useParams();
  const [localName, setLocalName] = useState("");
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        // 여기서 localNo별 페스티벌이랑 locationName 을 가져오는 함수
        const [festivalResponse, locationNameResponse] = await Promise.all([
          getLocalFestival(localNo),
          getLocation(localNo),
        ]);
        console.log("축제 목록 지역별 : ", festivalResponse);
        // 여기서 set
        setLocalData(festivalResponse.data);
        setLocalName(locationNameResponse.data);
      } catch (error) {
        console.error("데이터 못가져옴 :", error);
      }
    };

    fetchLocalData();
  }, [localNo]);

  return (
    <div>
      <div className="festival-title" style={{ paddingTop: "150px" }}>
        <h2> 축제 </h2>
        <p>Festival</p>
        <hr className="container" />
      </div>
      {/*  여기서 베이스가 되는 url 지정 */}
      <Location2 onCategoryClick={handleCategoryClick} basePath="/festival" />
      <div className="festival-content container">
        <div className="festival-content-wrap">
          <ul>
            <li className="content content1">
              <a>
                <Link to="/festival/location/no">
                  <div className="festival-text-area">
                    <div className="festival-text-title">
                      <strong> 서울숲 걷기 축제 </strong>
                    </div>
                    <div className="festival-text-desc">
                      <span> 2023.12.23 ~ 2023.12.25 </span>
                      <span> 서울특별시 서울대공원 </span>
                    </div>
                  </div>
                </Link>
              </a>
            </li>
            <li className="content content2">
              <a href="#">
                <div className="festival-text-area">
                  <div className="festival-text-title">
                    <strong> 서울숲 걷기 축제 </strong>
                  </div>
                  <div className="festival-text-desc">
                    <span> 2023.12.23 ~ 2023.12.25 </span>
                    <span> 서울특별시 서울대공원 </span>
                  </div>
                </div>
              </a>
            </li>
            <li className="content content3">
              <a href="#">
                <div className="festival-text-area">
                  <div className="festival-text-title">
                    <strong> 서울숲 걷기 축제 </strong>
                  </div>
                  <div className="festival-text-desc">
                    <span> 2023.12.23 ~ 2023.12.25 </span>
                    <span> 서울특별시 서울대공원 </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* 줄바꿈 */}
      <hr className="container" />
      <div className="festival-list container">
        <div className="festival-location-name">
          <h2>{localName.name}</h2>
          <p>대한민국 방방곡곡</p>
        </div>
        <div className="festival-list-item">
          <ul>
            {localData.map((festival, index) => (
              <li key={index}>
                <Link to={`/festival/${localNo}/${festival.festivalNo}`}>
                  {/* 이미지가 있다고 가정하고 imagePath를 사용 */}
                  <div className="festival-list-image">
                    <img
                      src={`/assets/festival/${localNo}/${index + 1}.jpg`}
                      alt={festival.name}
                    />
                  </div>
                  <div className="festival-text-desc">
                    <strong>{festival.name}</strong>
                    <span className="date">{festival.schedule}</span>
                    <span className="addr">{festival.location}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FestivalMain;
