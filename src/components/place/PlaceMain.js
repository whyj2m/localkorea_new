import "../../styles/place/PlaceMain.css";
import { Link, useParams } from "react-router-dom";
import Location2 from "../common/Location2";

import { IoEyeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getLocation } from "../../api/locationApi";
import { getLocalPlace } from "../../api/LocalPlaceApi";

function PlaceMain() {
  // FestivalMain에서 필요한 페이지 이동 로직을 추가
  const handleCategoryClick = (localNo) => {};

  // localNo 이름으로 params 값 가져옴 로그확인 완료
  const { localNo } = useParams();
  const [localName, setLocalName] = useState("");
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        //  여기서 관광지랑 지역이름 설정
        const [placesResponse, locationNameResponse] = await Promise.all([
          getLocalPlace(localNo),
          getLocation(localNo),
        ]);

        console.log("관광지 지역번호 별:", placesResponse);

        // 여기서 set
        setLocalData(placesResponse.data);
        setLocalName(locationNameResponse.data);
      } catch (error) {
        console.error("데이터 못가져옴 :", error);
      }
    };

    fetchLocalData();
  }, [localNo]);

  return (
    <div>
      <div className="place-title" style={{ paddingTop: "150px" }}>
        <h2> 관광지 </h2>
        <p>Trendings Places</p>
        <hr className="container" />
      </div>
      <Location2 onCategoryClick={handleCategoryClick} basePath="/place" />

      <div className="place-content container">
        <div className="plcae-content-title">
          <h2>{localName.name}</h2>
        </div>
        <div className="place-total-set">
          <strong>
            {/* 총건수 확인 */}총<span> {localData.length} </span>건
          </strong>
          <div className="place-btn">
            <button id="1"> 조회수 </button>
            <button id="2"> 좋아요 </button>
          </div>
        </div>
        <ul className="place-content-list">
          {localData.map((place, index) => (
            <li key={index} className="plcae-content-item">
              <div className="photo">
                <a>
                  {/* Link의 to 속성을 알맞게 수정 */}
                  <Link to={`/place/${localNo}/${place.placeNo}`}>
                    <img
                      src={`/assets/place/${localNo}/${index + 1}.jpg`}
                      alt={place.name}
                    />
                  </Link>
                </a>
              </div>
              <div className="place-content-info">
                <strong>{place.name}</strong>
                <p className="info-location"> {place.location} </p>
                <p className="text">{place.content}</p>
              </div>
              <div className="plcae-heartview">
                <span>
                  <IoEyeSharp /> <p>{place.viewCnt || 0}</p>
                </span>
                <span>
                  <FaHeart /> <p>{place.heartCnt || 0}</p>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlaceMain;
