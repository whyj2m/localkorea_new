import "../../styles/place/PlaceView.css";

import { IoEyeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getHeartList,
  getLocalPlaceView,
  postHeart,
  checkIfHearted,
  deleteHeart,
} from "../../api/LocalPlaceApi";
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
  const [isHearted, setIsHearted] = useState(); // 하트 상태 추가

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const placeResponse = await getLocalPlaceView(placeNo);
        setPlaceData(placeResponse.data);

        // 하트 리스트를 가져옵니다.
        const heartList = await getHeartList();
        console.log("하트 리스트:", heartList);

        const currentUrl = window.location.href;
        setShareUrl(currentUrl);

        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        setIsLoggedIn(!!accessToken);

        // 토큰이 존재하는 경우에만 디코딩
        if (accessToken) {
          // accessToken이 존재할 때만 디코딩 수행
          try {
            const decodedToken = jwtDecode(accessToken);
            const userId = decodedToken.id; // userId 값 설정
            console.log("decodedToken.id:", decodedToken.id); // 추가된 로그

            // 좋아요 여부 확인 함수 호출
            const isHeartedResult = await checkIfHearted(userId, placeNo); // userId 사용
            console.log(isHeartedResult);
            setIsHearted(isHeartedResult); // 상태 업데이트

            // 나머지 부분 생략
          } catch (error) {
            console.error("토큰 디코딩 오류:", error);
          }
        }
      } catch (error) {
        console.error("데이터 못가져옴 :", error);
      }
    };

    fetchPlaceData();
  }, [placeNo]);

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

      // let alertMessage = ""; // 알림 메시지 변수 추가

      if (isHearted) {
        // 좋아요 취소 - deleteHeart 함수 호출
        await deleteHeart(userId, placeNo);
        // alertMessage = "좋아요가 취소되었습니다.";
      } else {
        // 좋아요 - postHeart 함수 호출
        await postHeart({ id: userId, placeNo });
        // alertMessage = "좋아요가 등록되었습니다.";
      }

      // 조회수를 다시 가져오지 않고, 하트 수만 업데이트
      setPlaceData((prevPlaceData) => ({
        ...prevPlaceData,
        heartCnt: isHearted
          ? prevPlaceData.heartCnt - 1
          : prevPlaceData.heartCnt + 1,
      }));

      // 하트 상태 업데이트
      setIsHearted(!isHearted);

      // 알림 메시지 출력
      // alert(alertMessage);
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
              {isHearted ? <FaHeart /> : <CiHeart className="heart-icon " />}
              <p>{placeData.heartCnt || 0}</p>
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
