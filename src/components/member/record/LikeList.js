import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { getMyLikeList } from "../../../api/MemberApi";

function LikeList() {
  const [likeList, setLikeList] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await getMyLikeList();
        setLikeList(response.data);
      } catch (error) {
        console.error("좋아요 목록을 가져오는 중 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h3 className="title">나의 활동 - 좋아요</h3>
      {likeList.map((item)=>(
        <Link key={item.heartNo}
          to={`/place/${item.localPlacesDetail.localNo.localNo}/${item.placeNo}`}
        >
          <Card className="likecard">
            <Card.Body>
              <Card.Img src={`../../assets/place/${item.localPlacesDetail.localNo.localNo}/${item.placeNo}.jpg`} />
              <div class="content">
                <Card.Title className="mb-3">{item.localPlacesDetail.name}</Card.Title>
                <Card.Text>
                  {item.localPlacesDetail.content}
                </Card.Text>
              </div>
              <FaHeart className="h-icon" />
            </Card.Body>
          </Card>
        </Link>
      ))}
      {/* <Card className="likecard">
        <Card.Body>
          <Card.Img src="../../assets/local/2/incheon2.jpg" />
          <div class="content">
            <Card.Title className="mb-3">서울 여의도 벚꽃축제</Card.Title>
            <Card.Subtitle className="mb-2">
              서울특별시 영등포구 여의서로 (주소)
            </Card.Subtitle>
            <Card.Text>
              언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를
              침해하여서는 아니된다. 언론·출판이 타인의 명예나 권리를 침해한
              때에는 피해자는 이에 대한 피해의 배상을 청구할 수 있다. 국회의원과
              정부는 법률안을 제출할 수 있다. 민주평화통일자문회의의
              조직·직무범위 기타 필요한 사항은 법률로 정한다.
            </Card.Text>
          </div>
          <FaHeart className="h-icon" />
        </Card.Body>
      </Card> */}

    </>
  );
}

export default LikeList;
