// css
import "../../styles/board/tourisSpotView.scss";
import { Row, Col, Button } from "react-bootstrap";

// react
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// api
import { getTourBaordDetail } from "../../api/BoardApi";
import { deleteBoard } from "../../api/BoardApi";

// 시간
import moment from "moment"; // 시간
import "moment/locale/ko"; // 시간 한글로

// 토큰
import { jwtDecode } from "jwt-decode";

// 수정 삭제 버튼 컴포넌트
function EditAndDeleteBtn() {
    const { bno } = useParams();
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const decodedToken =
        typeof accessToken === "string" ? jwtDecode(accessToken) : null;

    const customerId = decodedToken?.id;

    const [loadingData, setLoadingData] = useState(true);
    const [TourBaordDetailData, setTourBaordDetailData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTourBaordDetailData = async () => {
            try {
                const response = await getTourBaordDetail(bno);
                const data = response.data;
                setTourBaordDetailData(Array.isArray(data) ? data : [data]); // 배열로 감싸기
                setLoadingData(false);
            } catch (error) { }
        };

        fetchTourBaordDetailData();
    }, [bno, customerId]); // customerId를 의존성 배열에 추가

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteBoard(bno);
            alert("삭제되었습니다.");
            navigate("/board/tourisSpot");
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return <div>로딩중...</div>;
    }

    // 배열의 첫 번째 요소
    const item = TourBaordDetailData[0];

    if (item && item.id && item.id.id) {
        if (customerId === item.id.id) {
            // 토큰이 있고, 작성자의 ID와 토큰의 ID가 일치하는 경우
            return (
                <React.Fragment key={item.bno}>
                    <Col xs={4} md={1} className="boardView-btn">
                        <Link to={`/board/edit/${item.bno}`}>
                            <Button variant="link" className="btn">
                                수정
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={4} md={1} className="boardView-btn">
                        <Button variant="link" disabled={loading} onClick={handleDelete}>
                            삭제
                        </Button>
                    </Col>
                </React.Fragment>
            );
        } else {
            // 토큰이 있지만, 작성자의 ID와 토큰의 ID가 일치하지 않는 경우
            return null;
        }
    }
    return null;
}

// 관광지 추천 게시판 상세 내용 가져오기
function TourisSpotView() {
    const [TourBaordDetailData, setTourBaordDetailData] = useState([]);
    const { bno } = useParams();
    const [imageSrc, setImageSrc] = useState(""); // 이미지

    // bno를 사용하여 관광지 게시글 상세정보를 가져오기
    useEffect(() => {
        const fetchTourBaordDetailData = async () => {
            try {
                const response = await getTourBaordDetail(bno);
                const data = response.data;
                setTourBaordDetailData(Array.isArray(data) ? data : [data]);
            } catch (error) { }
        };
        fetchTourBaordDetailData();
    }, [bno]);

    // 이미지
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8081/api/images/${bno}`,
                    { responseType: "blob" }
                );

                if (response.status === 200 && response.data.size > 0) {
                    const imageUrl = URL.createObjectURL(response.data);
                    setImageSrc(imageUrl);
                } else {
                    setImageSrc("../../assets/test/noImg.png");
                }
            } catch (error) {
                setImageSrc("../../assets/test/noImg.png");
            }
        };

        fetchImage();
    }, [bno]);

    return (
        <>
            <div className="boardView-header">- 관광지 추천 -</div>
            <div className="container boardView-all">
                {TourBaordDetailData.length > 0 &&
                    TourBaordDetailData.map((item) => (
                        <Row key={item.bno}>
                            <div className="boardView-bno">NO. {item.bno}</div>

                            {/* 제목 */}
                            <div className="line-bold" />
                            <Col xs={12} md={8}>
                                <div className="boardView-title">{item.title}</div>
                            </Col>

                            <div className="line" />

                            <div className="boardView-detail">
                                <div className="board-detail-date">
                                    <div className="date">
                                        {moment(item.regDate).format("L")}
                                    </div>
                                </div>
                                <div className="board-detail-writer">
                                    <div className="writer">{item.id.name}</div>
                                </div>
                                <div className="board-detail-view">
                                    <div className="view">{item.viewCnt}</div>
                                </div>
                            </div>
                            <div className="line" />

                            {/* 내용 */}
                            <Row className="m-0">
                                <div className="attachment ms-auto">
                                    {imageSrc ? (
                                        <img
                                            className="imgs"
                                            src={imageSrc}
                                            alt={`Image ${bno}`}
                                            width={500}
                                            height={450}
                                            style={{ objectFit: "cover" }}
                                        />
                                    ) : (
                                        <img
                                            src="../../assets/test/noImg.png"
                                            alt="이미지가 없습니다"
                                        />
                                    )}
                                </div>

                                <Col xs={12} md={12} className="BoardContent">
                                    <div className="board-content">{item.content}</div>
                                </Col>
                            </Row>
                            <div className="line" />

                            {/* 사진 */}
                            <Row className="file">
                                <Col xs={12} md={2} className="file-title">
                                    <p>첨부파일</p>
                                </Col>
                                <Col xs={12} md={10} className="file-imgFile">
                                    <div className="file-imgFile-uuid">
                                        {item.imageInfo?.[0]?.uuid || "UUID를 찾을 수 없습니다"}
                                    </div>
                                </Col>
                            </Row>

                            <div className="line-bold" />
                            {/* 버튼 */}
                            <Row className="justify-content-end">
                                <EditAndDeleteBtn />
                                <Col xs={4} md={1} className="boardView-btn">
                                    <Link to="/board/tourisSpot">
                                        <Button variant="link">목록</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Row>
                    ))}
            </div>
        </>
    );
}

export default TourisSpotView;
