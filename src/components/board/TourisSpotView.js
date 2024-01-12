// css
import '../../styles/board/boardView.scss';
import { Row, Col, Button } from 'react-bootstrap';

// react
import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// 시간
import moment from 'moment'; // 시간    
import 'moment/locale/ko'; // 시간 한글로

// api
import { getTourBaordDetail } from '../../api/BoardApi';
import { deleteBoard } from '../../api/BoardApi';
import BoardNav from './BoardNav';

// 토큰
import { jwtDecode } from "jwt-decode";

// 수정 삭제 버튼 컴포넌트
// 수정 삭제 버튼 컴포넌트
function EditAndDeleteBtn() {
    const { bno } = useParams();
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const decodedToken = typeof accessToken === 'string' ? jwtDecode(accessToken) : null;

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
                setTourBaordDetailData(Array.isArray(data) ? data : [data]);
                setLoadingData(false);
            } catch (error) {
                console.error('Error fetching local data:', error);
            }
        };

        fetchTourBaordDetailData();
    }, [bno, customerId]);  // customerId를 의존성 배열에 추가

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteBoard(bno);
            alert('삭제되었습니다.');
            navigate('/board/tourisSpot');
        } catch (error) {
            console.error('Error deleting board:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return <div>Loading...</div>;
    }


    return (
        <>
            {TourBaordDetailData.map(item => {
                // console.log("유저 ID:", userId);
                // console.log("작성자 ID:", item);
                if (item.id && item.id.id) { // item 및 item.id가 존재하는지 확인
                    console.log("작성자의 ID:", item.id.id);


                    if (customerId === item.id.id) {
                        // 토큰이 있고, 작성자의 ID와 토큰의 ID가 일치하는 경우
                        return (
                            <React.Fragment key={item.bno}>
                                <Col xs={1} md={1} className='boardView-btn'>
                                    <Link to={`/board/edit/${item.bno}`}>
                                        <Button variant="link">수정</Button>
                                    </Link>
                                </Col>
                                <Col xs={1} md={1} className='boardView-btn'>
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
                return null; // item이나 item.id가 없는 경우 null 반환
            })}
        </>
    );
}

// 관광지 추천 게시판 상세 내용 가져오기
function TourisSpotView() {

    const [TourBaordDetailData, setTourBaordDetailData] = useState([]);
    const { bno } = useParams();

    // const [previews, setPreviews] = useState([]); 
    const [imageSrc, setImageSrc] = useState(''); // 이미지

    // bno를 사용하여 관광지 게시글 상세정보를 가져오기
    useEffect(() => {
        const fetchTourBaordDetailData = async () => {
            try {
                const response = await getTourBaordDetail(bno);
                const data = response.data;
                setTourBaordDetailData(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error fetching local data:", error);
            }
        };
        fetchTourBaordDetailData();
    }, [bno]);

    // 이미지 보여주기
    useEffect(() => {
        // fetch -> exios로 변경 예정
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/images/${bno}`);
                if (response.ok) {
                    const blob = await response.blob(); // 이미지 데이터를 blob으로 변환
                    const imageUrl = URL.createObjectURL(blob); // blob URL 생성
                    setImageSrc(imageUrl); // 이미지 주소를 state에 저장
                }
                else {
                    setImageSrc('../../assets/test/noImg.png'); // 대체이미지
                    // console.error('Failed to fetch image');
                }
            } catch (error) {
                // setImageSrc('../../assets/test/noImg.png');
                console.error('Error fetching image:', error);
            }
        };
        fetchImage();
    }, [bno]);

    return (
        <div>
            {/* <BoardNav /> */}

            <div className='container'>
                <div className='boardView-header'>
                    - 관광지 추천 -
                </div>
                <div className='boardView-all'>

                    {TourBaordDetailData.length > 0 && TourBaordDetailData.map(item => (
                        <Row key={item.bno}>
                            <div className='boardView-bno'>NO. {item.bno}</div>

                            {/* 제목 */}
                            <div className="line" />
                            <Col xs={8} md={8}>
                                <div className='boardView-title'>{item.title}</div>
                            </Col>

                            <div className="line" />

                            <div className='boardView-detail'>
                                <div className='board-detail-date'>
                                    <div className='date'>{moment(item.regDate).format('L')}</div>
                                </div>
                                <div className='board-detail-writer'>
                                    <div className='writer'>{item.id.id}</div>
                                </div>
                                <div className='board-detail-view'>
                                    <div className='view'>{item.viewCount}</div>
                                </div>
                            </div>
                            <div className="line" />

                            {/* 내용 */}
                            <Row>
                                <Col xs={8} md={12} className='BoardContent'>
                                    <div className='board-content'>{item.content}</div>
                                </Col>
                                <div className="line" />
                            </Row>

                            {/* 사진 */}
                            <Row>
                                <Col xs={8} md={8} className='file'>
                                    <div className='ms-auto'>
                                        {imageSrc ? (
                                            <img
                                                className='imgs'
                                                src={imageSrc}
                                                alt={`Image ${bno}`}
                                                width={300}
                                                height={250}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            // 대체이미지
                                            <img src="../../assets/test/noImg.png" alt="No Image" />
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            <div className="line" />
                            {/* 버튼 */}
                            <Row className='justify-content-end'>
                                <EditAndDeleteBtn />
                                <Col xs={1} md={1} className='boardView-btn'>
                                    <Link to="/board/tourisSpot">
                                        <Button variant="link">목록</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Row>
                    ))}
                </div>
            </div>
        </div>
    );
};

// export { TourisSpotView, EditAndDeleteBtn };
export default TourisSpotView;