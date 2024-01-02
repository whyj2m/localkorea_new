import "../../styles/place/PlaceView.css";

import { IoEyeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocalPlaceView } from "../../api/LocalPlaceApi";
import Kakaomap from "../../api/Kakaomap";
import PlaceModal from "./PlcaeModal";

function PlaceView() {
  const { localNo, placeNo } = useParams();
  const [placeData, setPlaceData] = useState(null);

  const [imageIndex, setImageIndex] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);

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
              <FaExternalLinkAlt onClick={() => setModalOpen(true)} />
            </span>

            <PlaceModal show={modalOpen} onHide={() => setModalOpen(false)} />
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
            <Kakaomap
              latitude={parseFloat(placeData.latitude)}
              longitude={parseFloat(placeData.longitude)}
              name={placeData.name}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default PlaceView;
