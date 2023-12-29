import "../styles/Kakaomap.css";
import { useEffect } from "react";

const { kakao } = window;

function Kakaomap2({ location, name }) {
  useEffect(() => {
    const getLocationFromAddress = async (address) => {
      try {
        const geocoder = new kakao.maps.services.Geocoder();
        const result = await new Promise((resolve, reject) => {
          geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(result[0]);
            } else {
              reject(new Error("주소로부터 좌표를 가져오지 못했습니다."));
            }
          });
        });

        if (result) {
          return {
            latitude: result.y,
            longitude: result.x,
          };
        } else {
          throw new Error("지오코더로부터 유효하지 않은 응답을 받았습니다.");
        }
      } catch (error) {
        console.error("주소로부터 좌표를 가져오는 중 오류 발생:", error);
        throw error;
      }
    };

    const initializeMap = async () => {
      try {
        const { latitude, longitude } = await getLocationFromAddress(location);

        const container = document.getElementById("map");
        if (!container) {
          console.error("지도 컨테이너를 찾을 수 없습니다.");
          return;
        }

        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);

        const findRoadButton = document.getElementById("findRoadButton2");
        findRoadButton.addEventListener("click", () => {
          const roadURL = `https://map.kakao.com/link/to/${location},${latitude},${longitude}`;
          window.open(roadURL);
        });
      } catch (error) {
        console.error("지도 초기화 중 오류 발생:", error);
      }
    };

    // useEffect 내부에서 직접 initializeMap 함수 호출
    initializeMap();
  }, [location, name]);

  return (
    <>
      <div className="kakaomap-title">
        <h3> 길찾기 </h3>
      </div>
      <div
        id="map"
        style={{ width: "100%", height: "400px", position: "relative" }}
      >
        <button id="findRoadButton2">길찾기</button>
      </div>
    </>
  );
}

export default Kakaomap2;
