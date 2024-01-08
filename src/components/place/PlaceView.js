import "../../styles/place/PlaceView.css";

import { IoEyeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocalPlaceView, postHeart } from "../../api/LocalPlaceApi";
import Kakaomap from "../../api/Kakaomap";
import PlaceModal from "./PlcaeModal";

function PlaceView() {
  const { localNo, placeNo } = useParams();
  const [placeData, setPlaceData] = useState(null);

  const [shareUrl, setShareUrl] = useState(""); // URL 상태 추가
  const [modalOpen, setModalOpen] = useState(false);

  // 로그인 상태 확인 함수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const placeResponse = await getLocalPlaceView(placeNo);
        console.log("장소 상세 정보:", placeResponse);
        setPlaceData(placeResponse.data);

        // URL 정보 설정
        const currentUrl = window.location.href;
        setShareUrl(currentUrl);

        // 로그인 상태 확인
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        setIsLoggedIn(!!accessToken);
      } catch (error) {
        console.error("데이터 못가져옴 :", error);
      }
    };

    fetchPlaceData();
  }, [placeNo]);

  // 하트 클릭 처리 함수
  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      // 로그인되어 있지 않다면 로그인 페이지로 이동하도록 처리 (이 부분은 프로젝트에 맞게 수정 필요)
      alert("로그인이 필요합니다.");
      navigate("/login"); // 리다이렉트 처리
      return;
    }

    try {
      // HeartApi에서 postHeart 함수 호출
      await postHeart({ id: "test1", placeNo }); // id는 현재 하드코딩되어 있음
      alert("하트가 클릭되었습니다.");
    } catch (error) {
      console.error("하트 클릭 오류:", error);
    }
  };
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
            <span onClick={handleHeartClick}>
              <FaHeart /> <p>{placeData.heartCnt || 0}</p>
            </span>
            {/*  모달에 Url값 전달 */}
            <PlaceModal
              show={modalOpen}
              onHide={() => setModalOpen(false)}
              shareUrl={shareUrl}
            />
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
