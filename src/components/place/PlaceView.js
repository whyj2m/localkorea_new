import "../../styles/place/PlaceView.css";

import { IoEyeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocalPlaceView, postHeart } from "../../api/LocalPlaceApi";
import Kakaomap from "../../api/Kakaomap";
import PlaceModal from "./PlcaeModal";
import { jwtDecode } from "jwt-decode";

function PlaceView() {
  const { localNo, placeNo } = useParams();
  const [placeData, setPlaceData] = useState(null);

  const [shareUrl, setShareUrl] = useState(""); // URL 상태 추가
  const [modalOpen, setModalOpen] = useState(false);

  // 로그인 상태 확인 함수
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 하트 상태 함수
  const [isHearted, setIsHearted] = useState(false); // 하트 상태 추가

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const placeResponse = await getLocalPlaceView(placeNo);
        setPlaceData(placeResponse.data);
        console.log(placeResponse.data);

        const currentUrl = window.location.href;
        setShareUrl(currentUrl);

        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        setIsLoggedIn(!!accessToken);

        // 토큰이 존재하는 경우에만 디코딩
        if (isLoggedIn && accessToken) {
          // accessToken이 존재할 때만 디코딩 수행
          try {
            const decodedToken = jwtDecode(accessToken);
            const userId = decodedToken.id;

            setIsHearted(
              placeData.heartCnt > 0 &&
                placeData.heartCnt.some((heart) => heart.id === userId)
            );
          } catch (error) {
            console.error("토큰 디코딩 오류:", error);
          }
        }
      } catch (error) {
        console.error("데이터 못가져옴 :", error);
      }
    };

    fetchPlaceData();
  }, [placeNo, isLoggedIn]); // isLoggedIn을 useEffect 의존성 배열에 추가

  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.id;

      if (isHearted) {
        // 하트를 이미 클릭한 경우 취소
        // HeartApi에서 cancelHeart 함수 호출 (예시로 작성한 함수, 실제 함수명에 맞게 수정 필요)
        // await cancelHeart({ id: userId, placeNo });
        // 클릭 이후에 서버로부터 최신 데이터를 가져와서 화면 업데이트
      } else {
        // 하트를 클릭한 경우
        await postHeart({ id: userId, placeNo });
        // 클릭 이후에 서버로부터 최신 데이터를 가져와서 화면 업데이트
      }

      const updatedPlaceResponse = await getLocalPlaceView(placeNo);
      setPlaceData(updatedPlaceResponse.data);
      // 하트 상태 업데이트
      setIsHearted(!isHearted);
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
