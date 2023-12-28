import "../../styles/place/PlaceView.css";

import { IoEyeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocalPlaceView } from "../../api/LocalPlaceApi";

function PlaceView() {
  const { localNo, placeNo } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [imageIndex, setImageIndex] = useState(1);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const placeResponse = await getLocalPlaceView(placeNo);
        console.log("장소 상세 정보:", placeResponse);

        setPlaceData(placeResponse.data);
      } catch (error) {
        console.error("데이터 못가져옴 :", error);
      }
    };

    fetchPlaceData();
  }, [placeNo]);
  return (
    <div className="container" style={{ paddingTop: "200px" }}>
      {placeData && (
        <>
          <div className="placeview-title">
            <h2>{placeData.name}</h2>
            <span>{placeData.location}</span>
          </div>
          <div className="plcaeview-heartview">
            <span>
              <IoEyeSharp /> <p>{placeData.viewCnt || 0}</p>
            </span>
            <span>
              <FaHeart /> <p>{placeData.heartCnt || 0}</p>
            </span>
            <span>
              <FaExternalLinkAlt />
            </span>
          </div>
          <div className="placeview-image">
            <img
              src={`/assets/place/${localNo}/${placeNo}.jpg`}
              alt={placeData.name}
            />
          </div>
          <div className="placeview-content">
            <h2>상세정보</h2>
          </div>
          <div className="placeview-text">
            <p>{placeData.content}</p>
          </div>
          <div className="placeview-map">
            {/* 여기에 추후에 맵 들어갑니다 */}
            <div>맵 들어갈 구역 카카오맵 API</div>
          </div>
        </>
      )}
    </div>
  );
}
export default PlaceView;
