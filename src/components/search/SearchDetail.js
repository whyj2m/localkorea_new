import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Search.scss";
import { FaAngleRight } from "react-icons/fa6";
import { BsEye } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Search from "./Search";
import { useEffect, useState } from "react";

import { getLocalFestivals } from "../../api/LocalFestivalApi";
import { getLocalFoods } from "../../api/LocalFoodsApi";
import { getLocalPlaces } from "../../api/LocalPlaceApi";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

function SearchDetail() {
  // 검색 결과를 저장할 state
  const [festivals, setFestivals] = useState([]);
  const [foods, setFoods] = useState([]);
  const [places, setPlaces] = useState([]);

  // 검색어를 저장할 state
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어 업데이트 핸들러
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleSearchSubmit = async (term) => {
    setSearchTerm(term);

    try {
      const festivalsResponse = await getLocalFestivals(term);
      const foodsResponse = await getLocalFoods(term);
      const placesResponse = await getLocalPlaces(term);

      console.log("Festivals Response:", festivalsResponse.data);
      console.log("Foods Response:", foodsResponse.data);
      console.log("Places Response:", placesResponse.data);

      setFestivals(festivalsResponse.data);
      setFoods(foodsResponse.data);
      setPlaces(placesResponse.data);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 검색어가 있는 경우에만 해당 검색어로 데이터를 가져오도록 수정
        if (searchTerm.trim() !== "") {
          const festivalsResponse = await getLocalFestivals(searchTerm);
          const foodsResponse = await getLocalFoods(searchTerm);
          const placesResponse = await getLocalPlaces(searchTerm);

          setFestivals(festivalsResponse.data);
          setFoods(foodsResponse.data);
          setPlaces(placesResponse.data);
        } else {
          // 검색어가 없는 경우에는 빈 배열로 초기화
          setFestivals([]);
          setFoods([]);
          setPlaces([]);
        }
      } catch (error) {
        console.error("데이터 가져오기 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  // 검색어에 따라 데이터를 필터링
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("검색어 관광지 : ", filteredPlaces);

  const filteredFestivals = festivals.filter((festival) =>
    festival.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("검색어 축제 : ", filteredFestivals);

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("검색어 특산물 : ", filteredFoods);

  // 검색된 데이터의 총 길이 계산
  const totalLength =
    filteredPlaces.length + filteredFestivals.length + filteredFoods.length;
  console.log(totalLength);

  const placelength = filteredPlaces.length;
  console.log(placelength);

  const festivallength = filteredFestivals.length;
  console.log(festivallength);

  const foodlength = filteredFoods.length;
  console.log(foodlength);

  return (
    <div className="search">
      <Search
        onSearch={handleSearch}
        onSearchSubmit={handleSearchSubmit}
        displayedTotalLength={totalLength}
        placelength={placelength}
        festivallength={festivallength}
        foodlength={foodlength}
      />
      <Container>
        <div className="search_local">
          <div className="sub_title">
            <h3 className="title">
              관광지 (<span>{filteredPlaces.length}</span>건)
            </h3>
            <Button className="btn" variant="light" href="/search/local">
              검색결과 더 보기
              <FaAngleRight className="icon" />
            </Button>
          </div>
          <hr className="contour" />
          {filteredPlaces.map((place, index) => (
            <Link
              to={`/place/${place.localNo.localNo}/${place.placeNo}`}
              key={index}
              className="search_result"
            >
              <Row>
                <Col sm={12} md={4} className="img">
                  <img
                    src={`/assets/place/${place.localNo.localNo}/${place.placeNo}.jpg`}
                    alt={place.name}
                  />
                </Col>
                {/* 텍스트 정보 */}
                <Col sm={12} md={8}>
                  <Row className="search_places">
                    <Col xs={10} className="text">
                      <h3 className="title">{place.name}</h3>
                      <p className="location">{place.location}</p>
                      <span className="content">{place.content}</span>
                    </Col>
                    <Col xs={2}>
                      {/* 조회 수 */}
                      <div className="views">
                        <BsEye className="view" />{" "}
                        <span>{place.viewCnt || 0}</span>
                        <CiHeart className="heart" />{" "}
                        <span>{place.heartCnt || 0}</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Link>
          ))}
        </div>

        {/* 축제 섹션 */}
        <div className="search_fest">
          <div className="sub_title">
            <h3 className="title">
              축제 (<span>{filteredFestivals.length}</span>건)
            </h3>
            <Button className="btn" variant="light" href="/search/festival">
              검색결과 더 보기
              <FaAngleRight className="icon" />
            </Button>
          </div>
          <hr className="contour" />
          {filteredFestivals.map((festival, index) => (
            <Link
              to={`/festival/${festival.localNo.localNo}/${festival.festivalNo}`}
              key={index}
              className="search_result"
            >
              <Row>
                <Col sm={12} md={4} className="img">
                  <img
                    src={`/assets/festival/${festival.localNo.localNo}/${festival.festivalNo}.jpg`}
                    alt={festival.name}
                  />
                </Col>
                <Col sm={12} md={8}>
                  <Row className="search_">
                    <Col xs={10} className="text">
                      <h3 className="title">{festival.name}</h3>
                      <p className="location">{festival.location}</p>
                      <p className="content">{festival.content}</p>
                    </Col>
                    <Col xs={2}>
                      <div className="views">
                        <BsEye className="icon" /> {festival.viewCnt || 0}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Link>
          ))}
        </div>

        {/* 특산물 섹션 */}
        <div className="search_specialties">
          <div className="sub_title">
            <h3 className="title">
              특산물 (<span>{filteredFoods.length}</span>건)
            </h3>
            <Button className="btn" variant="light" href="/search/specialties">
              검색결과 더 보기
              <FaAngleRight className="icon" />
            </Button>
          </div>
          <hr className="contour" />
          <Row className="search_result">
            {filteredFoods.map((food, index) => (
              <Col key={index} sm={6} lg={3} className="search_foods">
                <div className="img">
                  <img
                    src={`/assets/regionfood/${food.localNo.localNo}/${food.foodNo}.jpg`}
                  />
                </div>
                <p>{food.localNo.name}</p>
                <h3 className="title">{food.name}</h3>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default SearchDetail;
